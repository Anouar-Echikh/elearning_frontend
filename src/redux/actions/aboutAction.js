import {
    ABOUT_SAVE_FAILED,
    ABOUT_SAVE_SUCCESS,
    ABOUT_IS_SAVING,
    ABOUT_FETCH_FAILED,
    ABOUT_FETCH_SUCCESS,
    ABOUT_IS_FETCHING,
    ABOUT_IS_UPDATING,
    ABOUT_UPDATE_FAILED,
    ABOUT_UPDATE_SUCCESS,
   
  } from "../types/aboutTypes";
  import {
    apiGetAbout,
    
  } from "../../api/apiAbout";
  
  
  
  export const getAbout = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: ABOUT_IS_FETCHING });
        const { data } = await apiGetAbout(request_data);
        dispatch({ type: ABOUT_FETCH_SUCCESS, payload: data.about });
      } catch (e) {
        dispatch({ type: ABOUT_FETCH_FAILED });
        console.log(e);
      }
    };
  };
  
 
  