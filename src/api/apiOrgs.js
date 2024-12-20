import axios from "axios";
import store from "../redux/store"
const TOKEN_NAME = "ela-app-token";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveOrg = org => {
  return axios.post(`${apiUrl}/orgs/create`, org);
};



//Get one New by idorg
export const apiGetOneOrgById =(idorg) => {
  const url = `${apiUrl}/orgs/getOne/${idorg}`;
   return axios.get(url);
};

//Get one New by idorg
export const apiGetOneOrgByPrefix =(prefix) => {
  const url = `${apiUrl}/orgs/getOneByPrefix/${prefix}`;
   return axios.get(url);
};

//Get all org 
export const apiGetAllOrgs =() => {
  const url = `${apiUrl}/orgs/getAll`;
   return axios.get(url);
};

//Update org
//Patch org
export const apiPatchOrg = (id, org) => {
  const prefix = `${apiUrl}/orgs/patch/${id}`;
  return axios.patch(prefix, org);
};

//Delete org by id
export const apiDeleteOrgById =(id) => {
  const url = `${apiUrl}/orgs/deleteOne/${id}`;
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