import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import TaskActionType from "./task.type";
import { addTaskSuccess, addTaskError, getBacklogSuccess, getBacklogError, updateTaskSuccess, updateTaskError, deleteTaskSuccess, deleteTaskError } from "./task.action";

export function* addTask({payload: {backlog_id, task, router}}) {
    try {
        const res = yield axios.post(`http://localhost:8000/api/backlogs/${backlog_id}`, task);
        yield put(addTaskSuccess());
        router.navigate(`/projectboard/${backlog_id}`);
    } catch (error) {
        yield put(addTaskError(error.response));
    }
}
export function* onTaskStart() {
    yield takeLatest(TaskActionType.ADD_TASK_START, addTask);
}
export function* getBacklog({payload: {backlog_id}}) {
    try {
        const res = yield axios.get(`http://localhost:8000/api/backlogs/${backlog_id}`);
        yield put(getBacklogSuccess(res.data));
    } catch (error) {
        yield put(getBacklogError(error.response));
    }
}
export function* onGetBacklogStart() {
    yield takeLatest(TaskActionType.GET_BACKLOG_START, getBacklog);
}


export function* updateTask({payload: {backlog_id, task, router}}) {
    try {
        const res = yield axios.patch(`http://localhost:8000/api/backlogs/${backlog_id}/${task.projectSequence}`, task);
        yield put(updateTaskSuccess());
        router.navigate(`/projectboard/${backlog_id}`);
    } catch (error) {
        yield put(updateTaskError(error.response));
    }
}
export function* onUpdateTaskStart() {
    yield takeLatest(TaskActionType.UPDATE_TASK_START, updateTask);
}

export function* deleteTask({payload: {backlog_id, task, router}}) {
    try {
        const res = yield axios.delete(`http://localhost:8000/api/backlogs/${backlog_id}/${task.projectSequence}`);
        yield put(deleteTaskSuccess(task.projectSequence));
        router.navigate(`/projectboard/${backlog_id}`);
    } catch (error) {
        yield put(deleteTaskError(error.response));
    }
}
export function* onDeleteTaskStart() {
    yield takeLatest(TaskActionType.DELETE_TASK_START, deleteTask);
}
export function* taskSaga() {
    yield all([
      call(onTaskStart),
      call(onGetBacklogStart),
      call(onUpdateTaskStart),
      call(onDeleteTaskStart)
    ]);
}