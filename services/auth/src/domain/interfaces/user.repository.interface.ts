export interface IUserRepository {
    findByEmail(email: string): Promise<any | null>;
    findById(userId: number): Promise<any | null>;
    create(data: any): Promise<any>;
    update(userId: number, data: Partial<any>): Promise<void>;
    getUserWithSkills(email: string): Promise<any | null>;
}