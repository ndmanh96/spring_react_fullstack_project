import ProjectActionType from "./project.type";
import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import {addProjectSuccess, addProjectError, getProjectSuccess, getProjectError, deleteProjectSuccess, deleteProjectError, getProjectStart} from './project.action';

export function* addProject({payload: {project, router}}) {
    try {
        const res = yield axios.post("http://localhost:8000/api/projects", project);
        yield put(addProjectSuccess());
        router.navigate('/dashboard');
    } catch (error) {
        yield put(addProjectError(error.response));
    }
}
export function* onAddProjectStart() {
    yield takeLatest(ProjectActionType.ADD_PROJECT_START, addProject);
}

export function* getProject() {
    try {
        const res = yield axios.get("http://localhost:8000/api/projects");
        yield put(getProjectSuccess(res.data));
    } catch (error) {
        yield put(getProjectError(error.response));
    }
}

export function* onGetProjectStart() {
    yield takeLatest(ProjectActionType.GET_PROJECT_START, getProject);
}

export function* deleteProject({payload: {projectIdentifier, router}}) {
    try {
        const res = yield axios.delete(`http://localhost:8000/api/projects/${projectIdentifier}`);
        yield put(deleteProjectSuccess());
        yield put(getProjectStart());
    } catch (error) {
        yield put(deleteProjectError(error.response));
    }
}

export function* onDeleteProjectStart() {
    yield takeLatest(ProjectActionType.DELETE_PROJECT_START, deleteProject);
}
export function* projectSaga() {
    yield all([
      call(onAddProjectStart),
      call(onGetProjectStart),
      call(onDeleteProjectStart)
    ]);
}