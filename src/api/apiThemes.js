import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveTheme = theme => {
  return axios.post(`${apiUrl}/themes/create`, theme);
};



//Get one New by idtheme
export const apiGetOneThemeById =(idtheme) => {
  const url = `${apiUrl}/themes/getOne/${idtheme}`;
   return axios.get(url);
};

//Get all theme 
export const apiGetAllThemes =(idDep) => {
  const url = `${apiUrl}/themes/getAll/${idDep}`;
   return axios.get(url);
};

//Update theme
//Patch theme
export const apiPatchTheme = (id, theme) => {
  const prefix = `${apiUrl}/themes/patch/${id}`;
  return axios.patch(prefix, theme);
};

//Delete theme by id
export const apiDeleteThemeById =(id) => {
  const url = `${apiUrl}/themes/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete Themes by idFormation
export const apiDeleteManyThemesById =(idFormation) => {
  const url = `${apiUrl}/themes/deleteMany/${idFormation}`;
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