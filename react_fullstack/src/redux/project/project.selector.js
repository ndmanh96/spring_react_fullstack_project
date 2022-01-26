import {createSelector} from 'reselect';

const selectProject = state => state.project;
//const selectUser = state => state.user;

export const selectError = createSelector(
    [selectProject],
    (project) => project.error
);

export const selectListProject= createSelector (
    [selectProject],
    (project) => project.projects
);

export const selectProjectUpdate = (id) =>
  createSelector(
      [selectListProject], 
      (projects) => projects.find(element => element.id == id)
  );