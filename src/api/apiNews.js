import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveNews = New => {
  return axios.post(`${apiUrl}/news/create`, New);
};



//Get one New by idNew
export const apiGetOneNewsById =(idNew) => {
  const url = `${apiUrl}/news/getOne/${idNew}`;
   return axios.get(url);
};

//Get all News 
export const apiGetAllNews =() => {
  const url = `${apiUrl}/news/getAll`;
   return axios.get(url);
};

//Update New
//Patch New
export const apiPatchNews = (id, New) => {
  const prefix = `${apiUrl}/news/patch/${id}`;
  return axios.patch(prefix, New);
};

//Delete New by id
export const apiDeleteNewsById =(id) => {
  const url = `${apiUrl}/news/deleteOne/${id}`;
  return axios.delete(url);
};

