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
} from "../types/notificationTypes";
import {
  apiDeleteNotification,
  apiGetAllNotifications,
  apiGetAllNotificationsSortedByDateTimeAndLimited,
  apiGetNotficationByReceiverId,
  apiSetToReadenNotification,
  apiGetNotficationByType,
  apiGetNotficationByImportance,
  //apiGetAllNotificationsBySearchText,
  apiSaveNotification,
  apiNotificationsReminder,
  apiNotificationsStopReminder,
  
} from "../../api/apiNotification";

//save and send notification
export const saveNotification = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_SAVING });
      const { data } = await apiSaveNotification (request_data);
      if (data.success === true) {
        dispatch({ type: NOTIFICATION_SAVE_SUCCESS });
        console.log(data);
        return data.success;
      } else {
        dispatch({ type: NOTIFICATION_SAVE_FAILED, payload: data.error });
        return data.success;
      }
    } catch (e) {
      alert(e);
    }
  };
};

//save and send notification
export const notificationAppReminder = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_SAVING });
      const { data } = await apiNotificationsReminder(request_data);
      if (data.success === true) {
        dispatch({ type: NOTIFICATION_SAVE_SUCCESS });
        console.log(data);
        return data.success;
      } else {
        dispatch({ type: NOTIFICATION_SAVE_FAILED, payload: data.error });
        return data.success;
      }
    } catch (e) {
      alert(e);
    }
  };
};

// set notification as readen
export const setToReadenNotification = id => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_UPDATING });
      const { data } = await apiSetToReadenNotification(id);
      if (data.success === true) {
        dispatch({ type: NOTIFICATION_UPDATE_SUCCESS });
        //console.log(data);
        return data.success;
      } else {
        dispatch({ type: NOTIFICATION_UPDATE_FAILED, payload: data.error });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//delete notification
export const deleteNotification = id => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_DELETING });
      const { data } = await apiDeleteNotification(id);
      if (data.success === true) {
        dispatch({ type: NOTIFICATION_DELETE_SUCCESS });
        console.log(data);
        return data.success;
      } else {
        dispatch({ type: NOTIFICATION_DELETE_FAILED, payload: data.error });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// get all notification by id receiver
export const getNotficationByReceiverId = id => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_FETCHING });
      const { data } = await apiGetNotficationByReceiverId(id);
      if (data.success) {
        dispatch({
          type: NOTIFICATION_FETCH_SUCCESS,
          payload: data.notifications
        });
      } else {
        dispatch({ type: NOTIFICATION_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// get notification by type
export const getNotificationBytype = type => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_FETCHING });
      const { data } = await apiGetNotficationByType(type);
      if (data.success) {
        dispatch({
          type: NOTIFICATION_FETCH_SUCCESS,
          payload: data.notifications
        });
      } else {
        dispatch({ type: NOTIFICATION_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//get notification by importance
export const getNotificationByImportance = important => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_FETCHING });
      const { data } = await apiGetNotficationByImportance(important);
      if (data.success) {
        dispatch({
          type: NOTIFICATION_FETCH_SUCCESS,
          payload: data.notifications
        });
      } else {
        dispatch({ type: NOTIFICATION_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//get notification by search text
// export const getNotificationBySearchText = text => {
//   return async dispatch => {
//     try {
//       dispatch({ type: NOTIFICATION_IS_FETCHING });
//       const { data } = await apiGetAllNotificationsBySearchText(text);
//       if (data.success) {
//         dispatch({
//           type: NOTIFICATION_FETCH_SUCCESS,
//           payload: data.notifications
//         });
//       } else {
//         dispatch({ type: NOTIFICATION_FETCH_FAILED, payload: data.error });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

//get all notifications
export const getAllNotification = () => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_FETCHING });
      const { data } = await apiGetAllNotifications();
      if (data.success) {
        console.log("notifffffffff:" + data.notifications);
        dispatch({
          type: NOTIFICATION_FETCH_SUCCESS,
          payload: data.notifications
        });
      } else {
        dispatch({ type: NOTIFICATION_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//get all notificationssorted by date and limited 3
export const getAllNotificationSortedByDateAndLimited = () => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_FETCHING });
      const { data } = await apiGetAllNotificationsSortedByDateTimeAndLimited();
      if (data.success) {
        dispatch({
          type: NOTIFICATION_FETCH_SUCCESS,
          payload: data.notifications
        });
        return {nb:data.nbNotifications,notifications:data.notifications};
      } else {
        dispatch({ type: NOTIFICATION_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// export const searchNotification = text => {
//   return dispatch => {
//     dispatch({ type: NOTIFICATION_SEARCH, text });
//   };
// };

// export const sendPDFClient = data => {
//   return dispatch => {
//     dispatch({ type: CLIENT_PDF, data });
//   };
// };

export const refreshListNotification = data => {
  return dispatch => {
    dispatch({ type: NOTIFICATION_FETCH_SUCCESS, payload: data });
  };
};

//stop notification-reminder
export const stopReminder = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATION_IS_STOPPING });
      const { data } = await apiNotificationsStopReminder (request_data);
      if (data.success === true) {
        dispatch({ type: NOTIFICATION_STOP_SUCCESS });
      //  console.log(data);
        return data;
      } else {
        dispatch({ type: NOTIFICATION_STOP_FAILED, payload: data.error });
        return data.success;
      }
    } catch (e) {
      alert(e);
    }
  };
};