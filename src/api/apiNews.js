import axios from "axios";

//Create about
export const apiSaveNews = New => {
  return axios.post("/news/create", New);
};



//Get one New by idNew
export const apiGetOneNewsById =(idNew) => {
  const url = `/news/getOne/${idNew}`;
   return axios.get(url);
};

//Get all News 
export const apiGetAllNews =() => {
  const url = `/news/getAll`;
   return axios.get(url);
};

//Update New
//Patch New
export const apiPatchNews = (id, New) => {
  const prefix = `/news/patch/${id}`;
  return axios.patch(prefix, New);
};

//Delete New by id
export const apiDeleteNewsById =(id) => {
  const url = `/news/deleteOne/${id}`;
  return axios.delete(url);
};

