import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


// create Backcup
export const apiCreateBackup = (dbName)=> {
  return axios.get(`${apiUrl}/backups/create/${dbName}`);
};

// create Backcup
export const apiCreateCustomBackupforOneVideo = (data)=> {
  return axios.post(`${apiUrl}/customBackup/create`,data);
};

export const apiGetBackupListFiles =() => {
  const url = `${apiUrl}/backups/getAll`;
  return axios.get(url);
};

export const apiGetLastBackup =() => {
  const url = `${apiUrl}/backups/getLast`;
  return axios.get(url);
};

export const apiRestoreCustomMongoDB =(fileName) => {
  const url = `${apiUrl}/customBackup/restore/${fileName}`;
  return axios.get(url);
};


export const apiDeleteFileFromServer =(filename) => {
  const url = `${apiUrl}/backups/delete/${filename}`;
  return axios.get(url);
};

// Download file from server by its id
export const apiDownloadFileFromServer =(filename) => {
  const url = `${apiUrl}/backups/download/${filename}`;
  return axios.get(url,{ responseType: 'blob'});
};