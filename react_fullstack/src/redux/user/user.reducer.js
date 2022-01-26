import UserActionType from "./user.type";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.SIGNUP_SUCCESS:
        return {
            ...state,
            error: null
        }
    case UserActionType.LOGIN_SUCCESS:
        return {
            ...state,
            error: null,
            currentUser: action.payload
        }
    case UserActionType.LOGIN_ERROR:
    case UserActionType.SIGNUP_ERROR:
        return {
            ...state,
            error: action.payload
        }
    default:
      return state;
  }
};

export default UserReducer;
