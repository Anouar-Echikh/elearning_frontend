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
import { patchOneStudent,getStudentByCIValue } from "../../redux/actions/studentActions"
import { getUserProfile } from "../../redux/actions/authActions"
import { useSnackbar } from 'notistack';
import AlertModal from "./alertDialog"
import DeleteMyAccount from "./deleteMyAccount"
import moment from "moment"
import { useHistory,useParams } from "react-router-dom";
import { notificationAppReminder} from "../../redux/actions/notificationActions"


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

const ModifyStudent = (props) => {

  const [student,setStudent]=useState({})
  // const list = useSelector(state => state.filesReducer.files)
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  let {studentId}=useParams()

  const specialities=[
    "1ère année",
    "2ème année",
    "3ème année",
    "4ème année",
    "5ème année",
    ]

  const modifyUser = async (user) => {

    let ciValueIsModified=false;
    let emailIsModified=false;
    let phoneIsModified=false;

    if(student&&student.ciValue!==user.ciValue){
       ciValueIsModified=true;
           }
        if(student&&student.local.email!==user.email){
             emailIsModified=true;
          }
        if(student&&student.phone1!==user.phone1){
               phoneIsModified=true;
           }
    
    const result = await props.patchOneStudent(student&&student._id, { ...user,"local.email":user.email, personalPhoto: uploadedImage&& uploadedImage.idFile || props.profile.personalPhoto })
    console.log("result of saving:", result)
    if (result.success) {
     //console.log("student:",student._id)
      if(ciValueIsModified){
        
         createNotification ("Modification N° CIN/Passport.")
          
        }
        if(emailIsModified){
        
         createNotification ("Modification Email.")
          
        }
        if(phoneIsModified){
        
      createNotification ("Modification N° Tél.")
          
        }
        
      enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
      //close modal
      let student=await props.getStudentByCIValue(user.ciValue)
      setStudent(student)
     // props.close()

    } else {
      if(result.msg){
        enqueueSnackbar(result.msg, { variant: 'error' });
      }else{
      enqueueSnackbar('Modification non effectuée !', { variant: 'error' });
      }
    }
  }

  const deleteAccount = () => {
    console.log("Delete Account button!")
  }

const getStudent=async()=>{
  let student=await props.getStudentByCIValue(studentId)
  console.log("Student:",student)
  setStudent(student)
}


  useEffect(()=>{
    getStudent()
  },[])
  

//  Notification //
const createNotification=async (operation)=>{
  let app1={};
  
   app1= { note: { subject: "Platforme Etudiant - Notification",text:`Un compte étudiant a été modifié`,admin:props.profile.name,level:"user",startDate:"",endDate:"",operation:operation,userName: student&&student.nom+" " +student&&student.prenom,
   userEmail: student.local && student.local.email},date:2000, important: true, type: "notif-user", level: "", adminEmail: props.profile.email }

  console.log("app:", app1)
 
  await props.notificationAppReminder({ app:app1 })
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
                
    currentYear:student&&student.currentYear,
    ciValue:student&&student.ciValue ||"0000" ,
    ciImage:student&&student.ciImage,
    country:student&&student.country,
    birthDate:student&&student.birthDate,
   email:student&&student.local&&student.local.email,
    microsoftEmail:student&&student.microsoftEmail,
    entryId:student&&student.entryId,
    birthCertifImage:student&&student.birthCertifImage,
    birthPlace:student&&student.birthPlace,
    nationality:student&&student.nationality,
    nom:student&&student.nom,
    prenom:student&&student.prenom,
   civilStatus:student&&student.civilStatus,
   phone1:student&&student.phone1,
   phone2:student&&student.phone2,
              }}
              onSubmit={modifyUser}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("E-mail non valide!").required("Ce champ est obligatoire (*)"),
                phone1: Yup.string().required("Ce champ est obligatoire (*)"),
                ciValue:Yup.string().required("Ce champ est obligatoire (*)"),
               
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
                      <h1>Paramètres étudiant</h1>
                    </div>
                    <hr className="hr-text" data-content="Informations générales" />
                    <Row>
                      <Col xs="12" sm="12" lg="12">
                        <div className="d-flex justify-content-center">

                        </div>
                      </Col>

                      <Col xs="12" sm="12" lg="12">
                      <Field
                          component={TextField}
                          id="ciValue"
                          name="ciValue"
                          label="Identifiant"
                          placeholder="Identifiant"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          disabled={false}
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.ciValue && touched.ciValue}
                          helperText={
                            errors.ciValue && touched.ciValue ? errors.ciValue : null
                          }
                        />
                        <Field
                          component={TextField}
                          id="prenom"
                          name="prenom"
                          label="Prénom"
                          placeholder="Prénom"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          disabled
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.prenom && touched.prenom}
                          helperText={
                            errors.prenom && touched.prenom ? errors.prenom : null
                          }
                        />
                        <Field
                          component={TextField}
                          id="nom"
                          name="nom"
                          label="Nom"
                          placeholder="Nom"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                         disabled
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.nom && touched.nom}
                          helperText={
                            errors.nom && touched.nom ? errors.nom : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                    <Col xs="12" sm="12" lg="12">
                        
                        
                      
                      
                    </Col>
                      <Col mt-2 xs="12" sm="12" lg="12">
                      {/* <Field
                          component={TextField}
                          id="birthDate"
                          name="birthDate"
                          inputVariant="outlined"
                          margin="normal"
                          label="Date de naissance"
                          fullWidth
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          variant="outlined"
                          error={errors.birthDate && touched.birthDate}
                          helperText={
                            errors.birthDate && touched.birthDate ? errors.birthDate : null
                          }
                        /> */}
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
                     
                      
                    <Col xs="12" sm="12" lg="12">
                        

                      </Col>
                  
                    </Row>
                    <Row>
                                           
                      <Col mt-2 xs="12" sm="12" lg="12">
                        <Field
                          component={TextField}
                          id="phone1"
                          name="phone1"
                          label="Tél 1"
                          placeholder="Tél 1"
                          className={classes.textField}


                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.phone1 && touched.phone1}
                          helperText={
                            errors.phone1 && touched.phone1 ? errors.phone1 : null
                          }
                        />
 


                      </Col>
                    </Row>

                    <Row>

                      {/* <Col xs="12" sm="12" lg="12">
                        <div className="mt-3 px-0 mx-0 d-flex flex-column align-items-center justify-content-center" style={{ height: "inherit" }}>
                          {uploadedImage == null && props.profile.personalPhoto == null ? <h2>No image!</h2> :
                            <img src={uploadedImage != null ? uploadedImage.idFile : props.profile.personalPhoto} style={{ borderRadius: "50%", width: 150, height: 150, marginBottom: 10 }} />
                          }

                          <h5>Modifier l'image  : </h5>
                          <OneFileUploader maxNumberOfFiles={1} />
                        </div>
                      </Col> */}
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
const mapStateToProps = ({ authReducer }) => {
  return {
    profile: authReducer.profile,
    isAuth: authReducer.isAuth
  };
};

export default connect(mapStateToProps, {  patchOneStudent,getStudentByCIValue,notificationAppReminder  })(ModifyStudent);