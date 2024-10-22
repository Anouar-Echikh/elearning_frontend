import {
      //SAVE
      VIDEO_SAVE_FAILED,
      VIDEO_SAVE_SUCCESS,
      VIDEO_IS_SAVING,
      //LOAD
      VIDEO_FETCH_FAILED,
      VIDEO_FETCH_SUCCESS,
      ONE_VIDEO_FETCH_SUCCESS,
      VIDEO_IS_FETCHING,
      
      //DELETE
      VIDEO_DELETE_SUCCESS,
      VIDEO_DELETE_FAILED,
      VIDEO_IS_DELETING,
      //PATCH
      VIDEO_IS_PATCHING,
      VIDEO_PATCH_FAILED,
      VIDEO_PATCH_SUCCESS
     
     } from "../types/videosTypes";
  import {
    apiGetAllVideosByTheme,
    apiGetAllVideosByProf,
    apiDeleteVideoById,
    apiGetOneVideoById,
    apiPatchVideo,
    apiSaveVideo,
    apiDeleteManyVideoById

  } from "../../api/apiVideos";
  
  export const saveVideo = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: VIDEO_IS_SAVING });
        const { data } = await apiSaveVideo(request_data);
        if (data.success === true) {
          dispatch({ type: VIDEO_SAVE_SUCCESS });
          
          return data.savedVideo
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: VIDEO_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchVideo = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: VIDEO_IS_PATCHING });
        const { data } = await apiPatchVideo(id, request_data);
        if (data.success === true) {
          dispatch({ type: VIDEO_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: VIDEO_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One Video by id
  export const getOneVideoById = idVideo => {
    return async dispatch => {
      try {
        dispatch({ type: VIDEO_IS_FETCHING });
        const { data } = await apiGetOneVideoById(idVideo);
        dispatch({ type: ONE_VIDEO_FETCH_SUCCESS, payload: data.oneVideo });
        return data.oneVideo
      } catch (e) {
        dispatch({ type: VIDEO_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllVideos = (idTheme) => {
    return async dispatch => {
      try {
        dispatch({ type: VIDEO_IS_FETCHING });
        const { data } = await apiGetAllVideosByTheme(idTheme);
        dispatch({ type: VIDEO_FETCH_SUCCESS, payload: data.videos });
        return data.videos
      } catch (e) {
        dispatch({ type: VIDEO_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
   //get All events
   export const getAllVideosByProf = (idProf) => {
    return async dispatch => {
      try {
        dispatch({ type: VIDEO_IS_FETCHING });
        const { data } = await apiGetAllVideosByProf(idProf);
        dispatch({ type: VIDEO_FETCH_SUCCESS, payload: data.videos });
        return data.videos
      } catch (e) {
        dispatch({ type: VIDEO_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 //delete one event by id
 export const deleteOneVideoById=(idVideo)=>{
  return async dispatch=>{
    try {
     dispatch ({type:VIDEO_IS_DELETING})
     const {data}= await apiDeleteVideoById(idVideo)
     dispatch({type:VIDEO_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:VIDEO_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}

//delete one event by id
export const deleteManyVideoById=(idTheme)=>{
  return async dispatch=>{
    try {
     dispatch ({type:VIDEO_IS_DELETING})
     const {data}= await apiDeleteManyVideoById(idTheme)
     dispatch({type:VIDEO_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:VIDEO_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}