import {
    ABOUT_SAVE_FAILED,
    ABOUT_SAVE_SUCCESS,
    ABOUT_IS_SAVING,
    ABOUT_FETCH_FAILED,
    ABOUT_FETCH_SUCCESS,
    ABOUT_IS_FETCHING,
    ABOUT_IS_UPDATING,
    ABOUT_UPDATE_FAILED,
    ABOUT_UPDATE_SUCCESS
   
  } from "../types/aboutTypes";
  
  var initialState = {
    aboutSaved: false,
    aboutIsSaving: false,
    aboutIsFetching: false,
    aboutUpdated: false,
    aboutIsUpdating: false,
    about: {}
  };
  
  const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
      //-------Save-------//
      case ABOUT_IS_SAVING:
        return {
          ...state,
          aboutIsSaving: true
        };
      case ABOUT_SAVE_SUCCESS:
        return {
          ...state,
          aboutSaved: true,
          aboutIsSaving: false
        };
      case ABOUT_SAVE_FAILED:
        return {
          ...state,
          aboutIsSaving: false
        };
  
      //-------Fetch-------//
      case ABOUT_IS_FETCHING:
        return { ...state,aboutIsFetching: true };
      case ABOUT_FETCH_SUCCESS:
        return {
          ...state,
          aboutIsFetching: false,
          about: action.payload
        };
      case ABOUT_FETCH_FAILED:
        return {
          ...state,
          aboutIsFetching: false
        };
  
      //-------update-------//
      case ABOUT_IS_UPDATING:
        return { ...state, aboutIsUpdating: true };
      case ABOUT_UPDATE_SUCCESS:
        return {
          ...state,
          aboutUpdated: true,
          aboutIsUpdating: false
        };
      case ABOUT_UPDATE_FAILED:
        return {
          ...state,
          aboutIsUpdating: false
        };
  
      default:
        return state;
    }
  };
  export default aboutReducer;
  
  