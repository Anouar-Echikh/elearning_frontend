import {
   //SAVE
   PROGRAM_SAVE_FAILED,
   PROGRAM_SAVE_SUCCESS,
   PROGRAM_IS_SAVING,
   //LOAD
   PROGRAM_FETCH_FAILED,
   PROGRAM_FETCH_SUCCESS,
   ONE_PROGRAM_FETCH_SUCCESS,
   PROGRAM_IS_FETCHING,
   //UPDATE
   PROGRAM_IS_UPDATING,
   PROGRAM_UPDATE_FAILED,
   PROGRAM_UPDATE_SUCCESS,
   //DELETE
   PROGRAM_DELETE_SUCCESS,
   PROGRAM_DELETE_FAILED,
   PROGRAM_IS_DELETING,
   //PATCH
   PROGRAM_IS_PATCHING,
   PROGRAM_PATCH_FAILED,
   PROGRAM_PATCH_SUCCESS
  } from "../types/programTypes";
  
  var initialState = {
    programSaved: false,
    programIsSaving: false,
    programIsFetching: false,
    programUpdated: false,
    programIsUpdating: false,
    programPatched: false,
    programIsPatching: false,
    programDeleted: false,
    programIsDeleting: false,
    error: null,
    programs: [],
    program:{}
  };
  
  const programReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case PROGRAM_IS_SAVING:
          return {
            ...state,
            programIsSaving: true,
            error: null
          };
        case PROGRAM_SAVE_SUCCESS:
          return {
            ...state,
            programSaved: true,
            programIsSaving: false,
            error: null
          };
        case PROGRAM_SAVE_FAILED:
          return {
            ...state,
            programIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case PROGRAM_IS_FETCHING:
          return { ...state,programIsFetching: true };
        case PROGRAM_FETCH_SUCCESS:
          return {
            ...state,
            programIsFetching: false,
            programs: action.payload,
            error: null
          };
          case ONE_PROGRAM_FETCH_SUCCESS:
          return {
            ...state,
            programIsFetching: false,
            program: action.payload,
            error: null
          };
        case PROGRAM_FETCH_FAILED:
          return {
            ...state,
            programIsFetching: false,
            error: action.payload
          };
    
        //-------update-------//
        case PROGRAM_IS_UPDATING:
          return { ...state, programIsUpdating: true,error: null };
        case PROGRAM_UPDATE_SUCCESS:
          return {
            ...state,
            programUpdated: true,
            programIsUpdating: false,
            error: null
          };
        case PROGRAM_UPDATE_FAILED:
          return {
            ...state,
            programIsUpdating: false,
            error: action.payload
          };
          //-------patch-------//
        case PROGRAM_IS_PATCHING:
          return { ...state, programIsPatching: true,error: null };
        case PROGRAM_PATCH_SUCCESS:
          return {
            ...state,
            programPatched: true,
            programIsPatching: false,
            error: null
          };
        case PROGRAM_PATCH_FAILED:
          return {
            ...state,
            programIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case PROGRAM_IS_DELETING:
        return { ...state, programIsDeleting: true,error: null };
      case PROGRAM_DELETE_SUCCESS:
        return {
          ...state,
          programDeleted: true,
          programIsDeleting: false,
          error: null
        };
      case PROGRAM_DELETE_FAILED:
        return {
          ...state,
          programIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default programReducer;
  
  