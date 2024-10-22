import axios from "axios";

//Create about
export const apiSaveComment = comment => {
  return axios.post("/comments/create", comment);
};



//Get one New by idComments
export const apiGetOneCommentById =(idComments) => {
  const url = `/comments/getOne/${idComments}`;
   return axios.get(url);
};

//Get all Comments 
export const apiGetAllCommentsByPostId =(id) => {
  const url = `/comments/getAllByPostId/${id}`;
   return axios.get(url);
};

//Update Comments
//Patch Comments
export const apiPatchComment = (id, comments) => {
  const prefix = `/comments/patch/${id}`;
  return axios.patch(prefix, comments);
};

//Delete Comments by id
export const apiDeleteCommentById =(id) => {
  const url = `/comments/deleteOne/${id}`;
  return axios.delete(url);
};

//Delete many comments by PostId
export const apiDeleteManyCommentsByPostId =(postId) => {
  const url = `/comments/deleteMany/${postId}`;
  return axios.delete(url);
};

axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) {
          window.location="/login"
      }
      
  });