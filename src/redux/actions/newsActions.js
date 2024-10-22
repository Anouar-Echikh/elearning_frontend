import {
      //SAVE
      NEWS_SAVE_FAILED,
      NEWS_SAVE_SUCCESS,
      NEWS_IS_SAVING,
      //LOAD
      NEWS_FETCH_FAILED,
      NEWS_FETCH_SUCCESS,
      ONE_NEWS_FETCH_SUCCESS,
      NEWS_IS_FETCHING,
      
      //DELETE
      NEWS_DELETE_SUCCESS,
      NEWS_DELETE_FAILED,
      NEWS_IS_DELETING,
      //PATCH
      NEWS_IS_PATCHING,
      NEWS_PATCH_FAILED,
      NEWS_PATCH_SUCCESS
     
     } from "../types/newsTypes";
  import {
    apiGetAllNews,
    
    apiGetOneNewsById,
   

  } from "../../api/apiNews";
  
  
  
  //get One NEWS by id
  export const getOneNewsById = idNews => {
    return async dispatch => {
      try {
        dispatch({ type: NEWS_IS_FETCHING });
        const { data } = await apiGetOneNewsById(idNews);
        dispatch({ type: ONE_NEWS_FETCH_SUCCESS, payload: data.oneNews });
      } catch (e) {
        dispatch({ type: NEWS_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllNews = () => {
    return async dispatch => {
      try {
        dispatch({ type: NEWS_IS_FETCHING });
        const { data } = await apiGetAllNews();
        dispatch({ type: NEWS_FETCH_SUCCESS, payload: data.news });
        return data.news
      } catch (e) {
        dispatch({ type: NEWS_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 
 