import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const apiUploadFile = file => {
    return axios.post(`${apiUrl}/uploadOneDrive`, file);
  };