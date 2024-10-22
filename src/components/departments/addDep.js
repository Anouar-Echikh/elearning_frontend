import React, { useState, useEffect } from "react"
import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import OneFileUploader from "./oneFileUploder"
import { useSelector, connect, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack';
import { saveDep } from '../../redux/actions/departmentsActions'
import { Select } from 'material-ui-formik-components/Select'


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

const AddOrg = (props) => {

  //const [list,setList]=useState([])
  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  


  const addDep = async (data, { resetForm }) => {

    let Org = {
      ...data,
      image: uploadedImage,
      organization:props.profile.organization
    }
    console.log("news_Org to send to server:", Org)
    const result = await props.saveDep(Org)
    console.log("result of saving:", result)
    if (result) {
      resetForm()
      //clear uploded event image state
      dispatch({ type: "CLEAR_STATE_ONE_FILE" })
      //end clear
      props.closeAddModal()
      enqueueSnackbar('Enregistrement effectuée avec succès!', { variant: 'success' });

    } else {
      enqueueSnackbar('Enregistrement non effectuée !', { variant: 'error' });

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
                name: ""               

              }}
              onSubmit={addDep}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Ce champ est obligatoire (*)"),
               
              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched,
                
              }) => (
                <Form>
                  <div style={{ maxWidth: 500 }} className='mx-auto'>

                    <Row>


                      <Col xs="12" sm="12" lg="12">

                        <Field
                          component={TextField}
                          id="name"
                          name="name"
                          label="Département"
                          placeholder="Nom de département.."
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


                      <Col xs="12" sm="12" lg="12">
                        <div className="mt-3 px-0 mx-0" style={{ height: "inherit" }}>
                          {uploadedImage != null ?
                            <img src={uploadedImage.idFile} style={{ borderRadius: "5%", width: 250, height: 250, marginBottom: 10 }} />
                            : <h2>No image !</h2>}

                          <h5>Ajouter un logo pour ce département : </h5>
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
    profile: state.authReducer.profile,
  }
}

export default connect(mapStateToProps, { saveDep })(AddOrg);