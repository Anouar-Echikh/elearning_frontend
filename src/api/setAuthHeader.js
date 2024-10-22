/****************************
 * A function to add 'token' to request header in order to get permission from api to get data from dataBase
 */
import axios from "axios";

export const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
  } else {
    delete axios.defaults.headers.common["Authorization"];
    
  }
};
