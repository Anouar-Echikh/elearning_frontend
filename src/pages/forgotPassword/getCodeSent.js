import React, { useState, useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Row, Col } from "reactstrap";
import * as Yup from "yup";
import { connect } from "react-redux";
import SimpleCrypto from "simple-crypto-js";

import { unlockUser, getUserProfile } from "../../redux/actions/authActions";
import { getUserByEmail,getUserByCINPass } from "../../redux/actions/usersActions";
//import { sendCodeByEmail } from "../../../redux/actions/emailActions";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import Alert from"../alert"
import {apiTelVerificationCode,apiEmailVerificationCode} from "../../api/apiCodeVerification"

//import userImg from "../../../assets/avatar.png";


const GetAccountComponent =(props)=> {
  
  
  const [visible, setVisible] = useState(true)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyUser, setVerifyUser] = useState(false)
  const [email, setEmail] = useState("")
  const [showUser, setShowUser] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [randomCodeTel, setRandomCodeTel] = useState("")
  const [randomCodeEmail, setRandomCodeEmail] = useState("")
   const [userId, setUserId] = useState()

   const navigate=useNavigate()


  const onDismiss = () => {
    setVisible(false);
    setShow(false);
  };

 const  decrypt_code = encrypted_req => {
    console.log("encrypted_req:");
    console.log(encrypted_req);

    var _secretKey = "Yu_iLWq8c00vA";

    var simpleCrypto = new SimpleCrypto(_secretKey);

    var decrypted_req = simpleCrypto.decrypt(encrypted_req);
    console.log("Decryption process...");
    console.log("decrypted_req   : " + decrypted_req);

    return decrypted_req;
  };
  
  const getDataFromRequest = decrypted_req => {
    let str=decrypted_req+''
    var data = str.split(" ");

    return data;
  };
  /** Alert messages returned from backend */
  const displayAlertMsg = () => {
    const { error_user } = props;
    if (error_user) {
   return <Alert visible={visible} error_Msg={error_user} onDismiss={onDismiss} />
    }
  };
  
  const getRandomIntBetween=()=> {
    let min = Math.ceil(100000);//min
    let max = Math.floor(999999);//max
    console.log("random:",String( Math.floor(Math.random() * (max - min + 1)) + min))
    return  Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const sendCodeByEmail=async()=>{
    let randomCode=getRandomIntBetween()
    console.log("localstorge:",localStorage.getItem("email"))
      setRandomCodeEmail(randomCode)
      let stringCode=randomCode.toString()
       let resp=await apiEmailVerificationCode({codeEmail:stringCode,candidatEmail:localStorage.getItem("email")})
      // await props.patchUser(userId,{validationCode:stringCode})
      setRandomCodeEmail(stringCode)
  }

  const changePassword=()=>{
    navigate("/changePassWord",{replace:true})
  }
  
  const getValuesFromLocalStorage=()=>{
    //get crypted codeSecurity from localStorage
    let code = localStorage.getItem("ZuL8_i");
    //decrypt request data
    let decrypted_code = decrypt_code(code);
   console.log("decryptedCode:" + decrypted_code);
    const arrData = getDataFromRequest(decrypted_code);
    setRandomCodeEmail(arrData[0])
    console.log("{randomCodeEmail:arrData[0]}:",arrData[0])
    //------------------userId--------------
    let codeUserId = localStorage.getItem("WiL9d_i");
    //decrypt request data
    let decrypted_codeuser = decrypt_code(codeUserId);
    //console.log("decryptedCode:" + decrypted_codeuser);
    const data = getDataFromRequest(decrypted_codeuser);
    setUserId(data[0])
  }
  useEffect(()=>{
    getValuesFromLocalStorage()
  },[])


    
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
            {/* <img  src={require("../../assets/images/logo-fmm2.png")} style={{marginBottom:10}}/> */}
            {/* <img src={require("../assets/images/loginUser.png")} style={{marginBottom:10}}/> */}
            <img src={require("../../imgs/pwd.png")} className="mb-2"/> 
            <h3 style={{color:"#808B96"}}>Changer le mot de passe</h3>
          
            <div className="my-2 d-flex flex-column justify-content-center align-items-center">
            <span className="my-2" style={{backgroundColor:"#B8B6B5",borderRadius:40, fontSize:14, paddingLeft:15,paddingRight:15 ,color:"white"}}>Step 2</span> 
            {props.error_user &&<Alert  err_msg={props.error_user} open={show} close={()=>setShow(false)}  />}
            </div>
            
          </div>
          <LoadingOverlay
                    active={props.userIsFetching}
                    spinner={<ClipLoader size={10} color={"#40A4EB"} />}
                    styles={{
                      overlay: base => ({
                        ...base,
                        background: "  rgba(252, 252, 252, 0.61)"
                      })
                      
                    }}
                  >
          <div className="app-login-form">
         
          
          <Formik
              enableReinitialize={true}
              initialValues={{codeEmail:""}}
              onSubmit={changePassword}
              validationSchema={Yup.object().shape({
               codeEmail: Yup.number().equals([Number(randomCodeEmail)],"Code incorrect!").required("Ce champ est obligatoire (*)"),
              })}
              render={({
                
                handleSubmit,
                handleChange,
                errors,
                values,
                touched
              }) => (
                <Form>
                  <div style={{ maxWidth: 500 }} className='mx-auto'>

                    <Row>
                  
                      <Col xs="12" sm="12" lg="12">
                      <span>Nous venons d'envoyer un code de validation par Email au <b>{localStorage.getItem("email")}.</b></span>
                      <br/>
                        <Field
                          component={TextField}
                          id="codeEmail"
                          name="codeEmail"
                          label="Code de validation"
                          placeholder="Insérer le code"
                          margin="normal"
                          variant="outlined"
                          type="number"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.codeEmail && touched.codeEmail}
                          helperText={
                            errors.codeEmail && touched.codeEmail ? errors.codeEmail : null
                          }
                        />
                        <span><b>Si vous n'avez pas reçu le code, cliquez ici  </b> <Button variant="outlined" color="secondary" size="small" onClick={()=>sendCodeByEmail()}>Re-envoyer</Button></span>
                      <br/>
                      </Col>
           
              <Col xs="12" sm="12" lg="12">

              <div className="my-2 d-flex align-items-center justify-content-between">
                  <Button
                    
                    onClick={()=>navigate("/getAccount")}
                    
                    size="small"
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    //onClick={() => handleNext(2)}
                    onClick={handleSubmit}
                    
                    size="small"
                  >
                    Suivant
                  </Button>
                </div>
              </Col>
            </Row>
            </div>
            </Form>)}
            />
           
          </div>
          </LoadingOverlay>
        </div>
      </div>
      {props.loader && (
        <div className="loader-view">
          <CircularProgress size="20" />
        </div>
      )}
      {/* {visible && NotificationManager.error(error_Msg)}
      <NotificationContainer /> */}
    </div>
      </div>  
      
    );
  }


const mapStateToProps = ({ authReducer, emailReducer, usersReducer }) => {
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
    { unlockUser, getUserProfile, getUserByEmail,getUserByCINPass }
  )(GetAccountComponent)


export default GetAccount;
