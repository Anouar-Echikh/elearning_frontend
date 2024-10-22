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
  
  var initialState = {
    videoSaved: false,
    videoIsSaving: false,
    videoIsFetching: false,
    videoUpdated: false,
    videoIsUpdating: false,
    videoPatched: false,
    videoIsPatching: false,
    videoDeleted: false,
    videoIsDeleting: false,
    error: null,
    videos: [],
    oneVideo:{}
  };
  
  const videosReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case VIDEO_IS_SAVING:
          return {
            ...state,
            videoIsSaving: true,
            error: null
          };
        case VIDEO_SAVE_SUCCESS:
          return {
            ...state,
            videoSaved: true,
            videoIsSaving: false,
            error: null
          };
        case VIDEO_SAVE_FAILED:
          return {
            ...state,
            videoIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case VIDEO_IS_FETCHING:
          return { ...state,videoIsFetching: true };
        case VIDEO_FETCH_SUCCESS:
          return {
            ...state,
            videoIsFetching: false,
            videos: action.payload,
            error: null
          };
          case ONE_VIDEO_FETCH_SUCCESS:
          return {
            ...state,
            videoIsFetching: false,
            oneVideo: action.payload,
            error: null
          };
        case VIDEO_FETCH_FAILED:
          return {
            ...state,
            videoIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case VIDEO_IS_PATCHING:
          return { ...state, videoIsPatching: true,error: null };
        case VIDEO_PATCH_SUCCESS:
          return {
            ...state,
            videoPatched: true,
            videoIsPatching: false,
            error: null
          };
        case VIDEO_PATCH_FAILED:
          return {
            ...state,
            videoIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case VIDEO_IS_DELETING:
        return { ...state, videoIsDeleting: true,error: null };
      case VIDEO_DELETE_SUCCESS:
        return {
          ...state,
          videoDeleted: true,
          videoIsDeleting: false,
          error: null
        };
      case VIDEO_DELETE_FAILED:
        return {
          ...state,
          videoIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default videosReducer;
  
  