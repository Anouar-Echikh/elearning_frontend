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
import { unlockUser, getUserProfile } from "../../redux/actions/authActions";
//import userImg from "../../../assets/img/user.png";
//import ForgotPasswordModal from "./ModalForgotPassword";

class LockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      show: false
    };
  }
  onDismiss = () => {
    this.setState({ visible: false });
    this.setState({ show: false });
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
                    <h5> Contactez l'administrateur</h5>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <div>
                        Désolé, pour des raisons de sécurité, veuillez contacter
                        directement l'administrateur de l'application
                      </div>

                      <Row>
                        <Col className="d-flex justify-content-end  ">
                          <Button
                            color="secondary"
                            className=" card-btn"
                            onClick={this.btnCancel}
                          >
                            Terminer
                          </Button>
                        </Col>
                      </Row>
                    </div>
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
const mapStateToProps = ({ authReducer }) => {
  return {
    error_Msg: authReducer.error,
    user: authReducer.profile,
    isAuth: authReducer.isAuth,
    isLocked: authReducer.isLocked
  };
};

const Lock = connect(
  mapStateToProps,
  { unlockUser, getUserProfile }
)(LockComponent);

export default Lock;
