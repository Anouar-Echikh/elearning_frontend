import {
  //SAVE
    EVENT_SAVE_FAILED,
    EVENT_SAVE_SUCCESS,
    EVENT_IS_SAVING,
    //LOAD
    EVENT_FETCH_FAILED,
    EVENT_FETCH_SUCCESS,
    EVENT_IS_FETCHING,
    //UPDATE
    EVENT_IS_UPDATING,
    EVENT_UPDATE_FAILED,
    EVENT_UPDATE_SUCCESS,
    //DELETE
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAILED,
    EVENT_IS_DELETING,
    //PATCH
    EVENT_IS_PATCHING,
    EVENT_PATCH_FAILED,
    EVENT_PATCH_SUCCESS
   
  } from "../types/eventTypes";
  
  var initialState = {
    eventSaved: false,
    eventIsSaving: false,
    eventIsFetching: false,
    eventUpdated: false,
    eventIsUpdating: false,
    eventPatched: false,
    eventIsPatching: false,
    eventDeleted: false,
    eventIsDeleting: false,
    error: null,
    events: [],
    event:{}
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      //-------Save-------//
      case EVENT_IS_SAVING:
        return {
          ...state,
          eventIsSaving: true,
          error: null
        };
      case EVENT_SAVE_SUCCESS:
        return {
          ...state,
          eventSaved: true,
          eventIsSaving: false,
          error: null,
          event:action.payload
        };
      case EVENT_SAVE_FAILED:
        return {
          ...state,
          eventIsSaving: false,
          error: action.payload
        };
  
      //-------Fetch-------//
      case EVENT_IS_FETCHING:
        return { ...state,
          eventIsFetching: true,
          error: null };
      case EVENT_FETCH_SUCCESS:
        return {
          ...state,
          eventIsFetching: false,
          events: action.payload,
          error: null
        };
      case EVENT_FETCH_FAILED:
        return {
          ...state,
          eventIsFetching: false,
          error: action.payload
        };
  
      //-------update-------//
      case EVENT_IS_UPDATING:
        return { ...state, eventIsUpdating: true,error: null };
      case EVENT_UPDATE_SUCCESS:
        return {
          ...state,
          eventUpdated: true,
          eventIsUpdating: false,
          error: null
        };
      case EVENT_UPDATE_FAILED:
        return {
          ...state,
          eventIsUpdating: false,
          error: action.payload
        };
        //-------patch-------//
      case EVENT_IS_PATCHING:
        return { ...state, eventIsPatching: true,error: null };
      case EVENT_PATCH_SUCCESS:
        return {
          ...state,
          eventPatched: true,
          eventIsPatching: false,
          error: null
        };
      case EVENT_PATCH_FAILED:
        return {
          ...state,
          eventIsPatching: false,
          error: action.payload
        };
        //-------Delete-------//
    case EVENT_IS_DELETING:
      return { ...state, eventIsDeleting: true ,error: null};
    case EVENT_DELETE_SUCCESS:
      return {
        ...state,
        eventDeleted: true,
        eventIsDeleting: false,
        error: null
      };
    case EVENT_DELETE_FAILED:
      return {
        ...state,
        eventIsDeleting: false,
        error: action.payload
        
      };
  
      default:
        return state;
    }
  };
  export default eventReducer;
  
  