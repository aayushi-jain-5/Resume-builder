export const ADD_SKILL = "ADD_SKILL";
export const DELETE_SKILL = "DELETE_SKILL";

export interface Skill {
  id: number;
  text: string;  
}

export type SkillAction =
  | { type: typeof ADD_SKILL; payload: { skill: string } }
  | { type: typeof DELETE_SKILL; payload: { skillId: number } };

export const addSkill = (skill: string): SkillAction => ({
  type: ADD_SKILL,
  payload: { skill },
});

export const deleteSkill = (skillId: number): SkillAction => ({
  type: DELETE_SKILL,
  payload: { skillId },
});
