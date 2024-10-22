
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
  ONE_STUDENT_FETCH_SUCCESS,
  VERIFY_student,
  STUDENT_PDF
} from "../types/studentsTypes";

var initialState = {
  studentSaved:false,
  studentIsSaving:false,
  studentDeleted: false,
  studentIsDeleting: false,
  studentUpdated: false,
  studentIsUpdating: false,
  studentPatched: false,
    studentIsPatching: false,
  error: null,
  student: {},
  verifStudent: {},
  students: [],
  pdfStudents: []
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
     //-------Save-------//
     case STUDENT_IS_SAVING:
      return {
        ...state,
        studentIsSaving: true,
        error: null
      };
    case STUDENT_SAVE_SUCCESS:
      return {
        ...state,
        studentSaved: true,
        studentIsSaving: false,
        error: null
      };
    case STUDENT_SAVE_FAILED:
      return {
        ...state,
        studentIsSaving: false,
        error: action.payload
      };

    //-------Fetch-------//
    case STUDENT_IS_FETCHING:
      return { ...state, studentIsFetching: true };
    case STUDENT_FETCH_SUCCESS:
      return {
        ...state,
        studentIsFetching: false,
        students: action.payload,
        error: null
      };
    case ONE_STUDENT_FETCH_SUCCESS:
      return {
        ...state,
        studentIsFetching: false,
        student: action.payload,
        error: null
      };
    case VERIFY_student:
      return {
        ...state,
        verifStudent: action.payload
      };
    case STUDENT_FETCH_FAILED:
      return {
        ...state,
        studentIsFetching: false,
        error: action.payload
      };

    //-------update-------//
    case STUDENT_IS_UPDATING:
      return { ...state, studentIsUpdating: true };
    case STUDENT_UPDATE_SUCCESS:
      return {
        ...state,
        studentUpdated: true,
        studentIsUpdating: false
      };
    case STUDENT_UPDATE_FAILED:
      return {
        ...state,
        studentIsUpdating: false,
        error: action.payload
      };
//-------patch-------//
case STUDENT_IS_PATCHING:
  return { ...state, studentIsPatching: true,error: null };
case STUDENT_PATCH_SUCCESS:
  return {
    ...state,
    studentPatched: true,
    studentIsPatching: false,
    error: null
  };
case STUDENT_PATCH_FAILED:
  return {
    ...state,
    studentIsPatching: false,
    error: action.payload
  };
    //-------Delete-------//
    case STUDENT_IS_DELETING:
      return { ...state, studentIsDeleting: true };
    case STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        studentDeleted: true,
        studentIsDeleting: false
      };
    case STUDENT_DELETE_FAILED:
      return {
        ...state,
        studentIsDeleting: false,
        error: action.payload
      };
    //-------CLIENT PDF-------//
    case STUDENT_PDF:
      return {
        ...state,
        pdfstudents: action.data
      };

    //----DEFAULT----//
    default:
      return state;
  }
};
export default studentsReducer;
