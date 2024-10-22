import axios from "axios";

//Create about
export const apiSaveInscription = Inscription => {
  return axios.post("/inscription/create", Inscription);
};



//Get one Inscription by idInscription
export const apiGetOneInscriptionById =(idInscription) => {
  const url = `/inscription/getOne/${idInscription}`;
   return axios.get(url);
};

//Get all Inscription 
export const apiGetAllInscriptions =() => {
  const url = `/inscription/getAll`;
   return axios.get(url);
};

//Update Inscription
//Patch Inscription
export const apiPatchInscription = (id, Inscription) => {
  const prefix = `/inscription/patch/${id}`;
  return axios.patch(prefix, Inscription);
};

//Delete Inscription by id
export const apiDeleteInscriptionById =(id) => {
  const url = `/inscription/deleteOne/${id}`;
  return axios.delete(url);
};

