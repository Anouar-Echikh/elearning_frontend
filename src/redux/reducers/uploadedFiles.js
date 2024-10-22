import {
   ADD_FILES
  } from "../types/usersTypes";
  
  var initialState = {
    files:[],
    dateStart:"",
    dateEnd:"",
    timeStart:"",
    timeEnd:"",
    oneFile:null,
    homeHeaderImage:null,
    homeContactImage:null,

    };
  
  const FilesReducer = (state = initialState, action) => {
    switch (action.type) {
      //-------Fetch-------//
      case "ADD_FILES":
        return { ...state,files:[...state.files,...action.payload]};
        case "ADD_ONE_FILE":
        return { ...state,oneFile:action.payload};
        case "ADD_HOME_HEADER_IMG":
        return { ...state,homeHeaderImage:action.payload};
        case "ADD_HOME_CONTACT_IMG":
        return { ...state,homeContactImage:action.payload};
        case "ADD_DATE_START":
        return { ...state,dateStart:action.payload};
        case "ADD_DATE_END":
          return { ...state,dateEnd:action.payload};
          case "ADD_TIME_START":
          return { ...state,timeStart:action.payload};
          case "ADD_TIME_END":
          return { ...state,timeEnd:action.payload};
          case "CLEAR_STATE_ONE_FILE":
        return {...state,oneFile:null}
      //----DEFAULT----//
      default:
        return state;
    }
  };
  export default FilesReducer;
  