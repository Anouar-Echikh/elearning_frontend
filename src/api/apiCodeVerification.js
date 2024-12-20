import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


// code verification --> email
export const apiEmailVerificationCode = (data) => {
  const url = `${apiUrl}/sendEmailVerificationCode`;
  return axios.post(url,data);
};

// code verification --> tel
export const apiTelVerificationCode = (data) => {
  const url = `${apiUrl}/sendTelVerificationCode`;
  return axios.post(url,data);
};