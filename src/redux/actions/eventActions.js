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
  import {
    
    apiGetAllEvents,
    apiGetOneEventById,
    apiGetAllEventsHome
  } from "../../api/apiEvent";

  
  
  //get One event by id
  export const getOneEventById = idEvent => {
    return async dispatch => {
      try {
        dispatch({ type: EVENT_IS_FETCHING });
        const { data } = await apiGetOneEventById(idEvent);
        dispatch({ type: EVENT_FETCH_SUCCESS, payload: data.event });
      } catch (e) {
        dispatch({ type: EVENT_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllEvents = () => {
    return async dispatch => {
      try {
        dispatch({ type: EVENT_IS_FETCHING });
        const { data } = await apiGetAllEvents();
        dispatch({ type: EVENT_FETCH_SUCCESS, payload: data.events });
      return data.events
      } catch (e) {
        dispatch({ type: EVENT_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events for home ^page
  export const getAllEventsHome = () => {
    return async dispatch => {
      try {
        dispatch({ type: EVENT_IS_FETCHING });
        const { data } = await apiGetAllEventsHome();
        dispatch({ type: EVENT_FETCH_SUCCESS, payload: data.events });
      return data.events
      } catch (e) {
        dispatch({ type: EVENT_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  