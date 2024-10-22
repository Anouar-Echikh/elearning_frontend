import {
      //SAVE
      SPONSOR_SAVE_FAILED,
      SPONSOR_SAVE_SUCCESS,
      SPONSOR_IS_SAVING,
      //LOAD
      SPONSOR_FETCH_FAILED,
      SPONSOR_FETCH_SUCCESS,
      ONE_SPONSOR_FETCH_SUCCESS,
      SPONSOR_IS_FETCHING,
      
      //DELETE
      SPONSOR_DELETE_SUCCESS,
      SPONSOR_DELETE_FAILED,
      SPONSOR_IS_DELETING,
      //PATCH
      SPONSOR_IS_PATCHING,
      SPONSOR_PATCH_FAILED,
      SPONSOR_PATCH_SUCCESS
     
     } from "../types/sponsorsTypes";
  import {
    apiGetAllSponsors,
    apiDeleteSponsorById,
    apiGetOneSponsorById,
    apiPatchSponsor,
    apiSaveSponsor

  } from "../../api/apiSponsors";
  
  export const saveSponsor = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: SPONSOR_IS_SAVING });
        const { data } = await apiSaveSponsor(request_data);
        if (data.success === true) {
          dispatch({ type: SPONSOR_SAVE_SUCCESS });
          
          return data.success
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: SPONSOR_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a sponsor
   export const patchSponsor = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: SPONSOR_IS_PATCHING });
        const { data } = await apiPatchSponsor(id, request_data);
        if (data.success === true) {
          dispatch({ type: SPONSOR_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: SPONSOR_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One SPONSOR by id
  export const getOneSponsorById = idSponsor => {
    return async dispatch => {
      try {
        dispatch({ type: SPONSOR_IS_FETCHING });
        const { data } = await apiGetOneSponsorById(idSponsor);
        dispatch({ type: ONE_SPONSOR_FETCH_SUCCESS, payload: data.oneSponsor });
      } catch (e) {
        dispatch({ type: SPONSOR_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All sponsors
  export const getAllSponsors = () => {
    return async dispatch => {
      try {
        dispatch({ type: SPONSOR_IS_FETCHING });
        const { data } = await apiGetAllSponsors();
        dispatch({ type: SPONSOR_FETCH_SUCCESS, payload: data.sponsors });
        return data.sponsors
      } catch (e) {
        dispatch({ type: SPONSOR_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
  //delete one sponsor by id
 export const deleteOneSponsorById=(idSponsor)=>{
   return async dispatch=>{
     try {
      dispatch ({type:SPONSOR_IS_DELETING})
      const {data}= await apiDeleteSponsorById(idSponsor)
      dispatch({type:SPONSOR_DELETE_SUCCESS})
      return data.success
     } catch (error) {
       dispatch({type:SPONSOR_DELETE_FAILED,payload:error})
      console.log(error)
      
      }
     
   }
 }

 