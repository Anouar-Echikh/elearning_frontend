import {
   //SAVE
   SUBDEP_SAVE_FAILED,
   SUBDEP_SAVE_SUCCESS,
   SUBDEP_IS_SAVING,
   //LOAD
   SUBDEP_FETCH_FAILED,
   SUBDEP_FETCH_SUCCESS,
   ONE_SUBDEP_FETCH_SUCCESS,
   SUBDEP_IS_FETCHING,
     //DELETE
   SUBDEP_DELETE_SUCCESS,
   SUBDEP_DELETE_FAILED,
   SUBDEP_IS_DELETING,
   //PATCH
   SUBDEP_IS_PATCHING,
   SUBDEP_PATCH_FAILED,
   SUBDEP_PATCH_SUCCESS
  } from "../types/sub-departmentsTypes";
  
  var initialState = {
    subDepSaved: false,
    subDepIsSaving: false,
    subDepIsFetching: false,
    subDepUpdated: false,
    subDepIsUpdating: false,
    subDepPatched: false,
    subDepIsPatching: false,
    subDepDeleted: false,
    subDepIsDeleting: false,
    error: null,
    subDeps: [],
    onesubDep:{}
  };
  
  const subDepsReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case SUBDEP_IS_SAVING:
          return {
            ...state,
            subDepIsSaving: true,
            error: null
          };
        case SUBDEP_SAVE_SUCCESS:
          return {
            ...state,
            subDepSaved: true,
            subDepIsSaving: false,
            error: null
          };
        case SUBDEP_SAVE_FAILED:
          return {
            ...state,
            subDepIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case SUBDEP_IS_FETCHING:
          return { ...state,subDepIsFetching: true };
        case SUBDEP_FETCH_SUCCESS:
          return {
            ...state,
            subDepIsFetching: false,
            subDeps: action.payload,
            error: null
          };
          case ONE_SUBDEP_FETCH_SUCCESS:
          return {
            ...state,
            subDepIsFetching: false,
            onesubDep: action.payload,
            error: null
          };
        case SUBDEP_FETCH_FAILED:
          return {
            ...state,
            subDepIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case SUBDEP_IS_PATCHING:
          return { ...state, subDepIsPatching: true,error: null };
        case SUBDEP_PATCH_SUCCESS:
          return {
            ...state,
            subDepPatched: true,
            subDepIsPatching: false,
            error: null
          };
        case SUBDEP_PATCH_FAILED:
          return {
            ...state,
            subDepIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case SUBDEP_IS_DELETING:
        return { ...state, subDepIsDeleting: true,error: null };
      case SUBDEP_DELETE_SUCCESS:
        return {
          ...state,
          subDepDeleted: true,
          subDepIsDeleting: false,
          error: null
        };
      case SUBDEP_DELETE_FAILED:
        return {
          ...state,
          subDepIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default subDepsReducer;
  
  