export interface ICacheService {
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<void>;
    increment(key: string, ttlSeconds: number): Promise<number>;
  }