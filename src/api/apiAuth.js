import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const apiSignUp = request_data => {
  return axios.post(`${apiUrl}/signUp`, request_data);
};

export const apiLogin = request_data => {
  return axios.post(`${apiUrl}/login`, request_data);
};
export const apiLogOut = () => {
  //update user => connected:false
  return axios.put(`${apiUrl}/logOut`);
};

export const apiGetUserProfile = () => {
  return axios.get(`${apiUrl}/user`);
};

export const apiUnLockUser = request_data => {
  return axios.post(`${apiUrl}/unlock`, request_data);
};

export const apiOauthFacebook = data => {
  return axios.post(`${apiUrl}/OAuth/facebook`, {
    access_token: data
  });
};

export const apiOauthOneDrive = data => {
  return axios.post(`${apiUrl}/OAuth/oneDrive`, {
    access_token: data
  });
};

export const apiOauthGoogle = data => {
  return axios.post(`${apiUrl}/OAuth/google`, {
    access_token: data   
  });
};
