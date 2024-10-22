import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";

//Create about
export const apiSaveSubDep = dep => {
  return axios.post("/sub-departments/create", dep);
};



//Get one New by iddep
export const apiGetOneSubDepById =(idSubDep) => {
  const url = `/sub-departments/getOne/${idSubDep}`;
   return axios.get(url);
};

//Get all dep 
export const apiGetAllSubDeps =(parentDepId) => {
  const url = `/sub-departments/getAll/${parentDepId}`;
   return axios.get(url);
};

//Update dep
//Patch dep
export const apiPatchSubDep = (id, dep) => {
  const prefix = `/sub-departments/patch/${id}`;
  return axios.patch(prefix, dep);
};

//Delete dep by id
export const apiDeleteSubDepById =(id) => {
  const url = `/sub-departments/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete formations by idDepartment
export const apiDeleteManyFormationsById =(idDepartment) => {
  const url = `/sub-departments/deleteMany/${idDepartment}`;
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