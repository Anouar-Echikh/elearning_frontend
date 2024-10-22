import {
      //SAVE
      SUBDEP_SAVE_FAILED,
      SUBDEP_SAVE_SUCCESS,
      SUBDEP_IS_SAVING,
      //LOAD
      SUBDEP_FETCH_FAILED,
      SUBDEP_FETCH_SUCCESS,
      ONE_SUBDEP_FETCH_SUCCESS,
      SUBDEP_IS_FETCHING,
      
      //DELETE
      SUBDEP_DELETE_SUCCESS,
      SUBDEP_DELETE_FAILED,
      SUBDEP_IS_DELETING,
      //PATCH
      SUBDEP_IS_PATCHING,
      SUBDEP_PATCH_FAILED,
      SUBDEP_PATCH_SUCCESS
     
     } from "../types/sub-departmentsTypes";
  import {
    apiGetAllSubDeps,
    apiDeleteSubDepById,
    apiGetOneSubDepById,
    apiPatchSubDep,
    apiSaveSubDep,
    apiDeleteManyFormationsById

  } from "../../api/apiSubDepartments";
  
  export const saveSubDep = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: SUBDEP_IS_SAVING });
        const { data } = await apiSaveSubDep(request_data);
        if (data.success === true) {
          dispatch({ type: SUBDEP_SAVE_SUCCESS });
          
          return data.savedSubDep
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: SUBDEP_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchSubDep = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: SUBDEP_IS_PATCHING });
        const { data } = await apiPatchSubDep(id, request_data);
        if (data.success === true) {
          dispatch({ type: SUBDEP_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: SUBDEP_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One SubDep by id
  export const getOneSubDepById = idSubDep => {
    return async dispatch => {
      try {
        dispatch({ type: SUBDEP_IS_FETCHING });
        const { data } = await apiGetOneSubDepById(idSubDep);
        dispatch({ type: ONE_SUBDEP_FETCH_SUCCESS, payload: data.oneSubDep });
        return data.oneSubDep
      } catch (e) {
        dispatch({ type: SUBDEP_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllSubDeps = (idDep) => {
    return async dispatch => {
      try {
        dispatch({ type: SUBDEP_IS_FETCHING });
        const { data } = await apiGetAllSubDeps(idDep);
        dispatch({ type: SUBDEP_FETCH_SUCCESS, payload: data.subDepartments });
        return data.subDepartments
      } catch (e) {
        dispatch({ type: SUBDEP_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 //delete one event by id
 export const deleteOneSubDepById=(idSubDep)=>{
  return async dispatch=>{
    try {
     dispatch ({type:SUBDEP_IS_DELETING})
     const {data}= await apiDeleteSubDepById(idSubDep)
     dispatch({type:SUBDEP_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:SUBDEP_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}

export const deleteManyFormationsById=(idDep)=>{
  return async dispatch=>{
    try {
      dispatch ({type:SUBDEP_IS_DELETING})
     const {data}= await apiDeleteManyFormationsById(idDep)
     dispatch({type:SUBDEP_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:SUBDEP_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}