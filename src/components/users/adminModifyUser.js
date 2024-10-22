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
import { Select } from 'material-ui-formik-components/Select'
import { connect, useDispatch, useSelector } from "react-redux"
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { patchUser } from "../../redux/actions/usersActions"
import { useSnackbar } from 'notistack';
import AlertModal from "./alertDialog"
import moment from "moment"
import { notificationAppReminder} from "../../redux/actions/notificationActions"
import {getAllOrgs} from "../../redux/actions/organizationsActions"

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

  const [listOrg,setListOrg]=useState([])
  // const list = useSelector(state => state.filesReducer.files)
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()



  const modifyUser = async (user) => {
    let active=""
    let role=""
    if(user.active!=props.item.active){
      active=user.active
    }
    if(user.role!=props.item.role){
      role=user.role
    }

    console.log("userUpdated:",user)
    console.log("uploaded:", uploadedImage || props.item.image)

    const result = await props.patchUser(props.item._id, { ...user, image: uploadedImage || props.item.image })
    console.log("result of saving:", result)
    if (result) {
// if(active!=""){
// if(active=="active")
//   createNotification ("Activation du compte")
//   else createNotification ("Désactivation du compte")
// }
// if(role!=""){
// if(role=="Administrateur")
//    createNotification ("Changement du rôle vers (Administrateur)")
//   else if(role=="Super-Utilisateur")  createNotification ("Changement du rôle vers (Super-Utilisateur)")
//   else  createNotification ("Changement du rôle vers (Utilisateur)")
// }
      enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
      dispatch({ type: "CLEAR_STATE_ONE_FILE" })
      //close modal
      props.close()

    } else {
      enqueueSnackbar('Modification non effectuée !', { variant: 'error' });

    }



  }

//  Notification //
const createNotification=async (operation)=>{
  let app1={};
  
   app1= { note: { subject: "Platforme Etudiant - Notification",text:`Un compte utilisateur a été modifié`,admin:props.currentUser.name,level:"user",startDate:"",endDate:"",operation:operation,userName: props.item&&props.item.name,
   userEmail: props.item.local && props.item.local.email},date:2000, important: true, type: "notif-user", level: "", adminEmail: props.currentUser.email }

  console.log("app:", app1)
 
  await props.notificationAppReminder({ app:app1 })
}


const getListRoles=(role)=>{
switch (role) {
  case "superAdmin":
  return [
    { value: "superAdmin", label: 'Super-Admin' },
    
    { value: "orgAdmin", label: 'Admin-Etablissement' },
    
  ];
  case "professor":
    return []
    case "depAdmin":
    return [
     { value: "professor", label: 'Professeur' },
     { value: "user", label: 'Utilisateur' },
    ]
    case "orgAdmin":
      return  [
       
        { value: "depAdmin", label: 'Admin-Département' },
        { value: "orgAdmin", label: 'Admin-Etablissement' },
        { value: "professor", label: 'Professeur' },
        { value: "user", label: 'Utilisateur' },
      ]
default: return []
}

}

const getListOrg = async () => {
    
  //setLoading(true)

  try {
    
    const Items = await props.getAllOrgs()
    console.log("allItemsOrg:", Items)
    setListOrg(Items)
    //setLoading(false)
  }
  catch (e) {
    console.log(e)
  }
}


useEffect(()=>{
  getListOrg()
},[])



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
                email: props.item.local && props.item.local.email,
                phone: props.item.phone,
                role: props.item.role,
                organization:props.item.organization,
                active: props.item.active

              }}
              onSubmit={modifyUser}
              validationSchema={Yup.object().shape({

                name: Yup.string().required("Ce champ est obligatoire (*)"),
               // phone: Yup.string().required("Ce champ est obligatoire (*)"),
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
                          disabled={true}
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
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12" sm="12" lg="12">

                        <Field

                          name="role"
                          component={RadioGroup}
                          label="Role"

                         
                          options={getListRoles(props.currentUser.role)}
                           
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
 <Field
                                component={Select}
                                name="organization"
                                variant="outlined"
                                label="Etablissement"
                                options={listOrg.map((el, index) => ({ value: el._id, label: el.name }))}
                                error={errors.organization && touched.organization}
                                helperText={
                                  errors.organization && touched.organization ? errors.organization : null
                                }
                              />
                      </Col>
                      <Col xs="12" sm="12" lg="12">
                        <div className="mt-3 px-0 mx-0" style={{ height: "inherit" }}>
                          {uploadedImage == null && props.item.image == null ? <h2>No image!</h2> :
                            <img src={uploadedImage != null ? uploadedImage.idFile : props.item.image.idFile} style={{ borderRadius: "50%", width: 200, height: 200, marginBottom: 10 }} />
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

const mapStateToProps = ({ authReducer,authStudentReducer }) => {
  return {
    currentUser: authReducer.profile,
   
    isAuth: authReducer.isAuth,
    
  };
};

export default connect(mapStateToProps, { patchUser,notificationAppReminder,getAllOrgs })(ModifyUser);