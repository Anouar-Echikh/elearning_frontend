import axios from "axios";

//Create about
export const apiSaveProgram = program => {
  return axios.post("/event/program/create", program);
};

//Get programs by idEvent
export const apiGetProgramsByIdEvent =(idEvent) => {
  const url = `/event/programs/${idEvent}`;
  return axios.get(url);
};

//Get one program by idProgram
export const apiGetOneProgramById =(idProgram) => {
  const url = `/event/program/${idProgram}`;
   return axios.get(url);
};

//Update Program
export const apiUpdateProgram = (id, program) => {
  const prefix = `/event/program/update/${id}`;
  return axios.put(prefix, program);
};

//Patch Program
export const apiPatchProgram = (id, program) => {
  const prefix = `/event/program/patch/${id}`;
  return axios.patch(prefix, program);
};

//Delete program by id
export const apiDeleteProgramById =(id) => {
  const url = `/event/program/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete all programs by idEvent
export const apiDeleteAllProgramsByIdEvent =(idEvent) => {
  const url = `/event/programs/deleteAll/${idEvent}`;
  return axios.delete(url);
};