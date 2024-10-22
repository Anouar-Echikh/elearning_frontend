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
      
      //DELETE
      INSCRIPTION_DELETE_SUCCESS,
      INSCRIPTION_DELETE_FAILED,
      INSCRIPTION_IS_DELETING,
      //PATCH
      INSCRIPTION_IS_PATCHING,
      INSCRIPTION_PATCH_FAILED,
      INSCRIPTION_PATCH_SUCCESS
     
     } from "../types/inscriptionTypes";
  import {
    apiGetAllInscriptions,
    apiSaveInscription,
    apiGetOneInscriptionById,
    apiPatchInscription
    } from "../../api/apiInscription";
  
  
  
  //get One Inscription by id
  export const getOneInscriptionById = idInscription => {
    return async dispatch => {
      try {
        dispatch({ type: INSCRIPTION_IS_FETCHING });
        const { data } = await apiGetOneInscriptionById(idInscription);
        dispatch({ type: ONE_INSCRIPTION_FETCH_SUCCESS, payload: data.oneInscription });
        return data.oneInscription
      } catch (e) {
        dispatch({ type: INSCRIPTION_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllInscriptions = () => {
    return async dispatch => {
      try {
        dispatch({ type: INSCRIPTION_IS_FETCHING });
        const { data } = await apiGetAllInscriptions();
        dispatch({ type: INSCRIPTION_FETCH_SUCCESS, payload: data.Inscriptions });
        return data.Inscriptions
      } catch (e) {
        dispatch({ type: INSCRIPTION_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 
  export const saveInscription = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: INSCRIPTION_IS_SAVING });
        const { data } = await apiSaveInscription(request_data);
        if (data.success === true) {
          dispatch({ type: INSCRIPTION_SAVE_SUCCESS });
          
          return data
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: INSCRIPTION_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchInscription = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: INSCRIPTION_IS_PATCHING });
        const { data } = await apiPatchInscription(id, request_data);
        if (data.success === true) {
          dispatch({ type: INSCRIPTION_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: INSCRIPTION_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  