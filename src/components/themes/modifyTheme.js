import React, { useState, useEffect, useRef } from "react"
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { Select } from 'material-ui-formik-components/Select'
import * as Yup from "yup";
//import TextField from "@material-ui/core/TextField";
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import OneFileUploader from "./oneFileUploder"

import { connect,useDispatch,useSelector } from "react-redux"
import {patchTheme} from '../../redux/actions/themesActions'
import { useSnackbar } from 'notistack';


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

const ModifyThemeItem = (props) => {

  const levels = [
    "1ère année",
    "2ème année",
    "3ème année",
    "4ème année",
    "5ème année",
  ]

  //const [list,setList]=useState([])
  // const list = useSelector(state => state.filesReducer.files)
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
const dispatch=useDispatch()

  

  const modifyThemeItem = async (themeItem) => {

      const result = await props.patchTheme(props.item._id,{...themeItem,image: uploadedImage||props.item.image})
      console.log("result of saving:", result)
      if (result) {
        
        
        enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
        //close modal
        props.close()

      } else {
        enqueueSnackbar('Modification non effectuée !', { variant: 'error' });

      }
    
    
    
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
                title: props.item.title,
              
               
                
              }}
              onSubmit={modifyThemeItem}
              validationSchema={Yup.object().shape({
                
                title: Yup.string().required("Ce champ est obligatoire (*)"),
                
                //checked: Yup.boolean().required("Le choix par défaut est -Ne pas afficher-")
               
              
              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched
              }) => (
                  <Form>
                   <div style={{ maxWidth: 500 }} className='mx-auto'>
                       
                         <Row>
                         
                       
                          
                           
                            <Col xs="12" sm="12" lg="12">
                            
                            <Field
                                component={TextField}
                                id="title"
                                name="title"
                                label="Titre"
                                placeholder="Titre.."
                                className={classes.textField}

                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.title && touched.title}
                                helperText={
                                  errors.title && touched.title ? errors.title : null
                                }
                              />
                          </Col>
                          </Row>
                          <Row>
                            
                        <Col xs="12" sm="12" lg="12">
                          <div className="mt-3 px-0 mx-0" style={{ height: "inherit" }}>
                          {uploadedImage==null && props.item.image==null ? <h2>No image!</h2>:
                          <img src={ uploadedImage!=null?uploadedImage.idFile:props.item.image.idFile}  style={{borderRadius:"5%",width:250,height:250,marginBottom:10}}/>
                          }
                            <h5>Modifier l'image de couverture : </h5>
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
const mapStateToProps = (state) => {
  return {

  }
}

export default connect(null, { patchTheme })(ModifyThemeItem);