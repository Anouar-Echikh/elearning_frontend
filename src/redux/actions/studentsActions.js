import {
  STUDENT_IS_SAVING,
  STUDENT_SAVE_SUCCESS,
  STUDENT_SAVE_FAILED,
  STUDENT_DELETE_FAILED,
  STUDENT_DELETE_SUCCESS,
  STUDENT_IS_DELETING,
  STUDENT_FETCH_FAILED,
  STUDENT_FETCH_SUCCESS,
  STUDENT_IS_FETCHING,
  STUDENT_IS_UPDATING,
  STUDENT_UPDATE_FAILED,
  STUDENT_UPDATE_SUCCESS,
  //PATCH
  STUDENT_IS_PATCHING,
  STUDENT_PATCH_FAILED,
  STUDENT_PATCH_SUCCESS,
  STUDENT_SEARCH,
  ONE_STUDENT_FETCH_SUCCESS,
  VERIFY_STUDENT,
  STUDENT_PDF
} from "../types/studentsTypes";
import {
  apiSaveStudent,
  apiDeleteStudent,
  apiGetStudent,
  apiPatchStudent,
  apiUpdateStudent,
  apiGetStudents,
  apiGetStudentByEmail,
  apiGetStudentById,
  apiUpdateStudentPwd,
  apiGetStudentByCINPass,
  apiGetStudentsByListIds
} from "../../api/apiStudents";
import {
  apiSignUp
} from "../../api/apiAuth";


/** add Student */
export const saveStudent = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_SAVING });
      const { data } = await apiSaveStudent(request_data);
      if (data.success === true) {
        dispatch({ type: STUDENT_SAVE_SUCCESS });
        
        return data.success
      } else{
        dispatch({ type: STUDENT_SAVE_FAILED,payload:data.error });
          return data.success;
      }
             
    } catch (e) {
      dispatch({ type: STUDENT_SAVE_FAILED,payload:e });
     
      //alert(e);
    }
  };
};

/** getStudentss by list ids */
export const getStudentsByListIds = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_FETCHING });
      const { data } = await apiGetStudentsByListIds(request_data);
      if (data.users) {
        dispatch({ type: STUDENT_FETCH_SUCCESS, payload: data.users });
        return data.users
      } else {
        dispatch({ type: STUDENT_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      dispatch({ type: STUDENT_FETCH_FAILED });
      console.log(e);
    }
  };
};


/*-----------Update Student--------*/
export const updateStudent = (id, request_data) => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_UPDATING });

      const { data } = await apiUpdateStudent(id, request_data);
      if (data.success === true) {
        dispatch({ type: STUDENT_UPDATE_SUCCESS });

        return data.success;
      } else {
        dispatch({ type: STUDENT_UPDATE_FAILED });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// patch a program
export const patchStudent = (id, request_data) => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_PATCHING });
      const { data } = await apiPatchStudent(id, request_data);
      if (data.success === true) {
        dispatch({ type: STUDENT_PATCH_SUCCESS });
        return data.success;
      } 
    } catch (e) {
      console.log(e);
      
        dispatch({ type: STUDENT_PATCH_FAILED,payload:e });
       
  
  };
};
}

/*-----------Update Student Password--------*/
export const updateStudentPwd = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_UPDATING });
      const { data } = await apiUpdateStudentPwd(request_data);
      if (data.success === true) {
        dispatch({ type: STUDENT_UPDATE_SUCCESS });

        return data.success;
      } else {
        dispatch({ type: STUDENT_UPDATE_FAILED });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

/*-----------Delete Student--------*/

export const deleteStudent = id => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_DELETING });
      const { data } = await apiDeleteStudent(id);
      if (data.success === true) {
        dispatch({ type: STUDENT_DELETE_SUCCESS });

        return data.success;
      } else {
        dispatch({ type: STUDENT_DELETE_FAILED });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

/*-----------Get Student by email --------*/
export const getStudentByEmail = email => {
  return async dispatch => {
    try {
      const { data } = await apiGetStudentByEmail(email);

      if (data.account)
        dispatch({ type: ONE_STUDENT_FETCH_SUCCESS, payload: data.account });
      else {
        dispatch({ type: ONE_STUDENT_FETCH_SUCCESS, payload: data.error });
      }
    } catch (e) {
     
      console.log("cant  fetch Student");
      console.error(e);
    }
  };
};

/*-----------Get Student by id --------*/
export const getStudentById = id => {
  return async dispatch => {
    try {
      const { data } = await apiGetStudentById(id);

      if (data.account)
        {dispatch({ type: ONE_STUDENT_FETCH_SUCCESS, payload: data.account });
        return data.account}
      else {
        dispatch({ type: ONE_STUDENT_FETCH_SUCCESS, payload: data.error });
      }
    } catch (e) {
      console.log("cant  fetch Student");
      console.error(e);
    }
  };
};

/*-----------Get Student by CIN --------*/
export const getStudentByCINPass = id => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_FETCHING });
      const { data } = await apiGetStudentByCINPass(id);

      if (data.account)
        {
        dispatch({ type: ONE_STUDENT_FETCH_SUCCESS, payload: data.account });
        return true
      }
      else {
    
      dispatch({ type: STUDENT_FETCH_FAILED, payload: data.error });
        return false
      }
    } catch (e) {
      console.log("cant  fetch Student");
      console.error(e);
    }
  };
};

/*-----------Get Students--------*/
export const getStudents = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: STUDENT_IS_FETCHING });
      const { data } = await apiGetStudents(request_data);
      if (data.Students) {
        dispatch({ type: STUDENT_FETCH_SUCCESS, payload: data.students });
        return data.students
      } else {
        dispatch({ type: STUDENT_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      dispatch({ type: STUDENT_FETCH_FAILED });
      console.log(e);
    }
  };
};
/*-----------Get Student not verified --------*/
export const getStudentToVerify = Student => {
  return dispatch => {
    dispatch({ type: VERIFY_STUDENT, payload: Student });
  };
};

/*-----------Search Student--------*/
export const searchStudent = text => {
  return dispatch => {
    dispatch({ type: STUDENT_SEARCH, text });
  };
};

/*-----------PDF Student--------*/
export const sendPDFStudents = data => {
  return dispatch => {
    dispatch({ type: STUDENT_PDF, data });
  };
};

export const refreshListStudents = data => {
  return dispatch => {
    dispatch({ type: STUDENT_FETCH_SUCCESS, payload: data });
  };
};

// action dispatched when the authorization is failed
const errorFetching = error => {
  return { type: STUDENT_FETCH_FAILED, payload: error };
};
const errorUpdating = error => {
  return { type: STUDENT_UPDATE_FAILED, payload: error };
};
const errorDeleting = error => {
  return { type: STUDENT_DELETE_FAILED, payload: error };
};
