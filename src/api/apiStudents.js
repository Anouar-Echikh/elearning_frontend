import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const apiSaveStudent = Student => {
  return axios.post(`${apiUrl}/students/create`, Student);
};


// get by Listids
export const apiGetStudentsByListIds = data => {
  return axios.post(`${apiUrl}/students/getByListIds`, data);
};

//Read Student
export const apiGetStudents = month => {
  const prefix = `${apiUrl}/students`;
  const url = month ? `${prefix}/${month}` : prefix;
  return axios.get(url);
};

//Get Student by email
export const apiGetStudentByEmail = email => {
  const prefix = `${apiUrl}/student`;
  const url = `${prefix}/${email}`;
  return axios.get(url);
};
export const apiGetStudentByCINPass = id => {
  const prefix = `${apiUrl}/students/getStudentByCINPass`;
  const url = `${prefix}/${id}`;
  return axios.get(url);
};
//Get Student by id
export const apiGetStudentById = id => {
  const prefix = `${apiUrl}/students/getById`;
  const url = `${prefix}/${id}`;
  return axios.get(url);
};

//Update Student
export const apiUpdateStudent = (id, Student) => {
  const prefix = `${apiUrl}/students/${id}`;
  return axios.put(prefix, Student);
};

//Update Student Password
export const apiUpdateStudentPwd = data => {
  return axios.put(`${apiUrl}/changeStudentPwd`, data);
};

//Destroy Student
export const apiDeleteStudent = id => {
  const prefix = `${apiUrl}/students/${id}`;
  return axios.delete(prefix);
};

//Patch Student
export const apiPatchStudent = (id, Student) => {
  const prefix = `${apiUrl}/students/patch/${id}`;
  return axios.patch(prefix, Student);
};