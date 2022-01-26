import ProjectActionType from "./project.type";
const INITIAL_STATE = {
  projects: [],
  error: null,
};

const ProjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectActionType.GET_PROJECT_SUCCESS:
        return {
            ...state,
            projects: action.payload
        };
    case ProjectActionType.ADD_PROJECT_SUCCESS:
    case ProjectActionType.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case ProjectActionType.GET_PROJECT_ERROR:
    case ProjectActionType.ADD_PROJECT_ERROR:
    case ProjectActionType.DELETE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
