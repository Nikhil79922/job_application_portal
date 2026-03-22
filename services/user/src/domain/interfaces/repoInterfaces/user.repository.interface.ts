export interface IUserRepository {
    findByEmail(email: string): Promise<any | null>;
    findById(userId: string | number , tx?:any): Promise<any | null>;
    update(userId: number | string, data: Partial<any>): Promise<void>;
    getUserWithSkills(userId :number ): Promise<any | null>;
}