import axios from "axios";



// code verification --> email
export const apiEmailVerificationCode = (data) => {
  const url = `/sendEmailVerificationCode`;
  return axios.post(url,data);
};

// code verification --> tel
export const apiTelVerificationCode = (data) => {
  const url = `/sendTelVerificationCode`;
  return axios.post(url,data);
};