import axios from "axios";

//Create about
export const apiSaveSponsor = sponsor => {
  return axios.post("/sponsors/create", sponsor);
};



//Get one New by idNew
export const apiGetOneSponsorById =(idSponsor) => {
  const url = `/sponsors/getOne/${idSponsor}`;
   return axios.get(url);
};

//Get all Sponsor 
export const apiGetAllSponsors =() => {
  const url = `/sponsors/getAll`;
   return axios.get(url);
};

//Update New
//Patch New
export const apiPatchSponsor = (id, sponsor) => {
  const prefix = `/sponsors/patch/${id}`;
  return axios.patch(prefix, sponsor);
};

//Delete New by id
export const apiDeleteSponsorById =(id) => {
  const url = `/sponsors/deleteOne/${id}`;
  return axios.delete(url);
};

