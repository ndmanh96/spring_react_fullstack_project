import ProjectActionType from "./project.type";

export const addProjectStart = (project, router) => ({
  type: ProjectActionType.ADD_PROJECT_START,
  payload: {project, router},
});

export const addProjectSuccess = () => ({
  type: ProjectActionType.ADD_PROJECT_SUCCESS,
});

export const addProjectError = (error) => ({
  type: ProjectActionType.ADD_PROJECT_ERROR,
  payload: error
});


export const getProjectStart = () => ({
  type: ProjectActionType.GET_PROJECT_START
});

export const getProjectSuccess = (projects) => ({
  type: ProjectActionType.GET_PROJECT_SUCCESS,
  payload: projects
});

export const getProjectError = (error) => ({
  type: ProjectActionType.GET_PROJECT_ERROR,
  payload: error
});


export const deleteProjectStart = (projectIdentifier, router) => ({
  type: ProjectActionType.DELETE_PROJECT_START,
  payload: {projectIdentifier, router}
});

export const deleteProjectSuccess = () => ({
  type: ProjectActionType.DELETE_PROJECT_SUCCESS
});

export const deleteProjectError = (error) => ({
  type: ProjectActionType.DELETE_PROJECT_ERROR,
  payload: error
});