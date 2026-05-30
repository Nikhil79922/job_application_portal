// Code-derived ER schema — ALL services share ONE Neon database `neondb` (identical DB_URL).
// Sources: services/*/src/infra/database/models/*.model.ts + migrations/*.sql
export interface Column { name: string; type: string; key?: "PK" | "FK" | "UQ"; }
export interface Table { name: string; service: string; x: number; y: number; columns: Column[]; }
export interface Relation { from: string; to: string; label: string; }

export const TABLES: Table[] = [
  // ── HUB: users sits center; 5 tables FK into it ──
  { name: "users", service: "auth+user", x: 470, y: 210, columns: [
    { name: "user_id", type: "serial", key: "PK" },
    { name: "name", type: "varchar(255)" },
    { name: "email", type: "varchar(255)", key: "UQ" },
    { name: "password", type: "varchar(255)" },
    { name: "phone_number", type: "varchar(20)" },
    { name: "role", type: "user_role" },
    { name: "bio", type: "text" },
    { name: "resume", type: "varchar(255)" },
    { name: "resume_upload_status", type: "file_upload_status" },
    { name: "profile_pic", type: "varchar(255)" },
    { name: "profile_pic_upload_status", type: "file_upload_status" },
    { name: "created_at", type: "timestamptz" },
    { name: "subscription", type: "timestamptz" } ] },
  // left column
  { name: "refresh_tokens", service: "auth", x: 70, y: 60, columns: [
    { name: "token_id", type: "serial", key: "PK" },
    { name: "user_id", type: "int", key: "FK" },
    { name: "token_hash", type: "varchar(200)", key: "UQ" },
    { name: "device", type: "varchar(100)" },
    { name: "device_type", type: "varchar(20)" },
    { name: "user_agent", type: "text" },
    { name: "revoked", type: "boolean" },
    { name: "expires_at", type: "timestamptz" } ] },
  { name: "user_skills", service: "auth+user", x: 70, y: 360, columns: [
    { name: "user_id", type: "int", key: "FK" },
    { name: "skill_id", type: "int", key: "FK" } ] },
  { name: "skills", service: "auth+user", x: 70, y: 520, columns: [
    { name: "skill_id", type: "serial", key: "PK" },
    { name: "name", type: "varchar(100)", key: "UQ" } ] },
  // right column
  { name: "companies", service: "job", x: 910, y: 60, columns: [
    { name: "company_id", type: "serial", key: "PK" },
    { name: "name", type: "varchar(255)", key: "UQ" },
    { name: "description", type: "text" },
    { name: "website", type: "varchar(500)" },
    { name: "logo", type: "varchar(500)" },
    { name: "logo_upload_status", type: "file_upload_status" },
    { name: "recruiter_id", type: "int", key: "FK" },
    { name: "created_at", type: "timestamp" } ] },
  { name: "jobs", service: "job", x: 910, y: 330, columns: [
    { name: "job_id", type: "serial", key: "PK" },
    { name: "title", type: "varchar(255)" },
    { name: "description", type: "text" },
    { name: "salary", type: "numeric(10,2)" },
    { name: "location", type: "varchar(500)" },
    { name: "job_type", type: "job_type" },
    { name: "openings", type: "int" },
    { name: "role", type: "varchar(255)" },
    { name: "work_location", type: "work_location" },
    { name: "company_id", type: "int", key: "FK" },
    { name: "posted_by_recruiter", type: "int", key: "FK" },
    { name: "is_active", type: "boolean" } ] },
  { name: "applications", service: "job", x: 490, y: 600, columns: [
    { name: "application_id", type: "serial", key: "PK" },
    { name: "job_id", type: "int", key: "FK" },
    { name: "applicant_id", type: "int", key: "FK" },
    { name: "applicant_email", type: "varchar(255)" },
    { name: "status", type: "application_status" },
    { name: "resume", type: "varchar(500)" },
    { name: "subscribed", type: "boolean" },
    { name: "applied_at", type: "timestamp" } ] },
];

// FK references (ON DELETE CASCADE in all cases)
export const RELATIONS: Relation[] = [
  { from: "refresh_tokens", to: "users", label: "user_id → users.user_id" },
  { from: "user_skills", to: "users", label: "user_id → users.user_id" },
  { from: "user_skills", to: "skills", label: "skill_id → skills.skill_id" },
  { from: "companies", to: "users", label: "recruiter_id → users.user_id" },
  { from: "jobs", to: "companies", label: "company_id → companies.company_id" },
  { from: "jobs", to: "users", label: "posted_by_recruiter → users.user_id" },
  { from: "applications", to: "jobs", label: "job_id → jobs.job_id" },
  { from: "applications", to: "users", label: "applicant_id → users.user_id" },
];

// Color by OWNING service (tables physically shared in one DB; ownership = which service defines/writes them)
export const SERVICE_COLORS: Record<string, string> = {
  auth: "#7c3aed", "auth+user": "#8b5cf6", user: "#3b82f6", job: "#34d399", payment: "#f59e0b",
};
