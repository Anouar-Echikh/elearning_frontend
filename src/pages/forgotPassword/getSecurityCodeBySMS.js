import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
  FormFeedback,
  CardFooter,
  CardHeader
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import SimpleCrypto from "simple-crypto-js";
import { withRouter } from "react-router-dom";
import { unlockUser, getUserProfile,login, Dispatch_unlockUser_State } from "../../redux/actions/authActions";
import { sendCodeBySMS } from "../../redux/actions/smsActions";
import { getUserByEmail } from "../../redux/actions/usersActions";

import userImg from "../../assets/images/avatar.png";
import ForgotPasswordModal from "./ModalForgotPassword";

class LockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      show: false,
      phoneNumber: "",
      email: "",
      code: ""
    };
  }
  onDismiss = () => {
    this.setState({ visible: false });
    this.setState({ show: false });
  };
  //function to decrypt request
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
    var data = decrypted_req.split(" ");

    return data;
  };

  NextStep = async value => {
    
    // get type of operation : verify account or change password
    const verifyUser=  localStorage.getItem("Uis$");
    
   //get crypted codeSecurity from localStorage
    let code = localStorage.getItem("ZuL8_i");
    //decrypt request data
    let decrypted_code = this.decrypt_code(code);
    console.log("decryptedCode:" + decrypted_code);
    const arrData = this.getDataFromRequest(decrypted_code);
    //get code entred by user
    this.setState({ code: arrData[0] });
    let entredCode = value.code;
    console.log("entredCode:" + entredCode);
    //compare each to other
    if (arrData[0] === entredCode  ) {
  // if verifyuser:true (user account is verified) then re-login to get token from backend  and finally redirect user to home page
      if(verifyUser==="true"){
        const {userToVerif}=this.props
        //set "verifiedUser to true" in order to be not blocked in backend
        const user={email:userToVerif.email,password:userToVerif.password,verifiedUser:true}
        // re-login without block
       await this.props.login(user)
     
     if(this.props.isAuth){
     //UNLOCK USER : because user is locked by default in state
    this.props.Dispatch_unlockUser_State();
    //set Uis$ to false (as default value in localStorage) in order to let system redirect user to change password page in the case that user want to retrive or change his password 
    localStorage.setItem("Uis$", false);
    //redirect user to home page
     this.props.history.push("/")
     }
    }else{
      // if the operation is just to change password (default operation) 
      this.props.history.push("/changePassword");
    }
    } else {
      
      this.setState({ show: true });
      this.setState({ visible: true });}
    
  };

  displayAlertMsg = () => {
    return (
      <Alert
        color="danger"
        isOpen={this.state.visible}
        toggle={this.onDismiss}
        fade={true}
        className="my-2"
      >
        Code incorrecte !
      </Alert>
    );
  };

  contactAdmin = () => {
    this.props.history.push("/contactAdmin");
  };

  btnCancel = () => {
    localStorage.removeItem("ZuL8_i");
    localStorage.removeItem("email");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="app flex-row align-items-center lock_Background">
        <Container>
          <Row className="justify-content-center ">
            <Col md="5">
              <CardGroup>
                <Card className="py-0">
                  <CardHeader className="pb-1">
                    <h5> Entrer le code de sécurité</h5>
                  </CardHeader>
                  <CardBody>
                    <Formik
                      initialValues={{
                        code: ""
                      }}
                      onSubmit={this.NextStep}
                      validationSchema={Yup.object().shape({
                        code: Yup.string()
                          .min(6, "Le code doit ètre composé de 6 charactères!")
                          .required("Ce champ est obligatoire (*)")
                      })}
                      render={({
                        /** props given by formik */
                        handleChange,
                        handleSubmit,
                        handleReset,
                        handleBlur,
                        errors,
                        touched
                      }) => (
                        <div>
                          <div>
                            Nous avons envoyé un code à :{" "}
                            <strong>{this.props.foundUser.phoneNumber}</strong>
                            <br />
                            Merci de vérifier que vous avez reçu un SMS avec
                            votre code. Celui-ci est composé de 6 chiffres.
                          </div>
                          {this.state.show ? this.displayAlertMsg() : null}
                          <InputGroup className="">
                            <Input
                              invalid={errors.code && touched.code}
                              type="text"
                              name="code"
                              id="code"
                              placeholder="Enter le code .."
                              onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                              onBlur={handleBlur}
                            />
                            {errors.code && touched.code ? (
                              <FormFeedback className="feedBack">
                                {errors.code}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                          <Row>
                            <Col>
                              <Button
                                color="link"
                                style={{ textDecorationLine: " none" }}
                                className="px-0 mb-2 ml-1 pb-0"
                                onClick={this.contactAdmin}
                              >
                                Je n'ai pas mon téléphone
                              </Button>{" "}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-flex justify-content-end  ">
                              <Button
                                color="info"
                                className="mr-1 card-btn"
                                onClick={handleSubmit}
                              >
                                Suivant
                              </Button>{" "}
                              <Button
                                color="secondary"
                                className=" card-btn"
                                onClick={this.btnCancel}
                              >
                                Annuller
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      )}
                    />
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
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
    error_email: emailReducer.error,
    foundUser: usersReducer.user,
    error_user: usersReducer.error,
    userToVerif:usersReducer.verifUser,
  };
};

const Lock = withRouter(
  connect(
    mapStateToProps,
    { unlockUser, getUserProfile, getUserByEmail, sendCodeBySMS,login,Dispatch_unlockUser_State }
  )(LockComponent)
);

export default Lock;
