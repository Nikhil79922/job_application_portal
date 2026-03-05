export interface IUserRepository {
    findByEmail(email: string): Promise<any | null>;
    findById(userId: string): Promise<any | null>;
    create(data: any): Promise<any>;
    update(userId: string, data: Partial<any>): Promise<void>;
    getUserWithSkills(email: string): Promise<any | null>;
}