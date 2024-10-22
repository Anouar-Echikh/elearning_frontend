import {
   //SAVE
   DEP_SAVE_FAILED,
   DEP_SAVE_SUCCESS,
   DEP_IS_SAVING,
   //LOAD
   DEP_FETCH_FAILED,
   DEP_FETCH_SUCCESS,
   ONE_DEP_FETCH_SUCCESS,
   DEP_IS_FETCHING,
     //DELETE
   DEP_DELETE_SUCCESS,
   DEP_DELETE_FAILED,
   DEP_IS_DELETING,
   //PATCH
   DEP_IS_PATCHING,
   DEP_PATCH_FAILED,
   DEP_PATCH_SUCCESS
  } from "../types/departmentsTypes";
  
  var initialState = {
    depSaved: false,
    depIsSaving: false,
    depIsFetching: false,
    depUpdated: false,
    depIsUpdating: false,
    depPatched: false,
    depIsPatching: false,
    depDeleted: false,
    depIsDeleting: false,
    error: null,
    deps: [],
    onedep:{}
  };
  
  const depsReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case DEP_IS_SAVING:
          return {
            ...state,
            depIsSaving: true,
            error: null
          };
        case DEP_SAVE_SUCCESS:
          return {
            ...state,
            depSaved: true,
            depIsSaving: false,
            error: null
          };
        case DEP_SAVE_FAILED:
          return {
            ...state,
            depIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case DEP_IS_FETCHING:
          return { ...state,depIsFetching: true };
        case DEP_FETCH_SUCCESS:
          return {
            ...state,
            depIsFetching: false,
            deps: action.payload,
            error: null
          };
          case ONE_DEP_FETCH_SUCCESS:
          return {
            ...state,
            depIsFetching: false,
            onedep: action.payload,
            error: null
          };
        case DEP_FETCH_FAILED:
          return {
            ...state,
            depIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case DEP_IS_PATCHING:
          return { ...state, depIsPatching: true,error: null };
        case DEP_PATCH_SUCCESS:
          return {
            ...state,
            depPatched: true,
            depIsPatching: false,
            error: null
          };
        case DEP_PATCH_FAILED:
          return {
            ...state,
            depIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case DEP_IS_DELETING:
        return { ...state, depIsDeleting: true,error: null };
      case DEP_DELETE_SUCCESS:
        return {
          ...state,
          depDeleted: true,
          depIsDeleting: false,
          error: null
        };
      case DEP_DELETE_FAILED:
        return {
          ...state,
          depIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default depsReducer;
  
  