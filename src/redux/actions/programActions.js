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
  import {
    
    apiGetProgramsByIdEvent,
    apiGetOneProgramById,
   

  } from "../../api/apiProgram";
  
 
  //get One program by id
  export const getOneProgramById = idProgram => {
    return async dispatch => {
      try {
        dispatch({ type: PROGRAM_IS_FETCHING });
        const { data } = await apiGetOneProgramById(idProgram);
        dispatch({ type: ONE_PROGRAM_FETCH_SUCCESS, payload: data.program });
      } catch (e) {
        dispatch({ type: PROGRAM_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllProgramsByEventId = (idEvent) => {
    return async dispatch => {
      try {
        dispatch({ type: PROGRAM_IS_FETCHING });
        const { data } = await apiGetProgramsByIdEvent(idEvent);
        dispatch({ type: PROGRAM_FETCH_SUCCESS, payload: data.programs });
        return data.programs
      } catch (e) {
        dispatch({ type: PROGRAM_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
  