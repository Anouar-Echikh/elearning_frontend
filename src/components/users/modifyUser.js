import React, { useState, useEffect, useRef } from "react"
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { KeyboardTimePicker } from 'material-ui-formik-components/KeyboardTimePicker'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import * as Yup from "yup";
//import TextField from "@material-ui/core/TextField";
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import OneFileUploader from "./oneFileUploder"

import { connect, useDispatch, useSelector } from "react-redux"
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { patchUser } from "../../redux/actions/usersActions"
import { useSnackbar } from 'notistack';
import AlertModal from "./alertDialog"
import moment from "moment"

const classes = {
  root: {
    width: "90%"
  },
  textField: {
    marginLeft: 0,
    marginRight: 0
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 1,
    marginRight: 1
  },
  actionsContainer: {
    marginBottom: 10
  },
  resetContainer: {
    padding: 20
  },
  placeholder: {
    height: 30
  }
};

const ModifyUser = (props) => {

  //const [list,setList]=useState([])
  // const list = useSelector(state => state.filesReducer.files)
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()



  const modifyUser = async (user) => {

    console.log("uploaded:", uploadedImage || props.item.image)

    const result = await props.patchUser(props.item._id, { ...user, image: uploadedImage || props.item.image })
    console.log("result of saving:", result)
    if (result) {


      enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
      dispatch({ type: "CLEAR_STATE_ONE_FILE" })
      //close modal
      props.close()

    } else {
      enqueueSnackbar('Modification non effectuée !', { variant: 'error' });

    }



  }

  const deleteAccount=()=>{
    console.log("Delete Account button!")
  }

  return (


    <div className="animated slideInUpTiny animation-duration-3">
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card-header mb-2 d-flex align-items-center">

          </div>

          <div className="jr-card d-print-none">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: props.item.name,
                email: props.item.microsoft && props.item.microsoft.email,
                phone: props.item.phone,
               }}
              onSubmit={modifyUser}
              validationSchema={Yup.object().shape({

                name: Yup.string().required("Ce champ est obligatoire (*)"),
                phone: Yup.string().required("Ce champ est obligatoire (*)"),
                // email: Yup.string()
                //   .email("E-mail non valide!")
                //   .required("Ce champ est obligatoire (*)"),
              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched
              }) => (
                <Form>
                  <div style={{ maxWidth: 500 }} className='mx-auto'>
                    <div className=" mb-2 d-flex justify-content-center">
                      <h1>Paramètres</h1>
                    </div>
                    <hr  className="hr-text" data-content="Informations générales" />
                    <Row>
                      <Col xs="12" sm="12" lg="12">
                        <div className="d-flex justify-content-center">

                        </div>
                      </Col>
                     
                      <Col xs="12" sm="12" lg="12">

                        <Field
                          component={TextField}
                          id="name"
                          name="name"
                          label="Nom d'utilisateur"
                          placeholder="Nom d'utilisateur"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.name && touched.name}
                          helperText={
                            errors.name && touched.name ? errors.name : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col mt-2 xs="12" sm="12" lg="12">
                        <Field
                          component={TextField}
                          id="email"
                          name="email"
                          label="Email"
                          placeholder="Email"
                          className={classes.textField}
disabled={true}

                          margin="normal"
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
                      </Col>
                    </Row>
                    <Row>
                      <Col mt-2 xs="12" sm="12" lg="12">
                        <Field
                          component={TextField}
                          id="phone"
                          name="phone"
                          label="Tél"
                          placeholder="Tél"
                          className={classes.textField}


                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.phone && touched.phone}
                          helperText={
                            errors.phone && touched.phone ? errors.phone : null
                          }
                        />
                      </Col>
                    </Row>

                    <Row>
                      
                      <Col xs="12" sm="12" lg="12">
                        <div className="mt-3 px-0 mx-0" style={{ height: "inherit" }}>
                        {uploadedImage==null && props.item.image==null ? <h2>No image!</h2>:
                          <img src={ uploadedImage!=null?uploadedImage.idFile:props.item.image.idFile}  style={{borderRadius:"50%",width:200,height:200,marginBottom:10}}/>
                          }

                          <h5>Modifier l'image  : </h5>
                          <OneFileUploader maxNumberOfFiles={1} />
                        </div>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center ">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-2 mr-2"
                        size="medium"
                        onClick={handleSubmit}
                        disabled={false}
                      >
                        Enregistrer
                          </Button>
                      {/* <div className={classes.placeholder}>
                            <Fade
                              in={this.props.saleIsSaving}
                              style={{
                                transitionDelay: this.props.saleIsSaving
                                  ? "600ms"
                                  : "0ms",
                                marginTop: 9,
                                marginLeft: 10
                              }}
                              unmountOnExit
                            >
                              <CircularProgress size={28} value={100} />
                            </Fade>
                          </div> */}

                    </Row>
                    <hr style={{marginTop:30}} className="hr-text" data-content="Supression du compte" />
                    <Row className="d-flex justify-content-center flex-column  rounded border mx-2 p-2" style={{marginTop:30}}>
                      <h3 style={{marginTop:20,marginBottom:30}}>Supprimer mon compte définitivement:</h3>
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        className="mt-2 mr-2"
                        size="medium"
                        onClick={deleteAccount}
                        disabled={false}
                      >
                        Supprimer mon compte
                          </Button>
                      

                    </Row>
                  </div>
                  
                </Form>
              )}
            />

          </div>

        </div>
      </div>
    </div>

  )

}
const mapStateToProps = ({ authReducer }) => {
  return {
    profile: authReducer.profile,
    isAuth: authReducer.isAuth
  };
};

export default connect(mapStateToProps, { patchUser })(ModifyUser);