import React, { Component } from "react";
import { Link,useNavigate } from "react-router-dom";
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
import { unlockUser, getUserProfile } from "../redux/actions/authActions";
import {
  updateUserPwd,
  getUserByEmail
} from "../../redux/actions/usersActions";

//import userImg from "../../../assets/img/user.png";
//import ForgotPasswordModal from "./ModalForgotPassword";

const LockComponent =()=> {
  

  const [visible, setVisible] = useState(true)
  const [show, setShow] = useState(false)
  const [updated, setUpdated] = useState(false)
      
  const navigate = useNavigate();

  const onDismiss = () => {
    setVisible(false);
    setShow(false);
  };

  const ChangePassword = val => {
    const password = val.password;
    const id = props.foundUser._id;
    const data = {
      password,
      id
    };
    const success = props.updateUserPwd(data);
    if (success) {
      setUpdated(true);
    }
  };

 const btnCancel = () => {
    localStorage.removeItem("ZuL8_i");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const displayAlertMsg = () => {
    return (
      <Alert
        color="success"
        isOpen={visible}
        fade={true}
        className="my-2 p-2"
      >
        <center> Votre mot de passe a été mis à jour avec succée!</center>
      </Alert>
    );
  };

  
    return (
      <div className="app flex-row align-items-center lock_Background">
        <Container>
          <Row className="justify-content-center ">
            <Col md="5">
              <CardGroup>
                <Card className="py-0">
                  <CardHeader className="pb-1">
                    <h5>Re-initialisez votre mot de passe</h5>
                  </CardHeader>
                  <CardBody>
                    <Formik
                      initialValues={{
                        password: "",
                        passwordConfirm: ""
                      }}
                      onSubmit={ChangePassword}
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
                        handleReset,
                        handleBlur,
                        errors,
                        touched
                      }) => (
                        <div>
                          <div className="text-black">
                            {updated
                              ? ""
                              : "Re-initialisez votre mot de passe :"}
                          </div>
                          {updated ? displayAlertMsg() : null}
                          <div className={updated ? "d-none" : ""}>
                            <InputGroup className="my-2">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                // valid={!errors.password && touched.password}
                                invalid={errors.password && touched.password}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="mot de passe"
                                onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                                onBlur={handleBlur}
                              />
                              {errors.password && touched.password ? (
                                <FormFeedback className="feedBack">
                                  {errors.password}
                                </FormFeedback>
                              ) : null}
                            </InputGroup>
                            <InputGroup className="mb-2">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                //valid={!errors.passwordConfirm &&touched.passwordConfirm  }
                                invalid={
                                  errors.passwordConfirm &&
                                  touched.passwordConfirm
                                }
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                placeholder="confirmer mot de passe"
                                onChange={handleChange} //send onChangeValue to formik props "handleChange" :: Note :: in react native we can't use this props, we should use  "setFieldValues"  onChange={(e)=>setFieldValues("email")}
                                onBlur={handleBlur}
                              />
                              {errors.passwordConfirm &&
                              touched.passwordConfirm ? (
                                <FormFeedback className="feedBack">
                                  {errors.passwordConfirm}
                                </FormFeedback>
                              ) : null}
                            </InputGroup>
                          </div>
                          <Row>
                            <Col className="d-flex justify-content-end   ">
                              <Button
                                color="info"
                                className={
                                  updated
                                    ? "d-none"
                                    : "mr-1 card-btn"
                                }
                                onClick={handleSubmit}
                              >
                                Valider
                              </Button>{" "}
                              <Button
                                color="secondary"
                                className=" card-btn"
                                onClick={btnCancel}
                              >
                                {updated ? "Terminer" : "Annuller"}
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

const mapStateToProps = ({ authReducer, emailReducer, usersReducer }) => {
  return {
    error_Msg: authReducer.error,
    user: authReducer.profile,
    isAuth: authReducer.isAuth,
    isLocked: authReducer.isLocked,
    emailSent: emailReducer.emailSent,
    error_email: emailReducer.error,
    foundUser: usersReducer.user,
    error_user: usersReducer.error
  };
};

const Lock = connect(
  mapStateToProps,
  { unlockUser, getUserProfile, updateUserPwd, getUserByEmail }
)(LockComponent);

export default Lock;
