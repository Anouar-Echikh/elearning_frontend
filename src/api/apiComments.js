import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

//Create about
export const apiSaveComment = comment => {
  return axios.post(`${apiUrl}/comments/create`, comment);
};



//Get one New by idComments
export const apiGetOneCommentById =(idComments) => {
  const url = `${apiUrl}/comments/getOne/${idComments}`;
   return axios.get(url);
};

//Get all Comments 
export const apiGetAllCommentsByPostId =(id) => {
  const url = `${apiUrl}/comments/getAllByPostId/${id}`;
   return axios.get(url);
};

//Update Comments
//Patch Comments
export const apiPatchComment = (id, comments) => {
  const prefix = `${apiUrl}/comments/patch/${id}`;
  return axios.patch(prefix, comments);
};

//Delete Comments by id
export const apiDeleteCommentById =(id) => {
  const url = `${apiUrl}/comments/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete many comments by PostId
export const apiDeleteManyCommentsByPostId =(postId) => {
  const url = `${apiUrl}/comments/deleteMany/${postId}`;
  return axios.delete(url);
};

axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) {
          window.location=`${apiUrl}/login`
      }
      
  });