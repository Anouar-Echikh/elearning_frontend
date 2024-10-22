import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";


//Create notification
export const apiSaveNotification = notification => {
  return axios.post("/createNotification", notification);
};

//get all notification
export const apiGetAllNotifications = () => {
  const url = "/getAllNotifications";
  return axios.get(url);
};
//get all notification sorted bey dateTime and limited
export const apiGetAllNotificationsSortedByDateTimeAndLimited = () => {
  const url = "/getAllNotificationsSortedByDateTimeAndLimited";
  return axios.get(url);
};

//Get notification by ID
export const apiGetNotficationByReceiverId = id => {
  const url = `/getNotficationByReceiverId/${id}`;
  return axios.get(url);
};

//set notification as readen=true
export const apiSetToReadenNotification = id => {
  const url = `/setToReadenNotification/${id}`;
  return axios.put(url);
};

//Get notification by TYPE
export const apiGetNotficationByType = type => {
  const url = `/getNotficationByType/${type}`;
  return axios.get(url);
};

//Get notification by importance
export const apiGetNotficationByImportance = important => {
  const url = `/getNotificationByImportance/${important}`;
  return axios.get(url);
};

// notification reminder
export const apiNotificationsReminder = (data) => {
  const url = `/reminder`;
  return axios.post(url,data);
};
export const apiNotificationsStopAppReminder = (data) => {
  const url = `/stopAppReminder`;
  return axios.post(url,data);
};


//Send notification by email 
export const apiSendNotificationByEmail = email => {
  return axios.post("/sendNotificationByEmail", email);
};

export const apiNotificationsStopReminder = (data) => {
  const url = `/stopReminder`;
  return axios.post(url,data);
};



//Destroy notification
export const apiDeleteNotification = id => {
  const prefix = `/destroyNotification/${id}`;
  return axios.delete(prefix);
};

axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) {
        localStorage.removeItem(TOKEN_NAME);
        store.dispatch({ type: "USER_LOGOUT" })
      }
      
  });