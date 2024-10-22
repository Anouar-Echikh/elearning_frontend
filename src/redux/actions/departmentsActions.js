import {
      //SAVE
      DEP_SAVE_FAILED,
      DEP_SAVE_SUCCESS,
      DEP_IS_SAVING,
      //LOAD
      DEP_FETCH_FAILED,
      DEP_FETCH_SUCCESS,
      ONE_DEP_FETCH_SUCCESS,
      DEP_IS_FETCHING,
      
      //DELETE
      DEP_DELETE_SUCCESS,
      DEP_DELETE_FAILED,
      DEP_IS_DELETING,
      //PATCH
      DEP_IS_PATCHING,
      DEP_PATCH_FAILED,
      DEP_PATCH_SUCCESS
     
     } from "../types/departmentsTypes";
  import {
    apiGetAllDeps,
    apiDeleteDepById,
    apiGetOneDepById,
    apiPatchDep,
    apiSaveDep

  } from "../../api/apiDepartments";
  
  export const saveDep = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: DEP_IS_SAVING });
        const { data } = await apiSaveDep(request_data);
        if (data.success === true) {
          dispatch({ type: DEP_SAVE_SUCCESS });
          
          return data.savedDep
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: DEP_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchDep = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: DEP_IS_PATCHING });
        const { data } = await apiPatchDep(id, request_data);
        if (data.success === true) {
          dispatch({ type: DEP_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: DEP_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One Dep by id
  export const getOneDepById = idDep => {
    return async dispatch => {
      try {
        dispatch({ type: DEP_IS_FETCHING });
        const { data } = await apiGetOneDepById(idDep);
        dispatch({ type: ONE_DEP_FETCH_SUCCESS, payload: data.oneDep });
        return data.oneDep
      } catch (e) {
        dispatch({ type: DEP_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllDeps = (idOrg) => {
    return async dispatch => {
      try {
        dispatch({ type: DEP_IS_FETCHING });
        const { data } = await apiGetAllDeps(idOrg);
        dispatch({ type: DEP_FETCH_SUCCESS, payload: data.departments });
        return data.departments
      } catch (e) {
        dispatch({ type: DEP_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 //delete one event by id
 export const deleteOneDepById=(idDep)=>{
  return async dispatch=>{
    try {
     dispatch ({type:DEP_IS_DELETING})
     const {data}= await apiDeleteDepById(idDep)
     dispatch({type:DEP_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:DEP_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}