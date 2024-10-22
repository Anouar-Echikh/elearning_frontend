import {
      //SAVE
      THEME_SAVE_FAILED,
      THEME_SAVE_SUCCESS,
      THEME_IS_SAVING,
      //LOAD
      THEME_FETCH_FAILED,
      THEME_FETCH_SUCCESS,
      ONE_THEME_FETCH_SUCCESS,
      THEME_IS_FETCHING,
      
      //DELETE
      THEME_DELETE_SUCCESS,
      THEME_DELETE_FAILED,
      THEME_IS_DELETING,
      //PATCH
      THEME_IS_PATCHING,
      THEME_PATCH_FAILED,
      THEME_PATCH_SUCCESS
     
     } from "../types/themesTypes";
  import {
    apiGetAllThemes,
    apiDeleteThemeById,
    apiGetOneThemeById,
    apiPatchTheme,
    apiSaveTheme,
    apiDeleteManyThemesById

  } from "../../api/apiThemes";
  
  export const saveTheme = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: THEME_IS_SAVING });
        const { data } = await apiSaveTheme(request_data);
        if (data.success === true) {
          dispatch({ type: THEME_SAVE_SUCCESS });
          
          return data.savedTheme
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: THEME_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchTheme = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: THEME_IS_PATCHING });
        const { data } = await apiPatchTheme(id, request_data);
        if (data.success === true) {
          dispatch({ type: THEME_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: THEME_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One Theme by id
  export const getOneThemeById = idTheme => {
    return async dispatch => {
      try {
        dispatch({ type: THEME_IS_FETCHING });
        const { data } = await apiGetOneThemeById(idTheme);
        dispatch({ type: ONE_THEME_FETCH_SUCCESS, payload: data.oneTheme });
        return data.oneTheme
      } catch (e) {
        dispatch({ type: THEME_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllThemes = (idDep) => {
    return async dispatch => {
      try {
        dispatch({ type: THEME_IS_FETCHING });
        const { data } = await apiGetAllThemes(idDep);
        dispatch({ type: THEME_FETCH_SUCCESS, payload: data.themes });
        return data.themes
      } catch (e) {
        dispatch({ type: THEME_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 //delete one event by id
 export const deleteOneThemeById=(idTheme)=>{
  return async dispatch=>{
    try {
     dispatch ({type:THEME_IS_DELETING})
     const {data}= await apiDeleteThemeById(idTheme)
     dispatch({type:THEME_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:THEME_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}
//delete one event by id
export const deleteManyThemeById=(idFormation)=>{
  return async dispatch=>{
    try {
      dispatch ({type:THEME_IS_DELETING})
     const {data}= await apiDeleteManyThemesById(idFormation)
     dispatch({type:THEME_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:THEME_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}