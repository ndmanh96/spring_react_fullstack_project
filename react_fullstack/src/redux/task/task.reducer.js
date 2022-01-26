import TaskActionType from "./task.type";

const INITIAL_STATE = {
  project_tasks: [],
  project_task: {},
  error: null,
};

const TaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TaskActionType.GET_BACKLOG_SUCCESS:
        return {
            ...state,
            project_tasks: action.payload,
            error: null
        }
    case TaskActionType.ADD_TASK_SUCCESS:
    case TaskActionType.UPDATE_TASK_SUCCESS:
        return {
            ...state,
            error:null
        }
    case TaskActionType.DELETE_TASK_SUCCESS:
        return {
            ...state,
            project_tasks: state.project_tasks.filter(element => element.projectSequence != action.payload)
        }
    case TaskActionType.GET_BACKLOG_ERROR:
    case TaskActionType.ADD_TASK_ERROR:
    case TaskActionType.UPDATE_TASK_ERROR:
    case TaskActionType.DELETE_TASK_ERROR:
        return {
            ...state,
            error: action.payload
        }
    default:
      return state;
  }
};

export default TaskReducer;
