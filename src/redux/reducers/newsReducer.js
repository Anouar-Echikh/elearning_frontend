import {
   //SAVE
   NEWS_SAVE_FAILED,
   NEWS_SAVE_SUCCESS,
   NEWS_IS_SAVING,
   //LOAD
   NEWS_FETCH_FAILED,
   NEWS_FETCH_SUCCESS,
   ONE_NEWS_FETCH_SUCCESS,
   NEWS_IS_FETCHING,
   //UPDATE
   NEWS_IS_UPDATING,
   NEWS_UPDATE_FAILED,
   NEWS_UPDATE_SUCCESS,
   //DELETE
   NEWS_DELETE_SUCCESS,
   NEWS_DELETE_FAILED,
   NEWS_IS_DELETING,
   //PATCH
   NEWS_IS_PATCHING,
   NEWS_PATCH_FAILED,
   NEWS_PATCH_SUCCESS
  } from "../types/newsTypes";
  
  var initialState = {
    newsSaved: false,
    newsIsSaving: false,
    newsIsFetching: false,
    newsUpdated: false,
    newsIsUpdating: false,
    newsPatched: false,
    newsIsPatching: false,
    newsDeleted: false,
    newsIsDeleting: false,
    error: null,
    news: [],
    oneNews:{}
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        //-------Save-------//
        case NEWS_IS_SAVING:
          return {
            ...state,
            newsIsSaving: true,
            error: null
          };
        case NEWS_SAVE_SUCCESS:
          return {
            ...state,
            newsSaved: true,
            newsIsSaving: false,
            error: null
          };
        case NEWS_SAVE_FAILED:
          return {
            ...state,
            newsIsSaving: false,
            error: action.payload
          };
    
        //-------Fetch-------//
        case NEWS_IS_FETCHING:
          return { ...state,newsIsFetching: true };
        case NEWS_FETCH_SUCCESS:
          return {
            ...state,
            newsIsFetching: false,
            news: action.payload,
            error: null
          };
          case ONE_NEWS_FETCH_SUCCESS:
          return {
            ...state,
            newsIsFetching: false,
            oneNews: action.payload,
            error: null
          };
        case NEWS_FETCH_FAILED:
          return {
            ...state,
            newsIsFetching: false,
            error: action.payload
          };
    
        
          //-------patch-------//
        case NEWS_IS_PATCHING:
          return { ...state, newsIsPatching: true,error: null };
        case NEWS_PATCH_SUCCESS:
          return {
            ...state,
            newsPatched: true,
            newsIsPatching: false,
            error: null
          };
        case NEWS_PATCH_FAILED:
          return {
            ...state,
            newsIsPatching: false,
            error: action.payload
          };
          //-------Delete-------//
      case NEWS_IS_DELETING:
        return { ...state, newsIsDeleting: true,error: null };
      case NEWS_DELETE_SUCCESS:
        return {
          ...state,
          newsDeleted: true,
          newsIsDeleting: false,
          error: null
        };
      case NEWS_DELETE_FAILED:
        return {
          ...state,
          newsIsDeleting: false,
          error: action.payload
        };
    
      default:
        return state;
    }
  };
  export default newsReducer;
  
  