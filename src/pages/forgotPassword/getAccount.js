import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";
import { connect,useSelector } from "react-redux";
import SimpleCrypto from "simple-crypto-js";

import { unlockUser, getUserProfile } from "../../redux/actions/authActions";
import { getUserByEmail,getUserByCINPass,patchUser } from "../../redux/actions/usersActions";
//import { sendCodeByEmail } from "../../../redux/actions/emailActions";
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import Alert from"../alert"
import {apiTelVerificationCode,apiEmailVerificationCode} from "../../api/apiCodeVerification"

//import userImg from "../../assets/avatar.png";
//import { AUTH_SUCCESS } from "../../../../../voixEtParole/voix-paroles_admin/frontend/src/redux/types/authTypes";


const GetAccountComponent =(props)=> {
  
  const error_user = useSelector(state => state.usersReducer.error) 
  const foundUser= useSelector(state => state.usersReducer.user)

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

  /** Get user account */
  const getUserAccount = async val => {
    const a = await props.getUserByEmail(val.email);

    if (error_user) {
      setShow (true) 
      setVisible( true );
    }
    if (!error_user && foundUser) {
    
        setEmail( foundUser.local.email)
        setShowUser(true)
        setPhoneNumber (23342961) // props.user.tel

    }
  };

  /** Alert messages returned from backend */
  const displayAlertMsg = () => {
    //const { error_user } = props;
  //   if (error_user) {
     
  //  return <Alert visible={visible} error_Msg={error_user} onDismiss={onDismiss} />
  //   }
  };
  

  /**Display User */
//  const  displayUserAcount = () => {
//     //const { foundUser } = props;
//     if (foundUser) {
//       return (
//         <div className=" mb-2 d-flex  flex-column">
//           <p> Ce compte est-il pour vous ?</p>
//           <div className=" mb-2 d-flex align-items-center  ">
//             <img
//               src={
//                 props.foundUser.img ? props.foundUser.img : userImg
//               }
//               width="60px"
//               height="60px"
//               className="my-2 "
//             />
//             <div>
//               <h6 className=" my-0  ">{props.foundUser.name}</h6>
//               <p className=" my-0">{props.foundUser.local.email}</p>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   };

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

  //function to encrypt string code
  const encrypt_code = text => {
    var _secretKey = "Yu_iLWq8c00vA";

    var simpleCrypto = new SimpleCrypto(_secretKey);

    var encrypted_Text = simpleCrypto.encrypt(text);
    return encrypted_Text;
  };

  const btnYes = async () => {
    const { sendCodeByEmail } = props;
    const code = generate_random_string(6);
    console.log("code:");
    console.log(code);

    var email = {
      from: "RB_CMS@gmail.com",
      to:
        props.user.method === "facebook"
          ? props.user.facebook.email
          : props.user.method === "google"
          ? props.user.google.email
          : "fulljs.developer@gmail.com",
      subject: "Code sécurité RB_CMS",
      html: ` <span>Votre code sécurité est:&nbsp;<strong>${code}</strong></span>`
    };
    const val = await sendCodeByEmail(email);

    if (props.emailSent) {
      const text = `${code} `;

      const encrypted_code = encrypt_code(text);
      localStorage.setItem("ZuL8_i", encrypted_code);
      localStorage.setItem(" email", email);
      localStorage.setItem(" Uis$", false);
      //navigate(`/getSecurityCodeByEmail?data=${encrypted_req}`); ///${encrypted_req}`);
      navigate(`/getSecurityCodeByEmail`,{ replace: true }); ///${encrypted_req}`);
    } else {
      alert(props.error_email);
      /*** Solution : use localstorage or db */
    }
  };

  const btnCancel = () => {
    
    if (showUser) {
      //set showUser to false to allow  user to re-enter another e-mail
      setShowUser( false);
    } else {
      //if the user press Annuller btn
      navigate("/login");
      localStorage.removeItem("ZuL8_i");
      localStorage.removeItem("email");
    }
  };

  const searchUser=async({email})=>{
    const { getUserByEmail } = props;
    setLoading(true)
  console.log("email:",email)
  const account=await getUserByEmail(email)
  console.log("errorUser:",error_user)
 
  if(error_user){
    setLoading(false)
    setShow( true);
      setVisible(true);
  }

  if(account){
    setEmail(account.local.email)
    setUserId(account._id)
  let bool2= await sendCodeByEmail(account.local.email,account._id)
  console.log("success:",bool2)
   if(bool2){ navigate(`/getSecurityCodeByEmail`,{ replace: true })}; 
  }else{
    setLoading(false)
    setShow( true);
      setVisible(true);
    }
  }


 const getRandomIntBetween=()=> {
    let min = Math.ceil(100000);//min
    let max = Math.floor(999999);//max
    console.log("random:",String( Math.floor(Math.random() * (max - min + 1)) + min))
    return  Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const sendCodeByEmail=async(email,id)=>{
    let randomCode=getRandomIntBetween()
       setRandomCodeEmail(randomCode)
      let stringCode=randomCode.toString()
       let {data}=await apiEmailVerificationCode({codeEmail:stringCode,candidatEmail:email})
       console.log("success:",data.success)
       if(data.success){
        const encrypted_code = encrypt_code(stringCode);
        const encrypted_userId = encrypt_code(id);
        localStorage.setItem("ZuL8_i", encrypted_code);
        localStorage.setItem("WiL9d_i", encrypted_userId);
        localStorage.setItem("email", email);
        localStorage.setItem("Uis$", false);
        return true
       }else{
         alert("Error sending code!!")
       }
  }

 
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
            <span className="my-2" style={{backgroundColor:"#B8B6B5",borderRadius:40, fontSize:14, paddingLeft:15,paddingRight:15 ,color:"white"}}>Step 1</span> 
              
              {error_user &&<Alert  err_msg={error_user} open={show} close={()=>setShow(false)}  />}
            </div>
            
          </div>
          <LoadingOverlay
                    active={loading}
                    spinner={<BeatLoader size={10} color={"#40A4EB"} />}
                    styles={{
                      overlay: base => ({
                        ...base,
                        background: "  rgba(252, 252, 252, 0.61)"
                      })
                      
                    }}
                  >
          <div className="app-login-form">
         
         
            <Formik
              initialValues={{ email: "" }}
              onSubmit={searchUser}
              validationSchema={Yup.object().shape({
                
                email: Yup.string()
                .email("E-mail non valide!")
                .required("Ce champ est obligatoire (*)"),
                
              })}
              render={({
                // props given by formik 
                handleChange,
                handleSubmit,
                handleReset,
                handleBlur,
                errors,
                touched
              }) => (
                <form>
                  <fieldset>
                   
                      <Field
                          component={TextField}
                          id="email"
                          name="email"
                          label="Entrez votre E-mail (utilisé dans Login)"
                          placeholder="email "
                          style={{ marginLeft: 0,
                            marginRight: 0}}
                          margin="dense"
                          variant="outlined"

                          fullWidth

                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.email && touched.email}

                          helperText={
                            errors.email && touched.email ? errors.email : null
                          }
                        />
                   

                    <div className="my-2 d-flex align-items-center justify-content-between">
                    <Button
                    
                    onClick={()=>navigate("/login")}
                            
                  >
                    Précédent
                  </Button>
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        margin="dense"
                      >
                        Suivant
                      </Button>
                     
                     
                      
                      
                    </div>
                   
                   
                  </fieldset>
                </form>
              )}
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
    //error_Msg: authReducer.error,
    //user: authReducer.profile,
    isAuth: authReducer.isAuth,
    isLocked: authReducer.isLocked,
    
    //foundUser: usersReducer.user,
    //error_user: usersReducer.error,
    loader: authReducer.inAuth,
    userIsFetching:usersReducer.userIsFetching
  };
};

const GetAccount = 
  connect(
    mapStateToProps,
    { unlockUser, getUserProfile, getUserByEmail,getUserByCINPass }
  )(GetAccountComponent)


export default GetAccount;
