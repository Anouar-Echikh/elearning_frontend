import React, { useState, useEffect, useRef } from "react"
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { KeyboardTimePicker } from 'material-ui-formik-components/KeyboardTimePicker'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import { Select } from 'material-ui-formik-components/Select'
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
import { patchUser, deleteUser } from "../../redux/actions/usersActions"
import { getUserProfile } from "../../redux/actions/authActions"
import { useSnackbar } from 'notistack';
import AlertModal from "./alertDialog"
import DeleteMyAccount from "./deleteMyAccount"
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

  const [render,setRender]=useState(false)
  // const list = useSelector(state => state.filesReducer.files)
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  // const specialities=[
  //   "1ère année",
  //   "2ème année",
  //   "3ème année",
  //   "4ème année",
  //   "5ème année",
  //   ]

  const modifyUser = async (user) => {

    console.log("uploaded:", uploadedImage || props.profile.image)
    console.log("user:", user)

    const result = await props.patchUser(props.profile._id, { ...user,"local.email":user.email, image: uploadedImage || props.profile.image })
    console.log("result of saving:", result)
    if (result) {


      enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
      //close modal
      await props.getUserProfile()
      dispatch({ type: "CLEAR_STATE_ONE_FILE" })
      props.close()

    } else {
      enqueueSnackbar('Modification non effectuée !', { variant: 'error' });
    }
  }

  const deleteAccount = () => {
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
                name: props.profile.name,
                email: props.profile.local && props.profile.local.email,
                phone: props.profile.phone,
                adress: props.profile.adress,
                // status: props.profile.status,
                // speciality:props.profile.speciality
              }}
              onSubmit={modifyUser}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Ce champ est obligatoire (*)"),
                email: Yup.string().email("E-mail non valide!").required("Ce champ est obligatoire (*)"),
               
                phone: Yup.string().required("Ce champ est obligatoire (*)"),
                // speciality: Yup.string().required("Ce champ est obligatoire (*)"),
                // status: Yup.string().required("Ce champ est obligatoire (*)"),
               
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
                    <hr className="hr-text" data-content="Gérer votre compte" />
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
                          label="Nom de l'établissement"
                          placeholder="Nom de l'établissement"
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
                    {/* <Col xs="12" sm="12" lg="12">
                        
                        <Field
                          component={Select}
                          name="speciality"
                          variant="outlined"
                          label="Service"
                          options={specialities.map((el,index)=>({value:el,label:el}))}
                          error={errors.speciality && touched.speciality}
                          helperText={
                          errors.speciality && touched.speciality ? errors.speciality : null
                        }
                       / >
                              
                      
                      
                    </Col> */}
                      <Col mt-2 xs="12" sm="12" lg="12">
                     
                        <Field
                          component={TextField}
                          id="email"
                          name="email"
                          label="Email"
                          placeholder="Email"
                          className={classes.textField}
                          disabled={false}
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
                     
                      
                   
                      {/* <Col xs="12" sm="12" lg="12">

                        <Field

                          name="status"
                          component={RadioGroup}
                          label="Etat civile"
                          options={[

                            { value: "Marié(e)", label: 'Marié(e)' },
                            { value: "Célibataire", label: 'Célibataire' },

                          ]}
                          groupProps={{ row: false }}
                        />
                      </Col> */}
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" lg="12">

                        <Field
                          component={TextField}
                          id="adress"
                          name="adress"
                          label="Adresse"
                          placeholder="Adresse"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.adress && touched.adress}
                          helperText={
                            errors.adress && touched.adress ? errors.adress : null
                          }
                        />
                      </Col>
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
                          {uploadedImage == null && props.profile.image == null ? <h2>No image!</h2> :
                            <img src={uploadedImage != null ? uploadedImage.idFile : props.profile.image.idFile} style={{ borderRadius: "50%", width: 150, height: 150, marginBottom: 10 }} />
                          }

                          <h5>Modifier Logo : </h5>
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
                    {/* <hr style={{ marginTop: 30 }} className="hr-text" data-content="Supression du compte" />
                    <Row className="d-flex justify-content-center flex-column  rounded border mx-2 p-2" style={{ marginTop: 30 }}>
                    <div className="d-flex justify-content-center flex-column align-items-center">
                      <h3 style={{ marginTop: 20, marginBottom: 10 }}>Supprimer mon compte définitivement:</h3>
                      {/* <p style={{ marginTop: 20, marginBottom: 20 }}>NB: Vos dossiers et fichiers sous OneDrive ne seront pas supprimés.</p> */}
                      
                    {/*    <DeleteMyAccount item={props.profile} />
                      </div>


                    </Row> */}
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

export default connect(mapStateToProps, { deleteUser, patchUser,getUserProfile })(ModifyUser);