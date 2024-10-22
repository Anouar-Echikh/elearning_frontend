import {
      //SAVE
      ORG_SAVE_FAILED,
      ORG_SAVE_SUCCESS,
      ORG_IS_SAVING,
      //LOAD
      ORG_FETCH_FAILED,
      ORG_FETCH_SUCCESS,
      ONE_ORG_FETCH_SUCCESS,
      ORG_IS_FETCHING,
      
      //DELETE
      ORG_DELETE_SUCCESS,
      ORG_DELETE_FAILED,
      ORG_IS_DELETING,
      //PATCH
      ORG_IS_PATCHING,
      ORG_PATCH_FAILED,
      ORG_PATCH_SUCCESS
     
     } from "../types/OrgsTypes";
  import {
    apiGetAllOrgs,
    apiDeleteOrgById,
    apiGetOneOrgById,
    apiPatchOrg,
    apiSaveOrg,
    apiGetOneOrgByPrefix

  } from "../../api/apiOrgs";
  
  export const saveOrg = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: ORG_IS_SAVING });
        const { data } = await apiSaveOrg(request_data);
        if (data.success === true) {
          dispatch({ type: ORG_SAVE_SUCCESS });
          
          return data.savedOrg
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: ORG_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchOrg = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: ORG_IS_PATCHING });
        const { data } = await apiPatchOrg(id, request_data);
        if (data.success === true) {
          dispatch({ type: ORG_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: ORG_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One Org by id
  export const getOneOrgByPrefix = prefix => {
    return async dispatch => {
      try {
        dispatch({ type: ORG_IS_FETCHING });
        const { data } = await apiGetOneOrgByPrefix(prefix);
        dispatch({ type: ONE_ORG_FETCH_SUCCESS, payload: data.oneOrg });
        return data.oneOrg
      } catch (e) {
        dispatch({ type: ORG_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get One Org by id
  export const getOneOrgById = idOrg => {
    return async dispatch => {
      try {
        dispatch({ type: ORG_IS_FETCHING });
        const { data } = await apiGetOneOrgById(idOrg);
        dispatch({ type: ONE_ORG_FETCH_SUCCESS, payload: data.oneOrg });
        return data.oneOrg
      } catch (e) {
        dispatch({ type: ORG_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  //get All events
  export const getAllOrgs = () => {
    return async dispatch => {
      try {
        dispatch({ type: ORG_IS_FETCHING });
        const { data } = await apiGetAllOrgs();
        dispatch({ type: ORG_FETCH_SUCCESS, payload: data.organizations });
        return data.organizations
      } catch (e) {
        dispatch({ type: ORG_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 //delete one event by id
 export const deleteOneOrgById=(idOrg)=>{
  return async dispatch=>{
    try {
     dispatch ({type:ORG_IS_DELETING})
     const {data}= await apiDeleteOrgById(idOrg)
     dispatch({type:ORG_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:ORG_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}