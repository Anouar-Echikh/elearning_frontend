import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveEvent = event => {
  return axios.post(`${apiUrl}/event/create`, event);
};

//add idProgram to event
export const apiAddProgram = (idEvent,program) => {
  const prefix = `${apiUrl}/event/addProgram/${idEvent}`;
  return axios.post(prefix, program);
};

//Get all events
export const apiGetAllEvents =() => {
  const url = `${apiUrl}/event/getAll`;
  return axios.get(url);
};

//Get all events for home page
export const apiGetAllEventsHome =() => {
  const url = `${apiUrl}/event/getAllEventHome`;
  return axios.get(url);
};
//Get events by date periode
export const apiGetEventsByDate =(objDate) => {
  const url = `${apiUrl}/event/getEventsByDate`;
  return axios.get(url,objDate);
};

//Get one event by id
export const apiGetOneEventById =(id) => {
  const url = `${apiUrl}/event/${id}`;
  return axios.get(url);
};

//Update event
export const apiUpdateEvent = (id, event) => {
  const prefix = `${apiUrl}/event/update/${id}`;
  return axios.put(prefix, event);
};

//Update event with patch
export const apiPatchEvent = (id, event) => {
  const prefix = `${apiUrl}/event/patch/${id}`;
  return axios.patch(prefix, event);
};

//Delete event
export const apiDeleteEvent = (id) => {
  const url = `${apiUrl}/event/delete/${id}`;
  return axios.delete(url);
};

//Delete program from event
export const apiDeleteProgramFromEvent = (idEvent,idProgram) => {
  const url = `${apiUrl}/event/deleteProgram/${idEvent}`;
  return axios.delete(url,idProgram);
};