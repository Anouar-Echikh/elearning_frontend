import axios from "axios";

export const apiUploadFile = file => {
    return axios.post("/uploadOneDrive", file);
  };