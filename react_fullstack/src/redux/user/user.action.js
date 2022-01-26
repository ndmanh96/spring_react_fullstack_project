import UserActionType from './user.type';

export const signupStart = (user, router) => ({
    type: UserActionType.SIGNUP_START,
    payload: {user, router},
  });
  
  export const signupSuccess = () => ({
    type: UserActionType.SIGNUP_SUCCESS,
  });
  
  export const signupError = (error) => ({
    type: UserActionType.SIGNUP_ERROR,
    payload: error
  });


  export const loginStart = (user, router) => ({
    type: UserActionType.LOGIN_START,
    payload: {user, router},
  });
  
  export const loginSuccess = (user) => ({
    type: UserActionType.LOGIN_SUCCESS,
    payload: user
  });
  
  export const loginError = (error) => ({
    type: UserActionType.LOGIN_ERROR,
    payload: error
  });