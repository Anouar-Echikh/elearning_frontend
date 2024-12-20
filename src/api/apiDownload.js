import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


//Download file from server by its id
export const apiDownloadFileFromServer =(data) => {
  const url = `${apiUrl}/download`;
  return axios.post(url,data,{ responseType: 'blob'});
};


//Download file from server by its id
export const apiDownloadExcelFromServer =(filename) => {
  const url = `${apiUrl}/downloadExcel/${filename}`;
  return axios.get(url,{ responseType: 'blob'});
};

export const apiDeleteFileFromServer =(data) => {
  const url = `${apiUrl}/unlink`;
  return axios.post(url,data);
};