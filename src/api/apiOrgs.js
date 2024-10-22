import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";

//Create about
export const apiSaveOrg = org => {
  return axios.post("/orgs/create", org);
};



//Get one New by idorg
export const apiGetOneOrgById =(idorg) => {
  const url = `/orgs/getOne/${idorg}`;
   return axios.get(url);
};

//Get one New by idorg
export const apiGetOneOrgByPrefix =(prefix) => {
  const url = `/orgs/getOneByPrefix/${prefix}`;
   return axios.get(url);
};

//Get all org 
export const apiGetAllOrgs =() => {
  const url = `/orgs/getAll`;
   return axios.get(url);
};

//Update org
//Patch org
export const apiPatchOrg = (id, org) => {
  const prefix = `/orgs/patch/${id}`;
  return axios.patch(prefix, org);
};

//Delete org by id
export const apiDeleteOrgById =(id) => {
  const url = `/orgs/deleteOne/${id}`;
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