import {
  NOTIFICATION_SAVE_FAILED,
  NOTIFICATION_SAVE_SUCCESS,
  NOTIFICATION_IS_SAVING,
  NOTIFICATION_DELETE_FAILED,
  NOTIFICATION_DELETE_SUCCESS,
  NOTIFICATION_IS_DELETING,
  NOTIFICATION_FETCH_FAILED,
  NOTIFICATION_FETCH_SUCCESS,
  ONE_NOTIFICATION_FETCH_SUCCESS,
  NOTIFICATION_IS_FETCHING,
  NOTIFICATION_IS_UPDATING,
  NOTIFICATION_UPDATE_FAILED,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_IS_STOPPING,
  NOTIFICATION_STOP_SUCCESS,
  NOTIFICATION_STOP_FAILED,
  // GET_SEARCH
} from "../types/notificationTypes";

var initialState = {
  notificationSaved: false,
  notificationIsSaving: false,
  notificationIsFetching: false,
  notificationDeleted: false,
  notificationIsDeleting: false,
  notificationUpdated: false,
  notificationIsUpdating: false,
  notifications: [],
  notification: {},
  io_idClient:"",
  error: null,
  notificationStopped: false,
  notificationIsStopping: false,
  stoppedReminder:{}
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    //-------Save-------//
    case "SET_IO_CLIENT_ID":
      return {
        ...state,
        io_idClient: action.payload
      };
    case NOTIFICATION_IS_SAVING:
      return {
        ...state,
        notificationIsSaving: true
      };
    case NOTIFICATION_SAVE_SUCCESS:
      return {
        ...state,
        notificationSaved: true,
        notificationIsSaving: false,

        error: action.payload
      };
    case NOTIFICATION_SAVE_FAILED:
      return {
        ...state,
        notificationIsSaving: false
      };
//------Stop Reminder Notif --------
case NOTIFICATION_IS_STOPPING:
      return {
        ...state,
        notificationIsStopping: true
      };
    case NOTIFICATION_STOP_SUCCESS:
      return {
        ...state,
        notificationStopped: true,
        notificationIsStopping: false,

        error: action.payload
      };
    case NOTIFICATION_STOP_FAILED:
      return {
        ...state,
        notificationIsStopping: false
      };

    //-------Fetch-------//
    case NOTIFICATION_IS_FETCHING:
      return { ...state, notificationIsFetching: true };
    case NOTIFICATION_FETCH_SUCCESS:
      return {
        ...state,
        notificationIsFetching: false,
        notifications: action.payload
      };
    case ONE_NOTIFICATION_FETCH_SUCCESS:
      return {
        ...state,
        notificationIsFetching: false,
        notification: action.payload,
        error: null
      };
    case NOTIFICATION_FETCH_FAILED:
      return {
        ...state,
        notificationIsFetching: false,
        error: action.payload
      };

    //-------update-------//
    case NOTIFICATION_IS_UPDATING:
      return { ...state, notificationIsUpdating: true };
    case NOTIFICATION_UPDATE_SUCCESS:
      return {
        ...state,
        notificationUpdated: true,
        notificationIsUpdating: false
      };
    case NOTIFICATION_UPDATE_FAILED:
      return {
        ...state,
        notificationIsUpdating: false,
        error: action.payload
      };

    //-------Delete-------//
    case NOTIFICATION_IS_DELETING:
      return { ...state, notificationIsDeleting: true };
    case NOTIFICATION_DELETE_SUCCESS:
      return {
        ...state,
        notificationDeleted: true,
        notificationIsDeleting: false
      };
    case NOTIFICATION_DELETE_FAILED:
      return {
        ...state,
        notificationIsDeleting: false,
        error: action.payload
      };

    //----DEFAULT----//
    default:
      return state;
  }
};
export default notificationReducer;
