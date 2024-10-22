import {
   //SAVE
   INSCRIPTION_SAVE_FAILED,
   INSCRIPTION_SAVE_SUCCESS,
   INSCRIPTION_IS_SAVING,
   //LOAD
   INSCRIPTION_FETCH_FAILED,
   INSCRIPTION_FETCH_SUCCESS,
   ONE_INSCRIPTION_FETCH_SUCCESS,
   INSCRIPTION_IS_FETCHING,
   //UPDATE
   INSCRIPTION_IS_UPDATING,
   INSCRIPTION_UPDATE_FAILED,
   INSCRIPTION_UPDATE_SUCCESS,
   //DELETE
   INSCRIPTION_DELETE_SUCCESS,
   INSCRIPTION_DELETE_FAILED,
   INSCRIPTION_IS_DELETING,
   //PATCH
   INSCRIPTION_IS_PATCHING,
   INSCRIPTION_PATCH_FAILED,
   INSCRIPTION_PATCH_SUCCESS
  } from "../types/inscriptionTypes";
  
  var initialState = {
    inscriptionSaved: false,
    inscriptionIsSaving: false,
    inscriptionIsFetching: false,
    inscriptionUpdated: false,
    inscriptionIsUpdating: false,
    inscriptionPatched: false,
    inscriptionIsPatching: false,
    inscriptionDeleted: false,
    inscriptionIsDeleting: false,
    error: null,
    inscriptions: [],
    oneinscription:{}
  };
  
  const inscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case INSCRIPTION_IS_SAVING:
          return {
            ...state,
            inscriptionIsSaving: true,
            error: null
          };
        case INSCRIPTION_SAVE_SUCCESS:
          return {
            ...state,
            inscriptionSaved: true,
            inscriptionIsSaving: false,
            error: null
          };
        case INSCRIPTION_SAVE_FAILED:
          return {
            ...state,
            inscriptionIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case INSCRIPTION_IS_FETCHING:
          return { ...state,inscriptionIsFetching: true };
        case INSCRIPTION_FETCH_SUCCESS:
          return {
            ...state,
            inscriptionIsFetching: false,
            inscriptions: action.payload,
            error: null
          };
          case ONE_INSCRIPTION_FETCH_SUCCESS:
          return {
            ...state,
            inscriptionIsFetching: false,
            oneinscription: action.payload,
            error: null
          };
        case INSCRIPTION_FETCH_FAILED:
          return {
            ...state,
            inscriptionIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case INSCRIPTION_IS_PATCHING:
          return { ...state, inscriptionIsPatching: true,error: null };
        case INSCRIPTION_PATCH_SUCCESS:
          return {
            ...state,
            inscriptionPatched: true,
            inscriptionIsPatching: false,
            error: null
          };
        case INSCRIPTION_PATCH_FAILED:
          return {
            ...state,
            inscriptionIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case INSCRIPTION_IS_DELETING:
        return { ...state, inscriptionIsDeleting: true,error: null };
      case INSCRIPTION_DELETE_SUCCESS:
        return {
          ...state,
          inscriptionDeleted: true,
          inscriptionIsDeleting: false,
          error: null
        };
      case INSCRIPTION_DELETE_FAILED:
        return {
          ...state,
          inscriptionIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default inscriptionReducer;
  
  