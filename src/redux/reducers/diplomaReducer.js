import {
  //SAVE
    DIPLOMA_SAVE_FAILED,
    DIPLOMA_SAVE_SUCCESS,
    DIPLOMA_IS_SAVING,
    //LOAD
    DIPLOMA_FETCH_FAILED,
    DIPLOMA_FETCH_SUCCESS,
    DIPLOMA_IS_FETCHING,
    //UPDATE
    DIPLOMA_IS_UPDATING,
    DIPLOMA_UPDATE_FAILED,
    DIPLOMA_UPDATE_SUCCESS,
    //DELETE
    DIPLOMA_DELETE_SUCCESS,
    DIPLOMA_DELETE_FAILED,
    DIPLOMA_IS_DELETING,
    //PATCH
    DIPLOMA_IS_PATCHING,
    DIPLOMA_PATCH_FAILED,
    DIPLOMA_PATCH_SUCCESS
   
  } from "../types/diplomaTypes";
  
  var initialState = {
    diplomaSaved: false,
    diplomaIsSaving: false,
    diplomaIsFetching: false,
    diplomaUpdated: false,
    diplomaIsUpdating: false,
    diplomaPatched: false,
    diplomaIsPatching: false,
    diplomaDeleted: false,
    diplomaIsDeleting: false,
    error: null,
    diplomas: [],
    diploma:{}
  };
  
  const diplomaReducer = (state = initialState, action) => {
    switch (action.type) {
      //-------Save-------//
      case DIPLOMA_IS_SAVING:
        return {
          ...state,
          diplomaIsSaving: true,
          error: null
        };
      case DIPLOMA_SAVE_SUCCESS:
        return {
          ...state,
          diplomaSaved: true,
          diplomaIsSaving: false,
          error: null,
          diploma:action.payload
        };
      case DIPLOMA_SAVE_FAILED:
        return {
          ...state,
          diplomaIsSaving: false,
          error: action.payload
        };
  
      //-------Fetch-------//
      case DIPLOMA_IS_FETCHING:
        return { ...state,
          diplomaIsFetching: true,
          error: null };
      case DIPLOMA_FETCH_SUCCESS:
        return {
          ...state,
          diplomaIsFetching: false,
          diplomas: action.payload,
          error: null
        };
      case DIPLOMA_FETCH_FAILED:
        return {
          ...state,
          diplomaIsFetching: false,
          error: action.payload
        };
  
      //-------update-------//
      case DIPLOMA_IS_UPDATING:
        return { ...state, diplomaIsUpdating: true,error: null };
      case DIPLOMA_UPDATE_SUCCESS:
        return {
          ...state,
          diplomaUpdated: true,
          diplomaIsUpdating: false,
          error: null
        };
      case DIPLOMA_UPDATE_FAILED:
        return {
          ...state,
          diplomaIsUpdating: false,
          error: action.payload
        };
        //-------patch-------//
      case DIPLOMA_IS_PATCHING:
        return { ...state, diplomaIsPatching: true,error: null };
      case DIPLOMA_PATCH_SUCCESS:
        return {
          ...state,
          diplomaPatched: true,
          diplomaIsPatching: false,
          error: null
        };
      case DIPLOMA_PATCH_FAILED:
        return {
          ...state,
          diplomaIsPatching: false,
          error: action.payload
        };
        //-------Delete-------//
    case DIPLOMA_IS_DELETING:
      return { ...state, diplomaIsDeleting: true ,error: null};
    case DIPLOMA_DELETE_SUCCESS:
      return {
        ...state,
        diplomaDeleted: true,
        diplomaIsDeleting: false,
        error: null
      };
    case DIPLOMA_DELETE_FAILED:
      return {
        ...state,
        diplomaIsDeleting: false,
        error: action.payload
        
      };
  
      default:
        return state;
    }
  };
  export default diplomaReducer;
  
  