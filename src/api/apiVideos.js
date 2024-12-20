import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveVideo = video => {
  return axios.post(`${apiUrl}/videos/create`, video);
};



//Get one New by idVideo
export const apiGetOneVideoById =(idVideo) => {
  const url = `${apiUrl}/videos/getOne/${idVideo}`;
   return axios.get(url);
};

//Get all Video 
export const apiGetAllVideosByTheme =(idTheme) => {
  const url = `${apiUrl}/videos/getAllByTheme/${idTheme}`;
   return axios.get(url);
};

//Get all Video 
export const apiGetAllVideosByProf =(idProf) => {
  const url = `${apiUrl}/videos/getAllByProf/${idProf}`;
   return axios.get(url);
};


//Update Video
//Patch Video
export const apiPatchVideo = (id, video) => {
  const prefix = `${apiUrl}/videos/patch/${id}`;
  return axios.patch(prefix, video);
};

//Delete Video by id
export const apiDeleteVideoById =(id) => {
  const url = `${apiUrl}/videos/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete Video by id
export const apiDeleteManyVideoById =(idTheme) => {
  const url = `${apiUrl}/videos/deleteMany/${idTheme}`;
  return axios.delete(url);
};

//Delete Video by id
export const apiDownloadFileFromServer =(id) => {
  const url = `${apiUrl}/videos/deleteOne/${id}`;
  return axios.delete(url);
};


axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) {
        localStorage.removeItem(TOKEN_NAME);
        store.dispatch({ type: "USER_LOGOUT" })
      }
      
  });