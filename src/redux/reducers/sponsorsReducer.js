import {
   //SAVE
   SPONSOR_SAVE_FAILED,
   SPONSOR_SAVE_SUCCESS,
   SPONSOR_IS_SAVING,
   //LOAD
   SPONSOR_FETCH_FAILED,
   SPONSOR_FETCH_SUCCESS,
   ONE_SPONSOR_FETCH_SUCCESS,
   SPONSOR_IS_FETCHING,
   //UPDATE
   SPONSOR_IS_UPDATING,
   SPONSOR_UPDATE_FAILED,
   SPONSOR_UPDATE_SUCCESS,
   //DELETE
   SPONSOR_DELETE_SUCCESS,
   SPONSOR_DELETE_FAILED,
   SPONSOR_IS_DELETING,
   //PATCH
   SPONSOR_IS_PATCHING,
   SPONSOR_PATCH_FAILED,
   SPONSOR_PATCH_SUCCESS
  } from "../types/sponsorsTypes";
  
  var initialState = {
    sponsorSaved: false,
    sponsorIsSaving: false,
    sponsorIsFetching: false,
    sponsorUpdated: false,
    sponsorIsUpdating: false,
    sponsorPatched: false,
    sponsorIsPatching: false,
    sponsorDeleted: false,
    sponsorIsDeleting: false,
    error: null,
    sponsors: [],
    oneSponsor:{}
  };
  
  const sponsorsReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case SPONSOR_IS_SAVING:
          return {
            ...state,
            sponsorIsSaving: true,
            error: null
          };
        case SPONSOR_SAVE_SUCCESS:
          return {
            ...state,
            sponsorSaved: true,
            sponsorIsSaving: false,
            error: null
          };
        case SPONSOR_SAVE_FAILED:
          return {
            ...state,
            sponsorIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case SPONSOR_IS_FETCHING:
          return { ...state,sponsorIsFetching: true };
        case SPONSOR_FETCH_SUCCESS:
          return {
            ...state,
            sponsorIsFetching: false,
            sponsors: action.payload,
            error: null
          };
          case ONE_SPONSOR_FETCH_SUCCESS:
          return {
            ...state,
            sponsorIsFetching: false,
            oneSponsor: action.payload,
            error: null
          };
        case SPONSOR_FETCH_FAILED:
          return {
            ...state,
            sponsorIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case SPONSOR_IS_PATCHING:
          return { ...state, sponsorIsPatching: true,error: null };
        case SPONSOR_PATCH_SUCCESS:
          return {
            ...state,
            sponsorPatched: true,
            sponsorIsPatching: false,
            error: null
          };
        case SPONSOR_PATCH_FAILED:
          return {
            ...state,
            sponsorIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case SPONSOR_IS_DELETING:
        return { ...state, sponsorIsDeleting: true,error: null };
      case SPONSOR_DELETE_SUCCESS:
        return {
          ...state,
          sponsorDeleted: true,
          sponsorIsDeleting: false,
          error: null
        };
      case SPONSOR_DELETE_FAILED:
        return {
          ...state,
          sponsorIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default sponsorsReducer;
  
  