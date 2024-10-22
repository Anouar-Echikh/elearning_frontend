import axios from "axios";

//Create about
export const apiSaveAbout = about => {
  return axios.post("/about/save", about);
};

//Read about
export const apiGetAbout =() => {
  const url = "/about";
  return axios.get(url);
};    

//Update about
export const apiUpdateAbout = (id, about) => {
  const prefix = `/about/update/${id}`;
  return axios.put(prefix, about);
};

//Update about with patch
export const apiPatchAbout = (id, about) => {
  const prefix = `/about/patch/${id}`;
  return axios.patch(prefix, about);
};