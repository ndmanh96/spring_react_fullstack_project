import {createSelector} from 'reselect';

const selectUser = state => state.user;
//const selectUser = state => state.user;

export const selectError = createSelector(
    [selectUser],
    (user) => user.error
);