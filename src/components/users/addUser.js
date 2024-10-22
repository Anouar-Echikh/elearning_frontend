import React, { useState, useEffect } from "react"
import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import OneFileUploader from "./oneFileUploder"
import { useSelector,connect,useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack';
import {saveUser} from '../../redux/actions/usersActions'
import { Alert } from "reactstrap";

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

const AddUser = (props) => {

  //const [list,setList]=useState([])
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
 const [show , setShow]=useState(false)
 const [visible , setVisible]=useState(false)

  const addUser = async(data,{resetForm}) => {
    
    let user = {
      ...data,
      image: uploadedImage,
      connected:false
      
    }
    console.log("new_user to send to server:", user)
    const result= await props.saveUser(user)
      console.log("result of saving:", result)
      if (result) {
        resetForm()
         //clear uploded event image state
    dispatch({type:"CLEAR_STATE_ONE_FILE"})
    //end clear
        enqueueSnackbar('Enregistrement effectuée avec succès!', { variant: 'success' });

      } else {
        enqueueSnackbar('Enregistrement non effectuée !', { variant: 'error' });
        //show Alert 
          setVisible( true );
          setShow(true);
        

      }
  }

  const onDismiss = () => {
   setVisible( false );
    //make Alert msg hidden by default
    setShow(false);
  };
 const displayAlertMsg = () => {
    
    if (props.error_Msg) {
      console.log("Alert msg Insc");
      console.log(props.error_Msg);
      return (
        <Alert
          color="danger"
          isOpen={visible}
          toggle={onDismiss}
          fade={true}
          className="my-2"
        >
          {props.error_Msg}
        </Alert>
      );
    }
  };
  

  return (

   
    <div className="animated slideInUpTiny animation-duration-3">
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card-header mb-2 d-flex justify-content-center">
            
          </div>
          
          <div className="jr-card d-print-none">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone:"",
                role:"Editeur"
               
              }}
              onSubmit={addUser}
              validationSchema={Yup.object().shape({
                
                name: Yup.string().required("Ce champ est obligatoire (*)"),
                phone: Yup.string().required("Ce champ est obligatoire (*)"),
                email: Yup.string()
                    .email("E-mail non valide!")
                    .required("Ce champ est obligatoire (*)"),
                  password: Yup.string()
                    .min(
                      8,
                      "Nbr de charactères doit ètre supérieur ou égale à 8"
                    )
                    .required("Ce champ est obligatoire (*)"),
                    confirmPassword: Yup.string()
                    .oneOf(
                      [Yup.ref("password"), null],
                      "Les deux mots de passe ne sont pas identiques!"
                    )
                    .required("Ce champ est obligatoire (*)")
                
              
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
            <h1>Ajouter un utilisateur</h1>
          </div>
                         <Row>
                         <Col xs="12" sm="12" lg="12">
                         <div className="d-flex justify-content-center">
              {//conditional rendering alert msg
              show ? displayAlertMsg() : null}
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
                              <Field
                                component={TextField}
                                id="password"
                                name="password"
                                label="Mot de passe"
                                placeholder="Mot de passe"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.password && touched.password}

                                helperText={
                                  errors.password && touched.password ? errors.password : null
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12" sm="12" lg="12">
                              <Field
                                component={TextField}
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirmer le mot de passe"
                                placeholder="Confirmer le mot de passe"
                                className={classes.textField}
                                
                                
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.confirmPassword && touched.confirmPassword}
                                helperText={
                                  errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null
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
   options={[
     
     { value:"Administrateur", label: 'Administrateur' },
     { value: "Editeur", label: 'Editeur' },
     
     ]}
   groupProps={{ row: false }}
 />


               </Col>
               <Col xs="12" sm="12" lg="12">
                          <div className="mt-3 px-0 mx-0" style={{ height: "inherit" }}>
                          {uploadedImage!=null?
                          <img src={ uploadedImage.idFile}  style={{borderRadius:"50%",width:200,height:200,marginBottom:10}}/>
                          :<h2>No image !</h2>}
                          
                            <h5>Ajouter une image pour cet utilisateur : </h5>
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
const mapStateToProps = ({ usersReducer }) => {
  return {
    error_Msg: usersReducer.error,
    
  };
};


export default connect (mapStateToProps,{saveUser})(AddUser);