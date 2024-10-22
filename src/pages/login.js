import React,{useEffect,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { connect,useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { Row, Col } from "reactstrap";

//import IntlMessages from "../util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  login,
  onLodingSignIn,
  Dispatch_unlockUser_State,
  // oauthFacebook,
   oauthGoogle,
  oauthMicrosoft
} from "../redux/actions/authActions";

//import MicrosoftLogin from "react-microsoft-login";

 import { GoogleLogin } from '@leecheuk/react-google-login';
// import FacebookLogin from "react-facebook-login";
// import ClipLoader from "react-spinners/ClipLoader";
// import LoadingOverlay from "react-loading-overlay";
// import { sendCodeByEmail } from "../../../redux/actions/emailActions";
// import GetSecurityCode from "../forgotPassword/getSecurityCodeByEmail";
import SimpleCrypto from "simple-crypto-js";
import { getUserToVerify, getUserByEmail } from "../redux/actions/usersActions";
import Alert from './alert';
//import Background from '../../assets/bg2.png'



const  LoginComponent =(props)=> {
  const [visible, setVisible] = useState(true)
  const [show, setShow] = useState(false)
  const [load, setLoad] = useState(false)
  const [verifyUser, setVerifyUser] = useState(false)
  const [email, setEmail] = useState("")
  const [showVerifCodePanel, setShowVerifCodePanel] = useState(null)
  const err_login = useSelector(state => state.authReducer.error)
  const isAuth = useSelector(state => state.authReducer.isAuth)
  const navigate = useNavigate();
      
 
  const onDismiss = () => {
    setVisible(false);
    setShow(false);
  };


  //listen for props update

  useEffect(()=>{
  //  const { isAuth } = props;
     if (isAuth) {
       navigate("/",{ replace: true });
     }
  })
  
  //function to encrypt string code
  const encrypt_code = text => {
    var _secretKey = "Yu_iLWq8c00vA";

    var simpleCrypto = new SimpleCrypto(_secretKey);

    var encrypted_Text = simpleCrypto.encrypt(text);
    return encrypted_Text;
  };

  //function to generate random string as "code security"
  const generate_random_string = string_length => {
    let random_string = "";
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90;
    for (let i = 0; i < string_length; i++) {
      random_ascii = Math.floor(
        Math.random() * (ascii_high - ascii_low) + ascii_low
      );
      random_string += String.fromCharCode(random_ascii);
    }
    return random_string;
  };

  // function to send security code by email to verify if this is the owner of account
  const sendSecurityCodeByEmail = async () => {
    const { sendCodeByEmail } = props;
    const code = generate_random_string(6);
    console.log("code:");
    console.log(code);

    var email = {
      from: "anouar.chikh4@gmail.com",
      to: "fulljs.developer@gmail.com",
      subject: "Code sécurité  E-Learning Academy",
      html: ` <span>Votre code sécurité est:&nbsp;<strong>${code}</strong></span>`
    };
    const val = await sendCodeByEmail(email);

    if (props.emailSent) {
      const text = `${code} `;

      const encrypted_code = encrypt_code(text);
      localStorage.setItem("ZuL8_i", encrypted_code);
      localStorage.setItem("email", email);
      //to check : if this operation to change password or verify tho owner of account in order to redirect user in the success case
      localStorage.setItem("Uis$", true);

      //props.history.push(`/getSecurityCodeByEmail?data=${encrypted_req}`); ///${encrypted_req}`);
      // props.history.replace(`/getSecurityCodeByEmail`); ///${encrypted_req}`);
      setShowVerifCodePanel( true);
    } else {
      alert(props.error_email);
      /*** Solution : use localstorage or db */
    }
  };

  const onEnterPress = e => {
    if (e.key === "Enter") {
      addUser();
    }
  };
  
  const addUser = async values => {
   
    const email = values.email;
    const password = values.password;
    const verifiedUser = false; //user is verified if he give his correct password from his email
    const data = { email, password, verifiedUser };
    setLoad(true)
    setEmail(values.email)
    const bool = await props.login(data);

  
    if (bool==false) {
      setLoad(false);
      setShow(true);
      //setVisible(true);
    }

    //UNLOCK USER : because user is locked by default in state
    //props.Dispatch_unlockUser_State();
  };

  const displayAlertMsg = (err_login) => {
    //const { error_Msg } = props;
    
      return (
        <Alert
          err_msg={err_login&&err_login.data}
        />
          
       
      );
    
  };

  // responseFacebook = async res => {
  //   console.log(res);
  //   await props.oauthFacebook(res.accessToken);
  //   // if (!props.errorMessage) {
  //   //   props.history.push("/");
  //   // }
  // };
  const responseGoogle = async res => {
    console.log(res);
    //let {tw:{accessToken}}=res;
    //console.log("accessToken", res&&res.accessToken);
   await props.oauthGoogle(res);
  };

 
//  logoutHandler = () => {
//     msalInstance.logout();
//   };
//   authHandler = async(err, data,msal) => {
//     console.log(err, data);
//     //console.log("token loggin oneDrive:",data.accessToken)
   
//     if (!err && data) {
//       //onMsalInstanceChange(msal);
//       setState({msalInstance:msal})
// let idToken=data.idToken
//       let infos={id_token:idToken.rawIdToken,state:data.accountState,tenantIdOrName:data.tenantId,issuer:idToken.issuer}
//        //let infos={token:data.accessToken}
//       //localStorage.setItem(TOKEN_NAME, data.accessToken);
//        console.log("infos:",infos)
//       await props.oauthMicrosoft(data.accessToken);
//     }
   
//   };

  const componentClicked = async() => {

    console.log("facebook btn clicked");
   
  };

  /**-----------------------Msal login---------------------------------- */


/**--------------------------End Msal Login fun ----------------------- */

  
    return (
      
 
     <div className="app-login-container  login-bgImage d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="" to="/" title="OCA">
              <img
               src={require("../imgs/logo11.png")}
                alt="E-Learning-Academy"
                title="E-Learning-Academy"
                style={{height:50,width:155}}
              />
            </Link>
          </div>

          <div  className="app-login-content d-flex flex-column justify-content-center">
            <div className="app-login-header mb-0 pb-0  d-flex align-items-center flex-column justify-content-center">
              {/* <img  src={require("../assets/images/logo-fmm2.png")} style={{marginBottom:10}}/> */}
              <img src={require("../assets/loginUser.png")} className="mb-2"/> 
            <h3 style={{color:"#808B96"}}>Connexion</h3>
            
              
           
              {err_login &&<Alert  err_msg={err_login} open={show} close={()=>setShow(false)}  />}
       
            
              
            </div>

            <div className="app-login-form">
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={addUser}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("E-mail non valide!")
                    .required("Ce champ est obligatoire (*)"),
                  password: Yup.string()
                    .min(
                      8,
                      "Nbr de charactères doit ètre supérieur ou égale à 8"
                    )
                    .required("Ce champ est obligatoire (*)")
                })}>
             { ({
                  /** props given by formik */
                  handleChange,
                  handleSubmit,
                  handleReset,
                  handleBlur,
                  errors,
                  touched
                }) => (
                  <form>
                    <fieldset>
                      <TextField
                        
                        error={errors.email && touched.email}
                        helperText={
                          errors.email && touched.email ? errors.email : ""
                        }
                        fullWidth
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                        onBlur={handleBlur}
                        margin="normal"
                        InputProps={{
                          startAdornment:(
                            <InputAdornment position="start">
                              <MailIcon htmlColor="#808B96"/>
                            </InputAdornment>
                          ),
                          }}

                        
                      />
                      <TextField
                        error={errors.password && touched.password}
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : ""
                        }
                        type="password"
                        
                        fullWidth
                        
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                        onBlur={handleBlur}
                        onKeyPress={e => (e.which === 13 ? handleSubmit() : "")}
                        margin="normal"
                        InputProps={{
                        startAdornment:(
                          <InputAdornment position="start">
                            <LockIcon htmlColor="#808B96" />
                          </InputAdornment>
                        ),
                        }}
                      />

                      <div className="my-2 d-flex align-items-center justify-content-between">
                        <Button
                          onClick={handleSubmit}
                          variant="contained"
                          color="primary"
                        >
                          Login
                        </Button>
                        <Link to="/signUp">S'inscrire</Link>
                        
                      </div>
                      <div className="app-social-block  my-1 my-sm-3">
                      <Link to="/getAccount">Mot de passe oublié?</Link>
                      {/* <GoogleLogin
                          clientId="803407684262-2jbbkb9k8sj2fihfgbmkce4klklo9aqd.apps.googleusercontent.com"
                          buttonText="Se connecter avec Google+"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          className="google-btn "
                          isSignedIn={true}
                          pluginName="E-Learning academy"
                          scope="email profile openid"
                        /> */}
                      </div>
                      <div className="app-social-block  d-none my-1 my-sm-3">
                        <ul className="social-link">
                          <li>
                            <IconButton
                              className="icon"
                              onClick={() => {
                                //props.showAuthLoader();
                                //props.userTwitterSignIn();
                                //props.oauthMicrosoft();
                              }}
                            >
                              <i className="zmdi zmdi-twitter" />
                            </IconButton>
                          </li>

                          <li>
                            <IconButton
                              className="icon"
                              onClick={() => {
                              //  props.showAuthLoader();
                                responseGoogle();
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
                                //props.userGithubSignIn();
                              }}
                            >
                              <i className="zmdi zmdi-github" />
                            </IconButton>
                          </li>
                        </ul>
                      </div>
                    </fieldset>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        {/* {props.loader && (
          <div className="loader-view">
            <CircularProgress size="20" />
          </div>
        )} */}
        {/* {visible && NotificationManager.error(error_Msg)}
        <NotificationContainer /> */}
      </div>

      
      

 
     
    );
  }

const mapStateToProps = ({ authReducer, emailReducer }) => {
  return {
    error_Msg: authReducer.error,
    user: authReducer.profile,
   // isAuth: authReducer.isAuth,
    loader: authReducer.inAuth
    // emailSent: emailReducer.emailSent
  };
};

const Login = connect(mapStateToProps, {
  login,
  onLodingSignIn,
  Dispatch_unlockUser_State,
  // oauthFacebook,
   oauthGoogle,
  // sendCodeByEmail,
 // oauthMicrosoft,
  getUserToVerify,
  getUserByEmail
})(LoginComponent);

export default Login;
