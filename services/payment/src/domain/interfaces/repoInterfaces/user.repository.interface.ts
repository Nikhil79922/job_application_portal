export interface IUserRepository {
    findByEmail(email: string): Promise<any | null>;
    findById(userId: string | number , tx?:any): Promise<any | null>;
    update(userId: number | string, data: Partial<any>): Promise<any | null>;
    getUserWithSkills(userId :number ): Promise<any | null>;
}