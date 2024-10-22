import axios from "axios";



// code verification --> email
export const apiSendEmailFromClient = (data) => {
  const url = `/sendEmailFromClient`;
  return axios.post(url,data);
};

