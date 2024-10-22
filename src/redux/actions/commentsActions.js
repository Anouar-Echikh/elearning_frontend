import {
      //SAVE
      COMMENT_SAVE_FAILED,
      COMMENT_SAVE_SUCCESS,
      COMMENT_IS_SAVING,
      //LOAD
      COMMENT_FETCH_FAILED,
      COMMENT_FETCH_SUCCESS,
      ONE_COMMENT_FETCH_SUCCESS,
      COMMENT_IS_FETCHING,
      
      //DELETE
      COMMENT_DELETE_SUCCESS,
      COMMENT_DELETE_FAILED,
      COMMENT_IS_DELETING,
      //PATCH
      COMMENT_IS_PATCHING,
      COMMENT_PATCH_FAILED,
      COMMENT_PATCH_SUCCESS
     
     } from "../types/commentsTypes";
  import {
    apiDeleteCommentById,
    apiGetOneCommentById,
    apiPatchComment,
    apiSaveComment,
    apiGetAllCommentsByPostId,
    apiDeleteManyCommentsByPostId
  

  } from "../../api/apiComments";
  
  export const saveComment = request_data => {
    return async dispatch => {
      try {
        dispatch({ type: COMMENT_IS_SAVING });
        const { data } = await apiSaveComment(request_data);
        if (data.success === true) {
          dispatch({ type: COMMENT_SAVE_SUCCESS });
          
          return data.savedComment
        } else{
            return data.success;
        }
               
      } catch (e) {
        dispatch({ type: COMMENT_SAVE_FAILED,payload:e });
       
        //alert(e);
      }
    };
  };
   
   // patch a program
   export const patchComment = (id, request_data) => {
    return async dispatch => {
      try {
        dispatch({ type: COMMENT_IS_PATCHING });
        const { data } = await apiPatchComment(id, request_data);
        if (data.success === true) {
          dispatch({ type: COMMENT_PATCH_SUCCESS });
          return data.success;
        } 
      } catch (e) {
        console.log(e);
        
          dispatch({ type: COMMENT_PATCH_FAILED,payload:e });
         
    
    };
  };
}
  
  //get One Comment by id
  export const getOneCommentById = idComment => {
    return async dispatch => {
      try {
        dispatch({ type: COMMENT_IS_FETCHING });
        const { data } = await apiGetOneCommentById(idComment);
        dispatch({ type: ONE_COMMENT_FETCH_SUCCESS, payload: data.oneComment });
        return data.oneComment
      } catch (e) {
        dispatch({ type: COMMENT_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };

  //get All events
  export const getAllCommentsByPostId = (postId) => {
    return async dispatch => {
      try {
        dispatch({ type: COMMENT_IS_FETCHING });
        const { data } = await apiGetAllCommentsByPostId(postId);
        dispatch({ type: COMMENT_FETCH_SUCCESS, payload: data.comments });
        return data.comments
      } catch (e) {
        dispatch({ type: COMMENT_FETCH_FAILED,payload:e });
        console.log(e);
      }
    };
  };
  
 //delete one event by id
 export const deleteOneCommentById=(idComment)=>{
  return async dispatch=>{
    try {
     dispatch ({type:COMMENT_IS_DELETING})
     const {data}= await apiDeleteCommentById(idComment)
     dispatch({type:COMMENT_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:COMMENT_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}

export const deleteManyCommentsByPostId=(postId)=>{
  return async dispatch=>{
    try {
      dispatch ({type:COMMENT_IS_DELETING})
     const {data}= await apiDeleteManyCommentsByPostId(postId)
     dispatch({type:COMMENT_DELETE_SUCCESS})
     return data.success
    } catch (error) {
      dispatch({type:COMMENT_DELETE_FAILED,payload:error})
     console.log(error)
     
     }
    
  }
}