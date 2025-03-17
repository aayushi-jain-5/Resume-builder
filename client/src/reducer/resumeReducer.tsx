import { SkillAction, ADD_SKILL, DELETE_SKILL } from './action';

interface ResumeState {
  tasks: { id: number; text: string }[];  
}

const initialState: ResumeState = {
  tasks: [],  
};

export const resumeReducer = (state = initialState, action: SkillAction): ResumeState => {
  switch (action.type) {
    case ADD_SKILL:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: state.tasks.length + 1, text: action.payload.skill },  
        ],
      };

    case DELETE_SKILL:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.skillId), 
      };

    default:
      return state;
  }
};
