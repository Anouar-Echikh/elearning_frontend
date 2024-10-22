import axios from "axios";

export const apiSaveStudent = Student => {
  return axios.post("/students/create", Student);
};


// get by Listids
export const apiGetStudentsByListIds = data => {
  return axios.post("/students/getByListIds", data);
};

//Read Student
export const apiGetStudents = month => {
  const prefix = "/students";
  const url = month ? `${prefix}/${month}` : prefix;
  return axios.get(url);
};

//Get Student by email
export const apiGetStudentByEmail = email => {
  const prefix = "/student";
  const url = `${prefix}/${email}`;
  return axios.get(url);
};
export const apiGetStudentByCINPass = id => {
  const prefix = "/students/getStudentByCINPass";
  const url = `${prefix}/${id}`;
  return axios.get(url);
};
//Get Student by id
export const apiGetStudentById = id => {
  const prefix = "/students/getById";
  const url = `${prefix}/${id}`;
  return axios.get(url);
};

//Update Student
export const apiUpdateStudent = (id, Student) => {
  const prefix = `/students/${id}`;
  return axios.put(prefix, Student);
};

//Update Student Password
export const apiUpdateStudentPwd = data => {
  return axios.put("/changeStudentPwd", data);
};

//Destroy Student
export const apiDeleteStudent = id => {
  const prefix = `/students/${id}`;
  return axios.delete(prefix);
};

//Patch Student
export const apiPatchStudent = (id, Student) => {
  const prefix = `/students/patch/${id}`;
  return axios.patch(prefix, Student);
};