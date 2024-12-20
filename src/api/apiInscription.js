import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveInscription = Inscription => {
  return axios.post(`${apiUrl}/inscription/create`, Inscription);
};



//Get one Inscription by idInscription
export const apiGetOneInscriptionById =(idInscription) => {
  const url = `${apiUrl}/inscription/getOne/${idInscription}`;
   return axios.get(url);
};

//Get all Inscription 
export const apiGetAllInscriptions =() => {
  const url = `${apiUrl}/inscription/getAll`;
   return axios.get(url);
};

//Update Inscription
//Patch Inscription
export const apiPatchInscription = (id, Inscription) => {
  const prefix = `${apiUrl}/inscription/patch/${id}`;
  return axios.patch(prefix, Inscription);
};

//Delete Inscription by id
export const apiDeleteInscriptionById =(id) => {
  const url = `${apiUrl}/inscription/deleteOne/${id}`;
  return axios.delete(url);
};

