import { combineReducers } from "redux";
import ProjectReducer from "./project/project.reducer";
import TaskReducer from "./task/task.reducer";
import UserReducer from './user/user.reducer';

const rootReducer = combineReducers({
  project: ProjectReducer,
  task: TaskReducer,
  user: UserReducer
});

export default rootReducer;
