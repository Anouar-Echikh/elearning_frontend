import axios from "axios";


// create Backcup
export const apiCreateBackup = (dbName)=> {
  return axios.get(`/backups/create/${dbName}`);
};

// create Backcup
export const apiCreateCustomBackupforOneVideo = (data)=> {
  return axios.post(`/customBackup/create`,data);
};

export const apiGetBackupListFiles =() => {
  const url = `/backups/getAll`;
  return axios.get(url);
};

export const apiGetLastBackup =() => {
  const url = `/backups/getLast`;
  return axios.get(url);
};

export const apiRestoreCustomMongoDB =(fileName) => {
  const url = `/customBackup/restore/${fileName}`;
  return axios.get(url);
};


export const apiDeleteFileFromServer =(filename) => {
  const url = `/backups/delete/${filename}`;
  return axios.get(url);
};

// Download file from server by its id
export const apiDownloadFileFromServer =(filename) => {
  const url = `/backups/download/${filename}`;
  return axios.get(url,{ responseType: 'blob'});
};