import {
  PROFILE_FETCHED,
  USER_LOGOUT,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_FAILED_ONLOADING,
  USER_LOCK,
  IN_AUTH,
  USER_UNLOCK,
  USER_FETCHED
} from "../types/authTypes";

import {
  apiGetUserProfile,
  apiLogin,
  apiLogOut,
  apiSignUp,
  apiOauthFacebook,
  apiOauthGoogle,
  apiUnLockUser,
  apiOauthOneDrive
} from "../../api/apiAuth";
import { setAuthHeader } from "../../api/setAuthHeader";
import { apiGetUserByEmail } from "../../api/apiUsers";
import {useNavigate} from 'react-router-dom'
const TOKEN_NAME = "ela-app-token";
//(localStorage) => unlock user
const LOCK_KEY = "YIu8_iL09";
const KEY = "dfHc.52vsht$$125sddfg#)*20_iFdfdSEdFGHJ87è-4g*%%lkjvcvXwsqT";
const KEY_2_LOCK =
  "dfHc.52vRsht$$125sddfg#)*20_iF2512365VVCfrd*££dfdSEdFGHJ87è-4g*%%lkjvcvXwS.sqT";

//action dispatched when the user press the button "sign up"
export const signUp = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: IN_AUTH });
      const { data } = await apiSignUp(request_data);
      // we have to redirect client to login
      if (data.token) {
        setAuthHeader(data.token);
        dispatch(success_login(data.token));
        dispatch(getUserProfile());
        return true;
      } else {
        dispatch(error(data.error));
      }
    } catch (exeption) {}
  };
};
export const saveUser = request_data => {
  return async dispatch => {
    try {
     // dispatch({ type: IN_AUTH });
      const { data } = await apiSignUp(request_data);
      // we have to redirect client to login
      if (data.token) {
        
        return true;
      } else {
        dispatch(error(data.error));
      }
    } catch (exeption) {}
  };
};

//action dispatched when the user press the button "sign in"
export const login = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: IN_AUTH });
      const { data } = await apiLogin(request_data);
      if (data.token) {
        setAuthHeader(data.token);
        dispatch(success_login(data.token));
        dispatch(getUserProfile());
        return true
      } else {
        dispatch(error(data.error));
        return false
      }
    } catch (exeption) {
      const {
        response: { data }
      } = exeption;

      dispatch(error(data.error));
    }
  };
};

// oneDrive OAuth
export const oauthOneDrive = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: IN_AUTH });
      const { data } = await apiOauthOneDrive(request_data);

      if (data.token) {
        setAuthHeader(data.token);
        dispatch(success_login(data.token));
        dispatch(getUserProfile());
      } else {
        dispatch(error(data.error));
      }
    } catch (exeption) {
      const {
        response: { data }
      } = exeption;

       dispatch(error(data.error));
    }
  };
};

//action dispatched when the user press the button "sign in"
export const unlockUser = request_data => {
  return async dispatch => {
    try {
      dispatch({ type: IN_AUTH });
      const { data } = await apiUnLockUser(request_data);
      if (data.success) {
        localStorage.setItem(LOCK_KEY, KEY);
        dispatch({ type: USER_UNLOCK });
      } else {
        dispatch(error(data.error));
      }
    } catch (exeption) {
      const {
        response: { data }
      } = exeption;

      dispatch(error(data.error));
    }
  };
};



/*-----------Get user by email --------*/
export const getUserByEmail = email => {
  return async dispatch => {
    try {
      const { data } = await apiGetUserByEmail(email);

      if (data.account) dispatch({ type: USER_FETCHED, payload: data.account });
      else {
        dispatch(error(data.error));
      }
    } catch (e) {
      console.log("cant  fetch user");
      console.error(e);
    }
  };
};

//logout user
export const user_logout = () => {
  return async dispatch => {
    try {
      //update user => connected:false
      const {
        data: { success }
      } = await apiLogOut();
      console.log("success : " + success);
      if (success) {
        localStorage.removeItem(TOKEN_NAME); // or localstorage.clear()
        localStorage.removeItem(LOCK_KEY);
        setAuthHeader(null);
        dispatch({ type: USER_LOGOUT });
      } else {
        console.log("il ya un erreur au cours de déconnexion!");
      }
    } catch (e) {
      console.error(e);
    }
  };
};

//get the profile of the user authorized : in order to organize the navBar e.g (img of user, welcame name of user,...)
export const getUserProfile = () => {
  
  return async dispatch => {
    try {
      const {
        data: { user }
      } = await apiGetUserProfile();
      
      dispatch({ type: PROFILE_FETCHED, payload: user });
      return true;
    } catch (e) {
     

      //dispatch(error(e.response));
    if(e.response.status===401){
      localStorage.removeItem(TOKEN_NAME);
      dispatch({ type: USER_LOGOUT })
//window.location="/login"
    }
      //return false;
    }
  };
};
//
export const onLodingSignIn = () => {
  return dispatch => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      //get key lock
      const unlock_key = localStorage.getItem(LOCK_KEY);

      //test if user is authorized or not
      if (token == null || token ==undefined) {
        return dispatch(error_onloading("You need to login "));
      }

      // //test if user locked or not
      // if (
      //   unlock_key === KEY ||
      //   unlock_key === "undefined" ||
      //   unlock_key === null
      // ) {
      //   dispatch({ type: USER_UNLOCK });
      // }
      //si il ya un probleme de get user
      setAuthHeader(token);
      dispatch(getUserProfile());
      dispatch(success_login(token));
      // if (bool) {
      //   dispatch(success_login(token));
      // } else {
      //   dispatch(error_onloading("You need to login "));
      // }
    } catch (e) {
      console.log("exception onloding : ");
      console.error(e);
    }
  };
};

// action dispatched when the authorization is succeed
const success_login = token => {
  localStorage.setItem(TOKEN_NAME, token);
  return { type: AUTH_SUCCESS };
};

// action dispatched when the authorization is failed
const error = error => {
  return { type: AUTH_FAILED, payload: error };
};

//lOCK USER
export const lockUser = () => {
  return dispatch => {
    localStorage.setItem(LOCK_KEY, KEY_2_LOCK);
    dispatch({ type: USER_LOCK });
  };
};
//UNlOCK USER
// this function used in login.js in order to unblock user when he is logged in, because,by default, user is locked in state.
export const Dispatch_unlockUser_State = () => {
  return dispatch => {
    localStorage.setItem(LOCK_KEY, KEY);
    dispatch({ type: USER_UNLOCK });
  };
};

const error_onloading = error => {
  return { type: AUTH_FAILED_ONLOADING, payload: error };
};

// facebook OAuth
export const oauthFacebook = request_data => {
  return async dispatch => {
    try {
      const { data } = await apiOauthFacebook(request_data);

      if (data.token) {
        setAuthHeader(data.token);
        dispatch(success_login(data.token));
        dispatch(getUserProfile());
      } else {
        dispatch(error(data.error));
      }
    } catch (exeption) {
      const {
        response: { data }
      } = exeption;

      dispatch(error(data.error));
    }
  };
};

// google OAuth
export const oauthGoogle = request_data => {
  return async dispatch => {
    try {
      const { data } = await apiOauthGoogle(request_data);

      if (data.token) {
        setAuthHeader(data.token);
        dispatch(success_login(data.token));
        dispatch(getUserProfile());
      } else {
        dispatch(error(data.error));
      }
    } catch (exeption) {
      const {
        response: { data }
      } = exeption;

      dispatch(error(data.error));
    }
  };
};
