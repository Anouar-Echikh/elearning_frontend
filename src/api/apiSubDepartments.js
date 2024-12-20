import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveSubDep = dep => {
  return axios.post(`${apiUrl}/sub-departments/create`, dep);
};



//Get one New by iddep
export const apiGetOneSubDepById =(idSubDep) => {
  const url = `${apiUrl}/sub-departments/getOne/${idSubDep}`;
   return axios.get(url);
};

//Get all dep 
export const apiGetAllSubDeps =(parentDepId) => {
  const url = `${apiUrl}/sub-departments/getAll/${parentDepId}`;
   return axios.get(url);
};

//Update dep
//Patch dep
export const apiPatchSubDep = (id, dep) => {
  const prefix = `${apiUrl}/sub-departments/patch/${id}`;
  return axios.patch(prefix, dep);
};

//Delete dep by id
export const apiDeleteSubDepById =(id) => {
  const url = `${apiUrl}/sub-departments/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete formations by idDepartment
export const apiDeleteManyFormationsById =(idDepartment) => {
  const url = `${apiUrl}/sub-departments/deleteMany/${idDepartment}`;
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