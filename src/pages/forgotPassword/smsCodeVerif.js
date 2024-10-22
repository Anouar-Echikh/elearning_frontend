import React, { Component } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";
import { connect } from "react-redux";
import SimpleCrypto from "simple-crypto-js";
import { withRouter } from "react-router-dom";
import { unlockUser, getUserProfile } from "../../redux/actions/authActions";
import { getUserByEmail } from "../../redux/actions/usersActions";
import { sendCodeByEmail } from "../../redux/actions/emailActions";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import Alert from"../alert"

import userImg from "../../assets/images/avatar.png";


class GetAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      show: false,
      email: "",
      showUser: false,
      isActive: false,
      phoneNumber: ""
    };
  }
  onDismiss = () => {
    this.setState({ visible: false });
    this.setState({ show: false });
  };

  /** Get user account */
  getUserAccount = async val => {
    const a = await this.props.getUserByEmail(val.email);

    if (this.props.error_user) {
      this.setState({ show: true });
      this.setState({ visible: true });
    }
    if (!this.props.error_user && this.props.foundUser) {
      this.setState({
        email: this.props.foundUser.local.email,
        showUser: true,
        phoneNumber: 23342961 // this.props.user.tel
      });
    }
  };

  /** Alert messages returned from backend */
  displayAlertMsg = () => {
    const { error_user } = this.props;
    if (error_user) {
   return <Alert visible={this.state.visible} error_Msg={error_user} onDismiss={this.onDismiss} />
    }
  };
  

  /**Display User */
  displayUserAcount = () => {
    const { foundUser } = this.props;
    if (foundUser) {
      return (
        <div className=" mb-2 d-flex  flex-column">
          <p> Est ce que ce compte est pour vous ?</p>
          <div className=" mb-2 d-flex align-items-center  ">
            <img
              src={
                this.props.foundUser.img ? this.props.foundUser.img : userImg
              }
              width="60px"
              height="60px"
              className="my-2 mr-2  "
            />
            <div>
              <h6 className=" my-0  ">{this.props.foundUser.name}</h6>
              <p className=" my-0">{this.props.foundUser.local.email}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  //function to generate random string as "code security"
  generate_random_string = string_length => {
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
  encrypt_code = text => {
    var _secretKey = "Yu_iLWq8c00vA";

    var simpleCrypto = new SimpleCrypto(_secretKey);

    var encrypted_Text = simpleCrypto.encrypt(text);
    return encrypted_Text;
  };

  btnYes = async () => {
    const { sendCodeByEmail } = this.props;
    const code = this.generate_random_string(6);
    console.log("code:");
    console.log(code);

    var email = {
      from: "RB_CMS@gmail.com",
      to:
        this.props.user.method === "facebook"
          ? this.props.user.facebook.email
          : this.props.user.method === "google"
          ? this.props.user.google.email
          : "fulljs.developer@gmail.com",
      subject: "Code sécurité RB_CMS",
      html: ` <span>Votre code sécurité est:&nbsp;<strong>${code}</strong></span>`
    };
    const val = await sendCodeByEmail(email);

    if (this.props.emailSent) {
      const text = `${code} `;

      const encrypted_code = this.encrypt_code(text);
      localStorage.setItem("ZuL8_i", encrypted_code);
      localStorage.setItem(" email", this.state.email);
      localStorage.setItem(" Uis$", false);
      //this.props.history.push(`/getSecurityCodeByEmail?data=${encrypted_req}`); ///${encrypted_req}`);
      this.props.history.replace(`/getSecurityCodeByEmail`); ///${encrypted_req}`);
    } else {
      alert(this.props.error_email);
      /*** Solution : use localstorage or db */
    }
  };

  btnCancel = () => {
    const { showUser } = this.state;
    if (showUser) {
      //set showUser to false to allow  user to re-enter another e-mail
      this.setState({ showUser: false });
    } else {
      //if the user press Annuller btn
      this.props.history.push("/login");
      localStorage.removeItem("ZuL8_i");
      localStorage.removeItem("email");
    }
  };

  render() {
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="app-login-main-content">
        <div className="app-logo-content d-flex align-items-center justify-content-center">
          <Link className="" to="/" title="OCA">
            <img
              src={require("../../assets/images/logo.png")}
              alt="FMM-Platforme Etudiant"
              title="FMM-Platforme Etudiant"
            />
          </Link>
        </div>

        <div  className="app-login-content d-flex flex-column justify-content-center">
          <div className="app-login-header mb-0 pb-0  d-flex align-items-center flex-column justify-content-center">
            <img  src={require("../../assets/images/logo-fmm2.png")} style={{marginBottom:10}}/>
            {/* <img src={require("../assets/images/loginUser.png")} style={{marginBottom:10}}/> */}
           
          
            <div className="my-2">
            <span className="my-1" style={{backgroundColor:"#B8B6B5",borderRadius:40, fontSize:14, paddingLeft:15,paddingRight:15 ,color:"white"}}>Step 1</span> 
              {this.state.show ? this.displayAlertMsg() : null}
            </div>
            
          </div>

          <div className="app-login-form">
         
          <h5>Retrouvez votre compte:</h5> 
          <Formik
              enableReinitialize={true}
              initialValues={{codeTel:""}}
              onSubmit={sendTelCode}
              validationSchema={Yup.object().shape({
              codeTel: Yup.number().equals([randomCodeTel],"Code incorrect!").required("Ce champ est obligatoire (*)"),
              })}
              render={({
                /** props given by formik */
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
                      <span>Nous venons d'envoyer un code de validation par Tél au <b>{"23 342 961"}</b></span>
                      <br/>
                        <Field
                          component={TextField}
                          id="codeTel"
                          name="codeTel"
                          label="Code de validation N° tél"
                          placeholder="Insérer le code"
                          margin="normal"
                          variant="outlined"
                          type="number"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.codeTel && touched.codeTel}
                          helperText={
                            errors.codeTel && touched.codeTel ? errors.codeTel : null
                          }
                        />
                        <span><b>Si vous n'avez pas reçu le code, cliquez ici  </b> <Button variant="outlined" color="secondary" size="small" onClick={()=>resendTelCode()}>Re-envoyer</Button></span>
                      <br/>
                      </Col>
           
              <Col xs="12" sm="12" lg="12">

               <div className="mt-3">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    size="small"
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    //onClick={() => handleNext(2)}
                    onClick={handleSubmit}
                    className={classes.button}
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
        </div>
      </div>
      {this.props.loader && (
        <div className="loader-view">
          <CircularProgress size="20" />
        </div>
      )}
      {/* {visible && NotificationManager.error(error_Msg)}
      <NotificationContainer /> */}
    </div>
        
      
    );
  }
}

const mapStateToProps = ({ authReducer, emailReducer, usersReducer }) => {
  return {
    error_Msg: authReducer.error,
    user: authReducer.profile,
    isAuth: authReducer.isAuth,
    isLocked: authReducer.isLocked,
    emailSent: emailReducer.emailSent,
    emailIsSending: emailReducer.emailIsSending,
    error_email: emailReducer.error,
    foundUser: usersReducer.user,
    error_user: usersReducer.error,
    loader: authReducer.inAuth
  };
};

const GetAccount = withRouter(
  connect(
    mapStateToProps,
    { unlockUser, getUserProfile, getUserByEmail, sendCodeByEmail }
  )(GetAccountComponent)
);

export default GetAccount;
