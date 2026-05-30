import { Pool } from "pg";

const CONN = process.env.DATABASE_URL || process.env.DB_URL || "";
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: CONN,
      ssl: /sslmode=require|neon\.tech|render\.com|amazonaws/i.test(CONN) ? { rejectUnauthorized: false } : undefined,
      max: 3,
      connectionTimeoutMillis: 8000,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

export function dbConfigured() { return !!CONN; }

// ── Live schema introspection → tables, columns, keys, FK relations, indexes ──
export async function getSchema() {
  const db = getPool();
  const [cols, pks, fks, uniq, idx] = await Promise.all([
    db.query(`SELECT table_name, column_name, COALESCE(udt_name, data_type) AS type
              FROM information_schema.columns
              WHERE table_schema='public'
                AND table_name IN (SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE')
              ORDER BY table_name, ordinal_position`),
    db.query(`SELECT tc.table_name, kcu.column_name FROM information_schema.table_constraints tc
              JOIN information_schema.key_column_usage kcu ON tc.constraint_name=kcu.constraint_name AND tc.table_schema=kcu.table_schema
              WHERE tc.constraint_type='PRIMARY KEY' AND tc.table_schema='public'`),
    db.query(`SELECT tc.table_name AS from_table, kcu.column_name AS from_col, ccu.table_name AS to_table, ccu.column_name AS to_col
              FROM information_schema.table_constraints tc
              JOIN information_schema.key_column_usage kcu ON tc.constraint_name=kcu.constraint_name AND tc.table_schema=kcu.table_schema
              JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name=tc.constraint_name AND ccu.table_schema=tc.table_schema
              WHERE tc.constraint_type='FOREIGN KEY' AND tc.table_schema='public'`),
    db.query(`SELECT tc.table_name, kcu.column_name FROM information_schema.table_constraints tc
              JOIN information_schema.key_column_usage kcu ON tc.constraint_name=kcu.constraint_name AND tc.table_schema=kcu.table_schema
              WHERE tc.constraint_type='UNIQUE' AND tc.table_schema='public'`),
    db.query(`SELECT tablename, indexname, indexdef FROM pg_indexes WHERE schemaname='public' ORDER BY tablename`),
  ]);

  const pkSet = new Set(pks.rows.map((r) => `${r.table_name}.${r.column_name}`));
  const uqSet = new Set(uniq.rows.map((r) => `${r.table_name}.${r.column_name}`));
  const fkSet = new Set(fks.rows.map((r) => `${r.from_table}.${r.from_col}`));

  const tablesMap: Record<string, any> = {};
  for (const c of cols.rows) {
    (tablesMap[c.table_name] ||= { name: c.table_name, columns: [] });
    const key = `${c.table_name}.${c.column_name}`;
    tablesMap[c.table_name].columns.push({
      name: c.column_name, type: c.type,
      key: pkSet.has(key) ? "PK" : fkSet.has(key) ? "FK" : uqSet.has(key) ? "UQ" : undefined,
    });
  }
  const relations = fks.rows.map((r) => ({
    from: r.from_table, to: r.to_table, fk: r.from_col, label: `${r.from_col} → ${r.to_table}.${r.to_col}`,
  }));
  const indexes = idx.rows
    .filter((r) => !r.indexname.endsWith("_pkey"))
    .map((r) => ({ table: r.tablename, name: r.indexname, def: r.indexdef.replace(/^CREATE.*USING /, "") }));

  return { tables: Object.values(tablesMap), relations, indexes };
}

// ── Live runtime stats from the connection ──
export async function getStats() {
  const db = getPool();
  const [statDb, activity, maxc, ver] = await Promise.all([
    db.query(`SELECT numbackends, xact_commit, xact_rollback, blks_read, blks_hit,
                     tup_returned, tup_fetched, tup_inserted, tup_updated, tup_deleted,
                     pg_database_size(datname) AS size, datname
              FROM pg_stat_database WHERE datname=current_database()`),
    db.query(`SELECT state, count(*)::int AS c FROM pg_stat_activity WHERE datname=current_database() GROUP BY state`),
    db.query(`SELECT setting::int AS max FROM pg_settings WHERE name='max_connections'`),
    db.query(`SELECT current_setting('server_version') AS v`),
  ]);

  const s = statDb.rows[0] || {};
  const hit = Number(s.blks_hit) + Number(s.blks_read);
  const states: Record<string, number> = {};
  activity.rows.forEach((r) => (states[r.state || "unknown"] = r.c));

  let topQueries: any[] = [];
  let pgss = true;
  try {
    const q = await db.query(`SELECT query, calls, total_exec_time, mean_exec_time, rows
                              FROM pg_stat_statements
                              WHERE query NOT ILIKE '%pg_stat_statements%' AND query NOT ILIKE '%information_schema%'
                              ORDER BY total_exec_time DESC LIMIT 12`);
    topQueries = q.rows.map((r) => ({
      query: r.query, calls: Number(r.calls),
      totalMs: +Number(r.total_exec_time).toFixed(1), meanMs: +Number(r.mean_exec_time).toFixed(2), rows: Number(r.rows),
    }));
  } catch {
    pgss = false;
    // Fallback: show recent/active queries from pg_stat_activity
    try {
      const fallback = await db.query(`SELECT query, state, usename, 
                                              EXTRACT(EPOCH FROM (now() - query_start))::numeric(10,2) AS duration_sec,
                                              wait_event_type, wait_event
                                       FROM pg_stat_activity 
                                       WHERE datname = current_database() 
                                         AND query NOT ILIKE '%pg_stat_activity%'
                                         AND state IS NOT NULL
                                         AND query != ''
                                       ORDER BY query_start DESC NULLS LAST LIMIT 12`);
      topQueries = fallback.rows.map((r) => ({
        query: r.query, calls: 1,
        totalMs: +(Number(r.duration_sec || 0) * 1000).toFixed(1), meanMs: +(Number(r.duration_sec || 0) * 1000).toFixed(2),
        rows: 0, state: r.state, user: r.usename,
      }));
    } catch {}
  }

  return {
    database: s.datname, version: (ver.rows[0]?.v || "").split(" ")[0],
    connections: { active: states["active"] || 0, idle: states["idle"] || 0, total: Number(s.numbackends) || 0, max: maxc.rows[0]?.max || 100 },
    cacheHitRatio: hit ? +((Number(s.blks_hit) / hit) * 100).toFixed(2) : 100,
    commits: Number(s.xact_commit), rollbacks: Number(s.xact_rollback),
    tuples: { returned: Number(s.tup_returned), fetched: Number(s.tup_fetched), inserted: Number(s.tup_inserted), updated: Number(s.tup_updated), deleted: Number(s.tup_deleted) },
    sizeBytes: Number(s.size), pgStatStatements: pgss, topQueries,
  };
}
