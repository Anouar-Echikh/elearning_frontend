import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";
const apiUrl = process.env.REACT_APP_API_URL;

export const apiSaveUser = user => {
  return axios.post(`${apiUrl}/users/create`, user);
};


//Read user
export const apiGetUsers = month => {
  const prefix = `${apiUrl}/users`;
  const url = month ? `${prefix}/${month}` : prefix;
  return axios.get(url);
};

// get by Listids
export const apiGetUsersByListIds = data => {
  return axios.post(`${apiUrl}/users/getByListIds`, data);
};

axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) {
        localStorage.removeItem(TOKEN_NAME);
        store.dispatch({ type: "USER_LOGOUT" })
      }
      
  });

//Get user by email
export const apiGetUserByEmail = email => {
  const prefix = `${apiUrl}/user`;
  const url = `${prefix}/${email}`;
  return axios.get(url);
};
export const apiGetUserByCINPass = id => {
  const prefix = `${apiUrl}/users/getUserByCINPass`;
  const url = `${prefix}/${id}`;
  return axios.get(url);
};
//Get user by id
export const apiGetUserById = id => {
  const prefix = `${apiUrl}/users/getById`;
  const url = `${prefix}/${id}`;
  return axios.get(url);
};

//Update user
export const apiUpdateUser = (id, user) => {
  const prefix = `${apiUrl}/users/${id}`;
  return axios.put(prefix, user);
};

//Update user Password
export const apiUpdateUserPwd = data => {
  return axios.put(`${apiUrl}/changeUserPwd`, data);
};

//Destroy user
export const apiDeleteUser = id => {
  const prefix = `${apiUrl}/users/${id}`;
  return axios.delete(prefix);
};

//Patch User
export const apiPatchUser = (id, user) => {
  const prefix = `${apiUrl}/users/patch/${id}`;
  return axios.patch(prefix, user);
};