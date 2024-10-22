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
  
  var initialState = {
    commentSaved: false,
    commentIsSaving: false,
    commentIsFetching: false,
    commentUpdated: false,
    commentIsUpdating: false,
    commentPatched: false,
    commentIsPatching: false,
    commentDeleted: false,
    commentIsDeleting: false,
    error: null,
    comments: [],
    onecomment:{}
  };
  
  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case COMMENT_IS_SAVING:
          return {
            ...state,
            commentIsSaving: true,
            error: null
          };
        case COMMENT_SAVE_SUCCESS:
          return {
            ...state,
            commentSaved: true,
            commentIsSaving: false,
            error: null
          };
        case COMMENT_SAVE_FAILED:
          return {
            ...state,
            commentIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case COMMENT_IS_FETCHING:
          return { ...state,commentIsFetching: true };
        case COMMENT_FETCH_SUCCESS:
          return {
            ...state,
            commentIsFetching: false,
            comments: action.payload,
            error: null
          };
          case ONE_COMMENT_FETCH_SUCCESS:
          return {
            ...state,
            commentIsFetching: false,
            onecomment: action.payload,
            error: null
          };
        case COMMENT_FETCH_FAILED:
          return {
            ...state,
            commentIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case COMMENT_IS_PATCHING:
          return { ...state, commentIsPatching: true,error: null };
        case COMMENT_PATCH_SUCCESS:
          return {
            ...state,
            commentPatched: true,
            commentIsPatching: false,
            error: null
          };
        case COMMENT_PATCH_FAILED:
          return {
            ...state,
            commentIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case COMMENT_IS_DELETING:
        return { ...state, commentIsDeleting: true,error: null };
      case COMMENT_DELETE_SUCCESS:
        return {
          ...state,
          commentDeleted: true,
          commentIsDeleting: false,
          error: null
        };
      case COMMENT_DELETE_FAILED:
        return {
          ...state,
          commentIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default commentsReducer;
  
  