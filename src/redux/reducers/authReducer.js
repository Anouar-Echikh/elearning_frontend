import {
  AUTH_SUCCESS,
  AUTH_FAILED,
  IN_AUTH,
  USER_LOGOUT,
  PROFILE_FETCHED,
  AUTH_FAILED_ONLOADING,
  USER_LOCK,
  USER_UNLOCK,
  USER_FETCHED
} from "../types/authTypes";

var initialState = {
  isAuth: false,
  inAuth: false,
  isLocked: true,
  profile: {},
  error: null,
  onLoading_error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //Success of authorization
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLocked: false,
        inAuth: false,
        error: null
      };
    // aUTH IN PROGRESS
    case IN_AUTH:
      return { ...state, inAuth: true,error:null };
    //Faile of authorization
    case AUTH_FAILED:
      return { ...state, isAuth: false, inAuth: false, error: action.payload };
    //User logout
    case USER_LOGOUT:
      return {
        ...state,
        isAuth: false,
        isLocked: true,
        error: null,
        profile: {}
      };
    //Fetch profile
    case PROFILE_FETCHED:
      return { ...state, isAuth: true, error: null, profile: action.payload };
    case USER_FETCHED:
      return { ...state, error: null, profile: action.payload };

    case AUTH_FAILED_ONLOADING:
      return {
        ...state,
        isAuth: false,
        inAuth: false,
        onLoading_error: action.payload
      };
    case USER_LOCK:
      return { ...state, inAuth: false, isLocked: true };
    case USER_UNLOCK:
      return { ...state, inAuth: false, isLocked: false };
    default:
      return state;
  }
};
export default authReducer;
