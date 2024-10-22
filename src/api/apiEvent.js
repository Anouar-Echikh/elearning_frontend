import axios from "axios";

//Create about
export const apiSaveEvent = event => {
  return axios.post("/event/create", event);
};

//add idProgram to event
export const apiAddProgram = (idEvent,program) => {
  const prefix = `/event/addProgram/${idEvent}`;
  return axios.post(prefix, program);
};

//Get all events
export const apiGetAllEvents =() => {
  const url = "/event/getAll";
  return axios.get(url);
};

//Get all events for home page
export const apiGetAllEventsHome =() => {
  const url = "/event/getAllEventHome";
  return axios.get(url);
};
//Get events by date periode
export const apiGetEventsByDate =(objDate) => {
  const url = "/event/getEventsByDate";
  return axios.get(url,objDate);
};

//Get one event by id
export const apiGetOneEventById =(id) => {
  const url = `/event/${id}`;
  return axios.get(url);
};

//Update event
export const apiUpdateEvent = (id, event) => {
  const prefix = `/event/update/${id}`;
  return axios.put(prefix, event);
};

//Update event with patch
export const apiPatchEvent = (id, event) => {
  const prefix = `/event/patch/${id}`;
  return axios.patch(prefix, event);
};

//Delete event
export const apiDeleteEvent = (id) => {
  const url = `/event/delete/${id}`;
  return axios.delete(url);
};

//Delete program from event
export const apiDeleteProgramFromEvent = (idEvent,idProgram) => {
  const url = `/event/deleteProgram/${idEvent}`;
  return axios.delete(url,idProgram);
};