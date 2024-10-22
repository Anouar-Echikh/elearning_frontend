import React, { useState, useEffect, useRef } from "react"
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { KeyboardTimePicker } from 'material-ui-formik-components/KeyboardTimePicker'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import * as Yup from "yup";
import { Select } from 'material-ui-formik-components/Select'
//import TextField from "@material-ui/core/TextField";
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import OneFileUploader from "./oneFileUploder"

import { connect, useDispatch, useSelector } from "react-redux"
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { patchUser } from "../../../../redux/actions/usersActions"
import { useSnackbar } from 'notistack';
import Container from '@material-ui/core/Container';
//import AlertModal from "../courses/alertDialog"
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

  const levels = [
    "1ère année",
    "2ème année",
    "3ème année",
    "4ème année",
    "5ème année",
  ]


  const modifyUser = async (user) => {

    console.log("uploaded:", uploadedImage || props.item.image)

    const result = await props.patchUser(props.item._id, { ...user, image: uploadedImage || props.item.image })
    console.log("result of saving:", result)
    if (result) {


      enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
      //close modal
     // props.close()

    } else {
      enqueueSnackbar('Modification non effectuée !', { variant: 'error' });

    }



  }


  return (

    <Container>
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
                email:props.item && props.item.local.email,
                phone: props.item.phone,
                level: props.item.level,
                // role: props.item.role,
                // active: props.item.active

              }}
              onSubmit={modifyUser}
              validationSchema={Yup.object().shape({

                name: Yup.string().required("Ce champ est obligatoire (*)"),
                phone: Yup.string().required("Ce champ est obligatoire (*)"),
                level: Yup.string().required("Ce champ est obligatoire (*)"),
                email: Yup.string()
                  .email("E-mail non valide!")
                  .required("Ce champ est obligatoire (*)"),



              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched
              }) => (
                <Form>
                  <div style={{ maxWidth: 850 }} className='mx-auto'>
                    <div className=" mb-2 d-flex justify-content-center">
                      <h1 style={{fontWeight:"bold"}}>Paramètres</h1>
                    </div>
                  <Row>
                  <Col xs="12" sm="12" lg="4" style={{marginBottom:20}}>
                  <div className="mt-3 px-0 mx-0 d-flex flex-column align-items-center justify-content-center" style={{ height: "inherit" }}>
                          {uploadedImage == null && props.item.image == null ? <h4>Pas de photo!</h4> :
                            <img src={uploadedImage != null ? uploadedImage.idFile : props.item.image.idFile} style={{ borderRadius: "50%", width: 200, height: 200, marginBottom: 10 }} />
                          }

                          {/* <h5>Changer l'image   </h5> */}
                          <OneFileUploader maxNumberOfFiles={1} />
                        </div>
                  </Col>
                  <Col xs="12" sm="12" lg="8" style={{ maxWidth: 500 }} className='mx-auto'>
                    <Row >
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
                          disabled={false}
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
                    
                      <Col mt-2 xs="12" sm="12" lg="12">
                        <Field
                          component={TextField}
                          id="phone"
                          name="phone"
                          label="Tél"
                          placeholder="Tél"
                          disabled={false}
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
                         <Field
                                component={Select}
                                name="level"
                                variant="outlined"
                                label="Niveau"
                                options={levels.map((el, index) => ({ value: el, label: el }))}
                                error={errors.level && touched.level}
                                helperText={
                                  errors.level && touched.level ? errors.level : null
                                }
                              />

                      </Col>
                      
                    
                      {/* <Col xs="12" sm="12" lg="12">

                        <Field

                          name="role"
                          component={RadioGroup}
                          label="Role"
                          options={[

                            { value: "Administrateur", label: 'Administrateur' },
                            { value: "Professeur", label: 'Professeur' },
                            { value: "Etudiant", label: 'Etudiant' },

                          ]}
                          groupProps={{ row: false }}
                        />
                      </Col>
                      <Col xs="12" sm="12" lg="12">

                        <Field

                          name="active"
                          component={RadioGroup}
                          label="Activer/Désactiver ce compte :"
                          options={[

                            { value: "active", label: 'Activer' },
                            { value: "inactive", label: 'Désactiver' },

                          ]}
                          groupProps={{ row: false }}
                        />

                      </Col>
                       */}
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
                   
                    </Col>
                    </Row> 
                  </div>
                </Form>
              )}
            />

          </div>

        </div>
      </div>
    </div>
    </Container>
  )

}



export default connect(null, { patchUser })(ModifyUser);