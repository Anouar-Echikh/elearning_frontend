import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveDep = dep => {
  return axios.post(`${apiUrl}/departments/create`, dep);
};



//Get one New by iddep
export const apiGetOneDepById =(idDep) => {
  const url = `${apiUrl}/departments/getOne/${idDep}`;
   return axios.get(url);
};

//Get all dep 
export const apiGetAllDeps =(orgId) => {
  const url = `${apiUrl}/departments/getAll/${orgId}`;
   return axios.get(url);
};

//Update dep
//Patch dep
export const apiPatchDep = (id, dep) => {
  const prefix = `${apiUrl}/departments/patch/${id}`;
  return axios.patch(prefix, dep);
};

//Delete dep by id
export const apiDeleteDepById =(id) => {
  const url = `${apiUrl}/departments/deleteOne/${id}`;
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