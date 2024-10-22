import {
    //SAVE
    DIPLOMA_SAVE_FAILED,
    DIPLOMA_SAVE_SUCCESS,
    DIPLOMA_IS_SAVING,
    //LOAD
    DIPLOMA_FETCH_FAILED,
    DIPLOMA_FETCH_SUCCESS,
    DIPLOMA_IS_FETCHING,
    //UPDATE
    DIPLOMA_IS_UPDATING,
    DIPLOMA_UPDATE_FAILED,
    DIPLOMA_UPDATE_SUCCESS,
    //DELETE
    DIPLOMA_DELETE_SUCCESS,
    DIPLOMA_DELETE_FAILED,
    DIPLOMA_IS_DELETING,
    //PATCH
    DIPLOMA_IS_PATCHING,
    DIPLOMA_PATCH_FAILED,
    DIPLOMA_PATCH_SUCCESS
   
  } from "../types/diplomaTypes";
  import {
    apiSaveDiploma,
    apiDeleteDiploma,
    apiPatchDiploma,
    apiGetAllDiplomas,
    apiGetOneDiplomaById,
    apiGetAllDiplomasByEmail
  } from "../../api/apiDiploma";

//import {apiCreateFolderOneDrive}from "../../api/apiMicrosoft"

  //create a Diploma
  export const saveDiploma = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: DIPLOMA_IS_SAVING });
        const { data } = await apiSaveDiploma(request_data);
        if (data.success == true) {
          dispatch({ type: DIPLOMA_SAVE_SUCCESS,payload:data.savedDiploma });
          return data;
        } else{
          dispatch({ type: DIPLOMA_SAVE_FAILED,payload:data.success });
            return ;
        }
               
      } catch (e) {
        
       console.error(e);
        //alert(e);
      }
    };
  };

 
   // patch diploma
   export const patchDiploma = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: DIPLOMA_IS_PATCHING });
        const { data } = await apiPatchDiploma(id, request_data);
        if (data.success === true) {
          dispatch({ type: DIPLOMA_PATCH_SUCCESS });
          return data.success;
        } else{
            dispatch({ type: DIPLOMA_PATCH_FAILED,payload:data.success });
            return data.success;
        }
      } catch (e) {
        console.log(e);
      }
    };
  };
  
  //get One event by id
  export const getOneDiplomaById = idDiploma => {
    return async dispatch => {
      try {
        dispatch({ type: DIPLOMA_IS_FETCHING });
        const { data } = await apiGetOneDiplomaById(idDiploma);
        dispatch({ type: DIPLOMA_FETCH_SUCCESS, payload: data.diploma });
      } catch (e) {
        dispatch({ type: DIPLOMA_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All diplomas
  export const getAllDiplomas = () => {
    return async dispatch => {
      try {
        dispatch({ type: DIPLOMA_IS_FETCHING });
        const { data } = await apiGetAllDiplomas();
        dispatch({ type: DIPLOMA_FETCH_SUCCESS, payload: data.diplomas });
      return data.diplomas
      } catch (e) {
        dispatch({ type: DIPLOMA_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
  //Get All 
 export const getAllDiplomasByEmail = (email) => {
  return async dispatch => {
    try {
      dispatch({ type: DIPLOMA_IS_FETCHING });
      const { data } = await apiGetAllDiplomasByEmail(email);
      dispatch({ type: DIPLOMA_FETCH_SUCCESS, payload: data.diplomas });
    return data.diplomas
    } catch (e) {
      dispatch({ type: DIPLOMA_FETCH_FAILED,payload:e });
      console.log(e);
    }
  };
};

 //delete one diploma by id
 export const deleteOneDiplomaById=(idDiploma)=>{
   return async dispatch=>{
     try {
      dispatch ({type:DIPLOMA_IS_DELETING})
      const {data}= await apiDeleteDiploma(idDiploma)
      dispatch({type:DIPLOMA_DELETE_SUCCESS})
      return data.success
     } catch (error) {
       dispatch({type:DIPLOMA_DELETE_FAILED,payload:error})
      console.log(error)
      
      }
     
   }
 }

  
  