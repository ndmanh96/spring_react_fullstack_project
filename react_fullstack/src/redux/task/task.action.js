import TaskActionType from "./task.type";

export const getBacklogStart = (backlog_id) => ({
  type: TaskActionType.GET_BACKLOG_START,
  payload: {backlog_id}
});

export const getBacklogSuccess = (tasks) => ({
  type: TaskActionType.GET_BACKLOG_SUCCESS,
  payload: tasks,
});

export const getBacklogError = (error) => ({
  type: TaskActionType.GET_BACKLOG_ERROR,
  payload: error,
});

export const addTaskStart = (backlog_id, task, router) => ({
  type: TaskActionType.ADD_TASK_START,
  payload: {backlog_id, task, router},
});

export const addTaskSuccess = () => ({
  type: TaskActionType.ADD_TASK_SUCCESS,
});

export const addTaskError = (error) => ({
  type: TaskActionType.ADD_TASK_ERROR,
  payload: error
});

export const updateTaskStart = (backlog_id, task, router) => ({
  type: TaskActionType.UPDATE_TASK_START,
  payload: {backlog_id, task, router},
});

export const updateTaskSuccess = () => ({
  type: TaskActionType.UPDATE_TASK_SUCCESS,
});

export const updateTaskError = (error) => ({
  type: TaskActionType.UPDATE_TASK_ERROR,
  payload: error
});


export const deleteTaskStart = (backlog_id, task, router) => ({
  type: TaskActionType.DELETE_TASK_START,
  payload: {backlog_id, task, router},
});

export const deleteTaskSuccess = (id) => ({
  type: TaskActionType.DELETE_TASK_SUCCESS,
  payload: id
});

export const deleteTaskError = (error) => ({
  type: TaskActionType.DELETE_TASK_ERROR,
  payload: error
});