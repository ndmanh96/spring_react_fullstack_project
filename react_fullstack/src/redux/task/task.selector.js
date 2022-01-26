import {createSelector} from 'reselect';

const selectTask = state => state.task;

export const selectError = createSelector(
    [selectTask],
    (task) => task.error
);

export const selectProjectTasks = createSelector(
    [selectTask],
    (task) => task.project_tasks
);

export const selectProjectTasksToDo = createSelector (
    [selectProjectTasks],
    (project_tasks) => project_tasks.filter(task => task.status == 'TO_DO')
)

export const selectProjectTasksDone = createSelector (
    [selectProjectTasks],
    (project_tasks) => project_tasks.filter(task => task.status == 'DONE')
)

export const selectProjectTasksInProcess = createSelector (
    [selectProjectTasks],
    (project_tasks) => project_tasks.filter(task => task.status == 'IN_PROGRESS')
)

export const selectTaskUpdate = (id) =>
  createSelector(
      [selectProjectTasks], 
      (project_tasks) => project_tasks.find(element => element.projectSequence == id)
  );