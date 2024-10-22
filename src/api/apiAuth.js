import axios from "axios";

export const apiSignUp = request_data => {
  return axios.post("/signUp", request_data);
};

export const apiLogin = request_data => {
  return axios.post("/login", request_data);
};
export const apiLogOut = () => {
  //update user => connected:false
  return axios.put("/logOut");
};

export const apiGetUserProfile = () => {
  return axios.get("/user");
};

export const apiUnLockUser = request_data => {
  return axios.post("/unlock", request_data);
};

export const apiOauthFacebook = data => {
  return axios.post("/OAuth/facebook", {
    access_token: data
  });
};

export const apiOauthOneDrive = data => {
  return axios.post("/OAuth/oneDrive", {
    access_token: data
  });
};

export const apiOauthGoogle = data => {
  return axios.post("/OAuth/google", {
    access_token: data   
  });
};

