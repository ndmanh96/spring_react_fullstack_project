import { all, call } from 'redux-saga/effects';

import { projectSaga } from './project/project.saga';
import { taskSaga } from './task/task.saga';
import {userSaga} from './user/user.saga';

export default function* rootSaga() {
  yield all([call(projectSaga), call(taskSaga), call(userSaga)]);
}