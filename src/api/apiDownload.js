import axios from "axios";


//Download file from server by its id
export const apiDownloadFileFromServer =(data) => {
  const url = `/download`;
  return axios.post(url,data,{ responseType: 'blob'});
};


//Download file from server by its id
export const apiDownloadExcelFromServer =(filename) => {
  const url = `/downloadExcel/${filename}`;
  return axios.get(url,{ responseType: 'blob'});
};

export const apiDeleteFileFromServer =(data) => {
  const url = `/unlink`;
  return axios.post(url,data);
};