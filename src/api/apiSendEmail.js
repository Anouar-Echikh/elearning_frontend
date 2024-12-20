import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;



// code verification --> email
export const apiSendEmailFromClient = (data) => {
  const url = `${apiUrl}/sendEmailFromClient`;
  return axios.post(url,data);
};

