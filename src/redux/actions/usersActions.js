import {
  USER_IS_SAVING,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAILED,
  USER_DELETE_FAILED,
  USER_DELETE_SUCCESS,
  USER_IS_DELETING,
  USER_FETCH_FAILED,
  USER_FETCH_SUCCESS,
  USER_IS_FETCHING,
  USER_IS_UPDATING,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
  //PATCH
  USER_IS_PATCHING,
  USER_PATCH_FAILED,
  USER_PATCH_SUCCESS,
  USER_SEARCH,
  ONE_USER_FETCH_SUCCESS,
  VERIFY_USER,
  USER_PDF
} from "../types/usersTypes";
import {
  apiSaveUser,
  apiDeleteUser,
  apiGetUser,
  apiPatchUser,
  apiUpdateUser,
  apiGetUsers,
  apiGetUserByEmail,
  apiGetUserById,
  apiUpdateUserPwd,
  apiGetUserByCINPass,
  apiGetUsersByListIds
} from "../../api/apiUsers";
import {
  apiSignUp
} from "../../api/apiAuth";


/** add user */
export const saveUser = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_SAVING });
      const { data } = await apiSaveUser(request_data);
      if (data.success === true) {
        dispatch({ type: USER_SAVE_SUCCESS });
        
        return data.success
      } else{
        dispatch({ type: USER_SAVE_FAILED,payload:data.error });
          return data.success;
      }
             
    } catch (e) {
      dispatch({ type: USER_SAVE_FAILED,payload:e });
     
      //alert(e);
    }
  };
};

/** getUsers by list ids */
export const getUsersByListIds = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_FETCHING });
      const { data } = await apiGetUsersByListIds(request_data);
      if (data.users) {
        dispatch({ type: USER_FETCH_SUCCESS, payload: data.users });
        return data.users
      } else {
        dispatch({ type: USER_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      dispatch({ type: USER_FETCH_FAILED });
      console.log(e);
    }
  };
};


/*-----------Update user--------*/
export const updateUser = (id, request_data) => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_UPDATING });

      const { data } = await apiUpdateUser(id, request_data);
      if (data.success === true) {
        dispatch({ type: USER_UPDATE_SUCCESS });

        return data.success;
      } else {
        dispatch({ type: USER_UPDATE_FAILED });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// patch a program
export const patchUser = (id, request_data) => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_PATCHING });
      const { data } = await apiPatchUser(id, request_data);
      if (data.success === true) {
        dispatch({ type: USER_PATCH_SUCCESS });
        return data.success;
      } 
    } catch (e) {
      console.log(e);
      
        dispatch({ type: USER_PATCH_FAILED,payload:e });
       
  
  };
};
}

/*-----------Update user Password--------*/
export const updateUserPwd = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_UPDATING });
      const { data } = await apiUpdateUserPwd(request_data);
      if (data.success === true) {
        dispatch({ type: USER_UPDATE_SUCCESS });

        return data.success;
      } else {
        dispatch({ type: USER_UPDATE_FAILED });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

/*-----------Delete user--------*/

export const deleteUser = id => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_DELETING });
      const { data } = await apiDeleteUser(id);
      if (data.success === true) {
        dispatch({ type: USER_DELETE_SUCCESS });

        return data.success;
      } else {
        dispatch({ type: USER_DELETE_FAILED });
        return data.success;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

/*-----------Get user by email --------*/
export const getUserByEmail = email => {
  return async dispatch => {
    try {
      const { data } = await apiGetUserByEmail(email);

      if (data.account){
        dispatch({ type: ONE_USER_FETCH_SUCCESS, payload: data.account });
        return data.account
      }
      else {
        dispatch({ type: ONE_USER_FETCH_SUCCESS, payload: data.error });
      }
    } catch (e) {
     
      console.log("cant  fetch user");
      console.error(e);
    }
  };
};

/*-----------Get user by id --------*/
export const getUserById = id => {
  return async dispatch => {
    try {
      const { data } = await apiGetUserById(id);

      if (data.account)
        {dispatch({ type: ONE_USER_FETCH_SUCCESS, payload: data.account });
        return data.account}
      else {
        dispatch({ type: ONE_USER_FETCH_SUCCESS, payload: data.error });
      }
    } catch (e) {
      console.log("cant  fetch user");
      console.error(e);
    }
  };
};

/*-----------Get user by CIN --------*/
export const getUserByCINPass = id => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_FETCHING });
      const { data } = await apiGetUserByCINPass(id);

      if (data.account)
        {
        dispatch({ type: ONE_USER_FETCH_SUCCESS, payload: data.account });
        return true
      }
      else {
    
      dispatch({ type: USER_FETCH_FAILED, payload: data.error });
        return false
      }
    } catch (e) {
      console.log("cant  fetch user");
      console.error(e);
    }
  };
};

/*-----------Get users--------*/
export const getUsers = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: USER_IS_FETCHING });
      const { data } = await apiGetUsers(request_data);
      if (data.users) {
        dispatch({ type: USER_FETCH_SUCCESS, payload: data.users });
        return data.users
      } else {
        dispatch({ type: USER_FETCH_FAILED, payload: data.error });
      }
    } catch (e) {
      dispatch({ type: USER_FETCH_FAILED });
      console.log(e);
    }
  };
};
/*-----------Get user not verified --------*/
export const getUserToVerify = user => {
  return dispatch => {
    dispatch({ type: VERIFY_USER, payload: user });
  };
};

/*-----------Search user--------*/
export const searchUser = text => {
  return dispatch => {
    dispatch({ type: USER_SEARCH, text });
  };
};

/*-----------PDF user--------*/
export const sendPDFUsers = data => {
  return dispatch => {
    dispatch({ type: USER_PDF, data });
  };
};

export const refreshListUsers = data => {
  return dispatch => {
    dispatch({ type: USER_FETCH_SUCCESS, payload: data });
  };
};

// action dispatched when the authorization is failed
const errorFetching = error => {
  return { type: USER_FETCH_FAILED, payload: error };
};
const errorUpdating = error => {
  return { type: USER_UPDATE_FAILED, payload: error };
};
const errorDeleting = error => {
  return { type: USER_DELETE_FAILED, payload: error };
};
