import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveAbout = about => {
  return axios.post(`${apiUrl}/about/save`, about);
};

//Read about
export const apiGetAbout =() => {
  const url = `${apiUrl}/about`;
  return axios.get(url);
};    

//Update about
export const apiUpdateAbout = (id, about) => {
  const prefix = `${apiUrl}/about/update/${id}`;
  return axios.put(prefix, about);
};

//Update about with patch
export const apiPatchAbout = (id, about) => {
  const prefix = `${apiUrl}/about/patch/${id}`;
  return axios.patch(prefix, about);
};