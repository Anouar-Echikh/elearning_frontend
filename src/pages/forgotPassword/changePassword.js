import React, { Component } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";
import { connect } from "react-redux";
import SimpleCrypto from "simple-crypto-js";

import { unlockUser, getUserProfile } from "../../redux/actions/authActions";
import { getUserByEmail,getUserByCINPass,updateUserPwd } from "../../redux/actions/usersActions";
//import { sendCodeByEmail } from "../../../redux/actions/emailActions";
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import AlertMsg from"../alert"
import { Row, Col } from "reactstrap";
import {apiTelVerificationCode,apiEmailVerificationCode} from "../../api/apiCodeVerification"
import CloseIcon from '@mui/icons-material/Close';

//import userImg from "../../assets/avatar.png";
import Alert from '@mui/material/Alert';

import Collapse from '@mui/material/Collapse';


class GetAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      show: false,
      email: "",
      showUser: false,
      isActive: false,
      phoneNumber: "",
      randomCodeTel:"",
      randomCodeEmail:"",
      updated:false,
      userId:"",
      loading:false,
    };
    
  }
  onDismiss = () => {
    this.setState({ visible: false });
    this.setState({ show: false });
  };
  
  
  changePassword = ({password}) => {
    this.setState({loading:true})
    //const password = val.password;
    const id = this.state.userId;
    const data = {
      password,
      id
    };
    const success = this.props.updateUserPwd(data);
    if (success) {
      this.setState({ updated: true })
      this.setState({loading:false})
      localStorage.removeItem("ZuL8_i");
      localStorage.removeItem("WiL9d_i");
    localStorage.removeItem("email");
    }
  };
  decrypt_code = encrypted_req => {
    console.log("encrypted_req:");
    console.log(encrypted_req);

    var _secretKey = "Yu_iLWq8c00vA";

    var simpleCrypto = new SimpleCrypto(_secretKey);

    var decrypted_req = simpleCrypto.decrypt(encrypted_req);
    console.log("Decryption process...");
    console.log("decrypted_req   : " + decrypted_req);

    return decrypted_req;
  };
  getDataFromRequest = decrypted_req => {
    let str=decrypted_req+''
    var data = str.split(" ");

    return data;
  };
  getValuesFromLocalStorage=()=>{
    
    //------------------userId--------------
    let codeUserId = localStorage.getItem("WiL9d_i");
    if(codeUserId){
    //decrypt request data
    let decrypted_codeuser = this.decrypt_code(codeUserId);
    //console.log("decryptedCode:" + decrypted_codeuser);
    const data = this.getDataFromRequest(decrypted_codeuser);
    this.setState({userId:data[0]})
    }else{
this.props.history.push("/login")
    }
  }

  /** Alert messages returned from backend */
  displayAlertMsg = () => {
    const { error_user } = this.props;
    if (!this.state.updated) {
   return <AlertMsg visible={this.state.visible} error_Msg={error_user} onDismiss={this.onDismiss} />
    }else{
     return( <Collapse in={this.state.visible}>
        <Alert
          
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={ ()=> this.onDismiss()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
         Votre mot de passe a été bien modifié!
        </Alert>
      </Collapse>)
    }
  };
  
  componentDidMount=()=>{

    this. getValuesFromLocalStorage()
      }
      
  
  render() {
    return (
      <div  className="h-100 container-fluid d-md-flex justify-content-center text-center">
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="app-login-main-content">
        <div className="app-logo-content d-flex align-items-center justify-content-center">
        <Link className="" to="/" title="OCA">
              <img
              src={require("../../imgs/logo11.png")}
                alt="MyDigitalUniversity"
                title="MyDigitalUniversity"
                style={{height:50,width:155}}
              />
            </Link>
        </div>

        <div  className="app-login-content d-flex flex-column justify-content-center">
          <div className="app-login-header mb-0 pb-0  d-flex align-items-center flex-column justify-content-center">
            {/* <img  src={require("../../assets/images/logo-fmm2.png")} style={{marginBottom:20}}/> */}
            {/* <img src={require("../assets/images/loginUser.png")} style={{marginBottom:10}}/> */}
            <img src={require("../../imgs/pwd.png")} className="mb-2"/> 
            <h3 style={{color:"#808B96"}}>Changer le mot de passe</h3>
          
            <div className="my-2">
            <span className="my-1" style={{backgroundColor:"#B8B6B5",borderRadius:40, fontSize:14, paddingLeft:15,paddingRight:15 ,color:"white"}}>Step 3</span> 
           
              {this.state.show ? this.displayAlertMsg() : null}
            </div>
            
          </div>
          <LoadingOverlay
                    active={this.state.loading}
                    spinner={<BeatLoader size={10} color={"#40A4EB"} />}
                    styles={{
                      overlay: base => ({
                        ...base,
                        background: "  rgba(252, 252, 252, 0.61)"
                      })
                      
                    }}
                  >
          <div className="app-login-form my-3">
         
          
          <Formik
                initialValues={{
                 
                  password: "",
                  
                  passwordConfirm: ""
                }}
                onSubmit={this.changePassword}
                validationSchema={Yup.object().shape({
                 
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
                  { !this.state.updated?
                    <Row>
                  
                  <Col xs="12" sm="12" lg="12">
                  <Field
                          component={TextField}
                          id="password"
                          name="password"
                          label="Nouveaur mot de passe"
                          placeholder="mot de passe"
                          margin="dense"
                          variant="outlined"
                          type="password"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.password && touched.password}
                          helperText={
                            errors.password && touched.password ? errors.password : null
                          }
                        />
                        <Field
                          component={TextField}
                          id="passwordConfirm"
                          name="passwordConfirm"
                          label="Confirmer le mot de passe"
                          placeholder="Retaper le mot de passe"
                          margin="dense"
                          variant="outlined"
                          type="password"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.passwordConfirm && touched.passwordConfirm}
                          helperText={
                            errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : null
                          }
                        />
             

                    <div className="my-3 d-flex align-items-center justify-content-between">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                      >
                        Enregistrer
                      </Button>
                      <Link to="/login">Annuller</Link>
                    </div>
                   </Col>
                   </Row>:
                   <div className="d-flex justify-content-center flex-column align-items-center">
                   <Alert
          
          severity="success"
          
        >
         Votre mot de passe a été bien modifié!
        </Alert>

                   
                   <Link to="/login" className="border p-2" style={{color:"green", fontSize:16,fontWeight:"bold",marginTop:10}}>Terminer</Link>
                   </div>
                }
                  </>
                )}
              />
           
          </div>
          </LoadingOverlay>
        </div>
      </div>
      
      {/* {visible && NotificationManager.error(error_Msg)}
      <NotificationContainer /> */}
    </div>
    </div>    
      
    );
  }
}

const mapStateToProps = ({ authReducer, usersReducer }) => {
  return {
    error_Msg: authReducer.error,
    user: authReducer.profile,
    isAuth: authReducer.isAuth,
    isLocked: authReducer.isLocked,
    
    
    foundUser: usersReducer.user,
    error_user: usersReducer.error,
    loader: authReducer.inAuth
  };
};

const GetAccount = 
  connect(
    mapStateToProps,
    { unlockUser, getUserProfile, getUserByEmail,getUserByCINPass,updateUserPwd }
  )(GetAccountComponent)


export default GetAccount;
