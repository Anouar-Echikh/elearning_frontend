import {
   //SAVE
   THEME_SAVE_FAILED,
   THEME_SAVE_SUCCESS,
   THEME_IS_SAVING,
   //LOAD
   THEME_FETCH_FAILED,
   THEME_FETCH_SUCCESS,
   ONE_THEME_FETCH_SUCCESS,
   THEME_IS_FETCHING,
     //DELETE
   THEME_DELETE_SUCCESS,
   THEME_DELETE_FAILED,
   THEME_IS_DELETING,
   //PATCH
   THEME_IS_PATCHING,
   THEME_PATCH_FAILED,
   THEME_PATCH_SUCCESS
  } from "../types/themesTypes";
  
  var initialState = {
    themeSaved: false,
    themeIsSaving: false,
    themeIsFetching: false,
    themeUpdated: false,
    themeIsUpdating: false,
    themePatched: false,
    themeIsPatching: false,
    themeDeleted: false,
    themeIsDeleting: false,
    error: null,
    themes: [],
    onetheme:{}
  };
  
  const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case THEME_IS_SAVING:
          return {
            ...state,
            themeIsSaving: true,
            error: null
          };
        case THEME_SAVE_SUCCESS:
          return {
            ...state,
            themeSaved: true,
            themeIsSaving: false,
            error: null
          };
        case THEME_SAVE_FAILED:
          return {
            ...state,
            themeIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case THEME_IS_FETCHING:
          return { ...state,themeIsFetching: true };
        case THEME_FETCH_SUCCESS:
          return {
            ...state,
            themeIsFetching: false,
            themes: action.payload,
            error: null
          };
          case ONE_THEME_FETCH_SUCCESS:
          return {
            ...state,
            themeIsFetching: false,
            oneTheme: action.payload,
            error: null
          };
        case THEME_FETCH_FAILED:
          return {
            ...state,
            themeIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case THEME_IS_PATCHING:
          return { ...state, themeIsPatching: true,error: null };
        case THEME_PATCH_SUCCESS:
          return {
            ...state,
            themePatched: true,
            themeIsPatching: false,
            error: null
          };
        case THEME_PATCH_FAILED:
          return {
            ...state,
            themeIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case THEME_IS_DELETING:
        return { ...state, themeIsDeleting: true,error: null };
      case THEME_DELETE_SUCCESS:
        return {
          ...state,
          themeDeleted: true,
          themeIsDeleting: false,
          error: null
        };
      case THEME_DELETE_FAILED:
        return {
          ...state,
          themeIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default themesReducer;
  
  