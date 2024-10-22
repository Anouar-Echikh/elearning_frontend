import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Alert } from "reactstrap";
import { Formik ,Field} from "formik";
import { Select } from 'material-ui-formik-components/Select'
import * as Yup from "yup";
import {
  signUp,
  onLodingSignIn,
  oauthFacebook,
  oauthGoogle
} from "../redux/actions/authActions";
import {getAllOrgs} from "../redux/actions/organizationsActions"

import {
  NotificationContainer,
  
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

import {useNavigate} from "react-router-dom"

const  RegisterComponent =(props)=> {
  
  const [visible, setVisible] = useState(true)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [organizations, setOrganizations] = useState([])     
   const navigate=useNavigate()

   const getListItems = async () => {
    setLoading(true)
    try {
      const Items = await props.getAllOrgs()
      console.log("allItems:", Items)
      setOrganizations(Items)
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getListItems()
  }, [])

  useEffect(()=>{
    const { isAuth } = props;
    if (isAuth) {
      navigate("/home");
    }
  }) ;
  
  const onDismiss = () => {
    setVisible(false);
    //make Alert msg hidden by default
    setShow(false);
  };

  const addUser = async values => {
try{
    const bool = await props.signUp(values);
    console.log(values);

    
}catch(e){
  console.log(e.getMessage())
    if (props.error_Msg) {
      setShow(true);
      setVisible(true);
    }
  }
  };

  const displayAlertMsg = () => {
    const { error_Msg } = props;
    if (error_Msg) {
      console.log("Alert msg Insc");
      console.log(error_Msg);
      return (
        <Alert
          color="danger"
          isOpen={visible}
          toggle={onDismiss}
          fade={true}
          className="my-2"
        >
          {error_Msg}
        </Alert>
      );
    }
  };

  

  
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="Jambo">
              <img
                src={require("../imgs/logo11.png")}
                alt="jambo"
                title="jambo"
              />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header">
              <h1>Sign Up</h1>
            </div>

            <div className="mb-2">
              {//conditional rendering alert msg
              show ? displayAlertMsg() : null}
            </div>

            <div className="app-login-form">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  organization:"",
                  passwordConfirm: ""
                }}
                onSubmit={addUser}
                validationSchema={Yup.object().shape({
                  organization: Yup.string().required("Veuillez choisir votre établissement (*)"),
                  email: Yup.string()
                    .email("E-mail non valide!")
                    .required("Ce champ est obligatoire (*)"),
                  password: Yup.string()
                    .min(
                      8,
                      "Nbr de charactères doit ètre supérieur ou égale à 8"
                    )
                    .required("Ce champ est obligatoire (*)"),
                  passwordConfirm: Yup.string()
                    .oneOf(
                      [Yup.ref("password"), null],
                      "Les deux mots de passe ne sont pas identiques!"
                    )
                    .required("Ce champ est obligatoire (*)")
                })}
                render={({
                  /** props given by formik */
                  handleChange,
                  handleSubmit,

                  handleBlur,
                  errors,
                  touched
                }) => (
                  <>
    <Field
                                component={Select}
                                name="organization"
                                label="Etablissement"
                                options={organizations.map((el, index) => ({ value: el._id, label: el.name }))}
                                error={errors.organization && touched.organization}
                                helperText={
                                  errors.organization && touched.organization ? errors.organization : null
                                }
                              />
                    <TextField
                      type="text"
                      label="Name"
                      error={errors.name && touched.name}
                      helperText={
                        errors.name && touched.name ? errors.name : ""
                      }
                      fullWidth
                      
                      name="name"
                      id="name"
                      placeholder="Enter your name .."
                      onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                      onBlur={handleBlur}
                      margin="normal"
                      className="mt-0 mb-2"
                    />

                    <TextField
                      label="Email"
                      error={errors.email && touched.email}
                      helperText={
                        errors.email && touched.email ? errors.email : ""
                      }
                      fullWidth
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter e-mail .."
                      onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                      onBlur={handleBlur}
                      margin="normal"
                      className="mt-0 mb-2"
                    />

                    <TextField
                      error={errors.password && touched.password}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ""
                      }
                      type="password"
                      label="Password"
                      fullWidth
                      
                      name="password"
                      id="password"
                      placeholder="Enter password .."
                      onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                      onBlur={handleBlur}
                      margin="normal"
                      className="mt-0 mb-2"
                    />
                    <TextField
                      error={errors.passwordConfirm && touched.passwordConfirm}
                      helperText={
                        errors.passwordConfirm && touched.passwordConfirm
                          ? errors.passwordConfirm
                          : ""
                      }
                      type="password"
                      label="Password confirmation"
                      fullWidth
                      
                      name="passwordConfirm"
                      id="passwordConfirm"
                      placeholder="Confirm your password .."
                      onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                      onBlur={handleBlur}
                      onKeyPress={e => (e.which === 13 ? handleSubmit() : "")}
                      margin="normal"
                      className="mt-0 mb-4"
                    />

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                      >
                        Register
                      </Button>
                      <Link to="/signin">alreadyMember</Link>
                    </div>
                    <div className="app-social-block my-1 my-sm-3 d-none">
                      connectWith
                      <ul className="social-link">
                        <li>
                          <IconButton
                            className="icon"
                            onClick={() => {
                              // props.showAuthLoader();
                              // props.userFacebookSignIn();
                            }}
                          >
                            <i className="zmdi zmdi-facebook" />
                          </IconButton>
                        </li>

                        <li>
                          <IconButton
                            className="icon"
                            onClick={() => {
                              // props.showAuthLoader();
                              // props.userTwitterSignIn();
                            }}
                          >
                            <i className="zmdi zmdi-twitter" />
                          </IconButton>
                        </li>

                        <li>
                          <IconButton
                            className="icon"
                            onClick={() => {
                              // props.showAuthLoader();
                              // props.userGoogleSignIn();
                            }}
                          >
                            <i className="zmdi zmdi-google-plus" />
                          </IconButton>
                        </li>

                        <li>
                          <IconButton
                            className="icon"
                            onClick={() => {
                              // props.showAuthLoader();
                              // props.userGithubSignIn();
                            }}
                          >
                            <i className="zmdi zmdi-github" />
                          </IconButton>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {loading && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        {/*showMessage && NotificationManager.error(alertMessage)*/}
        <NotificationContainer />
      </div>
    );
        }

const mapStateToProps = ({ authReducer }) => {
  return {
    error_Msg: authReducer.error,
    user: authReducer.profile,
    isAuth: authReducer.isAuth,
    loader: authReducer.inAuth
  };
};

const Register = connect(mapStateToProps, {
  signUp,
  onLodingSignIn,
  oauthFacebook,
  oauthGoogle,
  getAllOrgs
})(RegisterComponent);

export default Register;
