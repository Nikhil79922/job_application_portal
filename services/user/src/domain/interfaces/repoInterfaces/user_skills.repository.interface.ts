export interface User_SkillsRepository {
    addSkillToUser(userId:number , skillId: number , tx:any ): Promise<any | null>;
    deleteSkillToUser(userId:number , skillName: string ): Promise<any | null>;
}