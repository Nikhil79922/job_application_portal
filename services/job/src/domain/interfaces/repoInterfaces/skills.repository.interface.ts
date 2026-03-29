export interface SkillsRepository {
    insertOrGetSkill(skillName: string ,tx:any): Promise<any | null>;
}