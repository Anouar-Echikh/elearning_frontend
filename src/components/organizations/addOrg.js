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
import { saveOrg } from '../../redux/actions/organizationsActions'
import { Select } from 'material-ui-formik-components/Select'
import {
  govs,
  ariana,
  beja,
  ben_arous,
  bizerte,
  gabes,
  gafsa,
  jendouba,
  kairouan,
  gasserine,
  kebili,
  kef,
  mahdia,
  manouba,
  mednine,
  monastir,
  nabeul,
  sfax,
  sidibouzid,
  siliana,
  sousse,
  tataouine,
  tozeur,
  tunis,
  zaghouane,

} from "./cities"

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

  const getCity = (gov) => {
    console.log("gov from switch:", gov)
    switch (gov) {
      case 'Ariana': return ariana;
      case 'Béja': return beja;
      case 'Ben Arous': return ben_arous;
      case 'Bizerte': return bizerte;
      case 'Gabès': return gabes;
      case 'Gafsa': return gafsa;
      case 'Jendouba': return jendouba;
      case 'Kairouan': return kairouan;
      case 'Kasserine': return gasserine;
      case 'Kebili': return kebili;
      case 'Kef': return kef;
      case 'Mahdia': return mahdia;
      case 'Manouba': return manouba;
      case 'Mednine': return mednine;
      case 'Monastir': return monastir
      case 'Nabeul': return nabeul;
      case 'Sfax': return sfax;
      case 'Sidi Bouzid': return sidibouzid;
      case 'Siliana': return siliana;
      case 'Sousse': return sousse;
      case 'Tataouine': return tataouine;
      case 'Tozeur': return tozeur;
      case 'Tunis': return tunis;
      case 'Zaghouan': return zaghouane;
      default: return null
    }

  }

  const addOrg = async (data, { resetForm }) => {

    let Org = {
      ...data,
      image: uploadedImage,

    }
    console.log("news_Org to send to server:", Org)
    const result = await props.saveOrg(Org)
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
                name: "",
                selectGov: "",
                selectCity:"",
                tel1: "",
                tel2: "",
                adress: "",
                prefix:""

              }}
              onSubmit={addOrg}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Ce champ est obligatoire (*)"),
                selectGov: Yup.string().required("Ce champ est obligatoire (*)"),
                selectCity: Yup.string().required("Ce champ est obligatoire (*)"),
                adress: Yup.string().required("Ce champ est obligatoire (*)"),
                tel1: Yup.string().length(8, "Vérifiez le numéro!").required("Ce champ est obligatoire (*)"),
                prefix: Yup.string().required("Ce champ est obligatoire (*)"),
              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched,
                values
              }) => (
                <Form>
                  <div style={{ maxWidth: 500 }} className='mx-auto'>

                    <Row>


                      <Col xs="12" sm="12" lg="12">

                        <Field
                          component={TextField}
                          id="name"
                          name="name"
                          label="Établissement"
                          placeholder="Titre.."
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
                        <Field
                          component={TextField}
                          id="prefix"
                          name="prefix"
                          label="Prefix"
                          placeholder="Prefix.."
                          className={classes.textField}

                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.prefix && touched.prefix}
                          helperText={
                            errors.prefix && touched.prefix ? errors.prefix : null
                          }
                        />
                        <Field
                          component={Select}
                          name="selectGov"
                          variant="outlined"
                          label="Gouvernorat"
                          options={govs.map((el, index) => ({ value: el, label: el }))}
                          error={errors.selectGov && touched.selectGov}
                          helperText={
                            errors.selectGov && touched.selectGov ? errors.selectGov : null
                          }
                        />


                        <div className={values.selectGov === "" ? "d-none" : ""}>

                          <Field
                            component={Select}
                            label="Ville"
                            name="selectCity"
                            variant="outlined"
                            options={getCity(values.selectGov) === null ? [] : getCity(values.selectGov).map((el, index) => ({ value: el, label: el }))}
                            error={errors.selectCity && touched.selectCity}
                            helperText={
                              errors.selectCity && touched.selectCity ? errors.selectCity : null
                            }
                          />


                        </div>
                        <Field
                          component={TextField}
                          id="adress"
                          name="adress"
                          label="Adresse"
                          placeholder="Adresse.."
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
                        <Field
                          component={TextField}
                          id="tel1"
                          name="tel1"
                          label="N° Tél 1 "
                          placeholder="N° Tél 1.."
                          className={classes.textField}

                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.tel1 && touched.tel1}
                          helperText={
                            errors.tel1 && touched.tel1 ? errors.tel1 : null
                          }
                        />
                        <Field
                          component={TextField}
                          id="tel2"
                          name="tel2"
                          label="N° Tél 2"
                          placeholder="N° Tél 2.."
                          className={classes.textField}

                          margin="normal"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={errors.tel2 && touched.tel2}
                          helperText={
                            errors.tel2 && touched.tel2 ? errors.tel2 : null
                          }
                        />
                      </Col>


                      <Col xs="12" sm="12" lg="12">
                        <div className="mt-3 px-0 mx-0" style={{ height: "inherit" }}>
                          {uploadedImage != null ?
                            <img src={uploadedImage.idFile} style={{ borderRadius: "5%", width: 250, height: 250, marginBottom: 10 }} />
                            : <h2>No image !</h2>}

                          <h5>Ajouter un logo pour cette Etablissement : </h5>
                          <OneFileUploader maxNumberOfFiles={1} typeDispatch="ADD_ONE_FILE" />
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

  }
}

export default connect(mapStateToProps, { saveOrg })(AddOrg);