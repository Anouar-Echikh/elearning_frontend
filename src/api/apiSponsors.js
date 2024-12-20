import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveSponsor = sponsor => {
  return axios.post(`${apiUrl}"/sponsors/create`, sponsor);
};



//Get one New by idNew
export const apiGetOneSponsorById =(idSponsor) => {
  const url = `${apiUrl}/sponsors/getOne/${idSponsor}`;
   return axios.get(url);
};

//Get all Sponsor 
export const apiGetAllSponsors =() => {
  const url = `${apiUrl}/sponsors/getAll`;
   return axios.get(url);
};

//Update New
//Patch New
export const apiPatchSponsor = (id, sponsor) => {
  const prefix = `${apiUrl}/sponsors/patch/${id}`;
  return axios.patch(prefix, sponsor);
};

//Delete New by id
export const apiDeleteSponsorById =(id) => {
  const url = `${apiUrl}/sponsors/deleteOne/${id}`;
  return axios.delete(url);
};

