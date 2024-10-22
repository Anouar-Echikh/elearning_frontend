import {
   //SAVE
   ORG_SAVE_FAILED,
   ORG_SAVE_SUCCESS,
   ORG_IS_SAVING,
   //LOAD
   ORG_FETCH_FAILED,
   ORG_FETCH_SUCCESS,
   ONE_ORG_FETCH_SUCCESS,
   ORG_IS_FETCHING,
     //DELETE
   ORG_DELETE_SUCCESS,
   ORG_DELETE_FAILED,
   ORG_IS_DELETING,
   //PATCH
   ORG_IS_PATCHING,
   ORG_PATCH_FAILED,
   ORG_PATCH_SUCCESS
  } from "../types/OrgsTypes";
  
  var initialState = {
    orgSaved: false,
    orgIsSaving: false,
    orgIsFetching: false,
    orgUpdated: false,
    orgIsUpdating: false,
    orgPatched: false,
    orgIsPatching: false,
    orgDeleted: false,
    orgIsDeleting: false,
    error: null,
    orgs: [],
    oneorg:{}
  };
  
  const orgsReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case ORG_IS_SAVING:
          return {
            ...state,
            orgIsSaving: true,
            error: null
          };
        case ORG_SAVE_SUCCESS:
          return {
            ...state,
            orgSaved: true,
            orgIsSaving: false,
            error: null
          };
        case ORG_SAVE_FAILED:
          return {
            ...state,
            orgIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case ORG_IS_FETCHING:
          return { ...state,orgIsFetching: true };
        case ORG_FETCH_SUCCESS:
          return {
            ...state,
            orgIsFetching: false,
            orgs: action.payload,
            error: null
          };
          case ONE_ORG_FETCH_SUCCESS:
          return {
            ...state,
            orgIsFetching: false,
            oneorg: action.payload,
            error: null
          };
        case ORG_FETCH_FAILED:
          return {
            ...state,
            orgIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case ORG_IS_PATCHING:
          return { ...state, orgIsPatching: true,error: null };
        case ORG_PATCH_SUCCESS:
          return {
            ...state,
            orgPatched: true,
            orgIsPatching: false,
            error: null
          };
        case ORG_PATCH_FAILED:
          return {
            ...state,
            orgIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case ORG_IS_DELETING:
        return { ...state, orgIsDeleting: true,error: null };
      case ORG_DELETE_SUCCESS:
        return {
          ...state,
          orgDeleted: true,
          orgIsDeleting: false,
          error: null
        };
      case ORG_DELETE_FAILED:
        return {
          ...state,
          orgIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default orgsReducer;
  
  