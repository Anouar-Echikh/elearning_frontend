
import {
  USER_IS_SAVING,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAILED,
  USER_DELETE_FAILED,
  USER_DELETE_SUCCESS,
  USER_IS_DELETING,
  USER_FETCH_FAILED,
  USER_FETCH_SUCCESS,
  USER_IS_FETCHING,
  USER_IS_UPDATING,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
   //PATCH
   USER_IS_PATCHING,
   USER_PATCH_FAILED,
   USER_PATCH_SUCCESS,
  ONE_USER_FETCH_SUCCESS,
  VERIFY_USER,
  USER_PDF
} from "../types/usersTypes";

var initialState = {
  userSaved:false,
  userIsSaving:false,
  userDeleted: false,
  userIsDeleting: false,
  userUpdated: false,
  userIsUpdating: false,
  userPatched: false,
    userIsPatching: false,
  error: null,
  user: {},
  verifUser: {},
  users: [],
  pdfUsers: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
     //-------Save-------//
     case USER_IS_SAVING:
      return {
        ...state,
        userIsSaving: true,
        error: null
      };
    case USER_SAVE_SUCCESS:
      return {
        ...state,
        userSaved: true,
        userIsSaving: false,
        error: null
      };
    case USER_SAVE_FAILED:
      return {
        ...state,
        userIsSaving: false,
        error: action.payload
      };

    //-------Fetch-------//
    case USER_IS_FETCHING:
      return { ...state, userIsFetching: true };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        userIsFetching: false,
        users: action.payload,
        error: null
      };
    case ONE_USER_FETCH_SUCCESS:
      return {
        ...state,
        userIsFetching: false,
        user: action.payload,
        error: null
      };
    case VERIFY_USER:
      return {
        ...state,
        verifUser: action.payload
      };
    case USER_FETCH_FAILED:
      return {
        ...state,
        userIsFetching: false,
        error: action.payload
      };

    //-------update-------//
    case USER_IS_UPDATING:
      return { ...state, userIsUpdating: true };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdated: true,
        userIsUpdating: false
      };
    case USER_UPDATE_FAILED:
      return {
        ...state,
        userIsUpdating: false,
        error: action.payload
      };
//-------patch-------//
case USER_IS_PATCHING:
  return { ...state, userIsPatching: true,error: null };
case USER_PATCH_SUCCESS:
  return {
    ...state,
    userPatched: true,
    userIsPatching: false,
    error: null
  };
case USER_PATCH_FAILED:
  return {
    ...state,
    userIsPatching: false,
    error: action.payload
  };
    //-------Delete-------//
    case USER_IS_DELETING:
      return { ...state, userIsDeleting: true };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        userDeleted: true,
        userIsDeleting: false
      };
    case USER_DELETE_FAILED:
      return {
        ...state,
        userIsDeleting: false,
        error: action.payload
      };
    //-------CLIENT PDF-------//
    case USER_PDF:
      return {
        ...state,
        pdfUsers: action.data
      };

    //----DEFAULT----//
    default:
      return state;
  }
};
export default usersReducer;
