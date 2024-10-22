import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import aboutReducer from "./aboutReducer";
import goalsReducer from "./goalsReducer";
import filesReducer from "./uploadedFiles";
import alertReducer from "./alert";
import programReducer from "./programReducer";
import eventReducer from "./eventReducer";
import newsReducer from "./newsReducer";
import inscriptionReducer from "./inscriptionReducer";
import sponsorsReducer from "./sponsorsReducer";
import videosReducer from "./videosReducer";
import themesReducer from "./themesReducer";
import orgsReducer from "./organizationsReducer";
import departmentsReducer from "./depatmentsReducer";
import subDepatmentsReducer from "./sub-depatmentsReducer";
import notificationReducer from "./notificationReducer";
import diplomaReducer from "./diplomaReducer";


import { combineReducers } from "redux";

export default combineReducers({
  aboutReducer,
  authReducer,
  usersReducer,
  filesReducer,
  goalsReducer,
  alertReducer,
  programReducer,
  eventReducer,
  newsReducer,
  sponsorsReducer,
  videosReducer,
  themesReducer,
  inscriptionReducer,
  orgsReducer,
  departmentsReducer,
  subDepatmentsReducer,
  notificationReducer,
  diplomaReducer
});
