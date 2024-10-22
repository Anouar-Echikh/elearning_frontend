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

import { connect, useDispatch, useSelector } from "react-redux"
import { patchOrg, getOneOrgById } from '../../redux/actions/organizationsActions'
import { useSnackbar } from 'notistack';
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

const ModifyItem = (props) => {

  const uploadedImage = useSelector(state => state.filesReducer.oneFile)
  const uploadedImageHeader = useSelector(state => state.filesReducer.homeHeaderImage)
  const uploadedImageContact = useSelector(state => state.filesReducer.homeContactImage)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [item,setItem]=useState()
  const [loading,setLoading]=useState(true)

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

  const modifyItem = async (Item) => {

    const result = await props.patchOrg(item&&item._id, { ...Item, image: uploadedImage || item&&item.image,homeHeaderImage: uploadedImageHeader || item&&item.homeHeaderImage,homeContactImage: uploadedImageContact || item&&item.homeContactImage })
    console.log("result of saving:", result)
    if (result) {


      enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
      //close modal
      //props.close()

    } else {
      enqueueSnackbar('Modification non effectuée !', { variant: 'error' });

    }



  }

  const getOrgById = async () => {
    setLoading(true)
    try {
      const Item = await props.getOneOrgById(props.profile.organization["_id"])
      console.log("org:", Item)
      setItem(Item)
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getOrgById()
  }, [])



  return (


    <div className="animated slideInUpTiny animation-duration-3">
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card-header mb-2 d-flex align-items-center">
          <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:26,fontWeight:"bolder" ,color:"#666"}}>Paramètres</div></div>
          </div>

          <div className="jr-card d-print-none">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: item&&item.name,
                selectGov: item&&item.selectGov,
                selectCity: item&&item.selectCity,
                adress: item&&item.adress,
                tel1: item&&item.tel1,
                tel2: item&&item.tel2,
              }}
              onSubmit={modifyItem}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Ce champ est obligatoire (*)"),
                selectGov: Yup.string().required("Ce champ est obligatoire (*)"),
                selectCity: Yup.string().required("Ce champ est obligatoire (*)"),
                adress: Yup.string().required("Ce champ est obligatoire (*)"),
                tel1: Yup.string().length(8, "Vérifiez le numéro!").required("Ce champ est obligatoire (*)"),
              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched,
                values
              }) => (
                <Form>
                  {loading?"Loading...":
                  <div  className='mx-auto'>

                    <Row>
                      
                      <Col xs="12" sm="12" lg="6">
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
                 
                      <Col xs="12" sm="12" lg="6" >
                        <div className="d-flex justify-content-center container-fluid">
                        <div className="  mt-2 p-1 mx-2" style={{ height: "inherit" }}>
                          {uploadedImage == null && item&&item.image == null ? <h2>No image!</h2> :
                            <img src={uploadedImage != null ? uploadedImage.idFile : item&&item.image.idFile} style={{ borderRadius: "5%", width: 250, height: 250, marginBottom: 10 }} />
                          }
                          <h5>Modifier Logo : </h5>
                          <OneFileUploader maxNumberOfFiles={1} typeDispatch="ADD_ONE_FILE" />
                        </div>
                        </div>
                      </Col>
                      </Row>
<Row>
                      <Col xs="12" sm="12" lg="6" >
                        <div className="d-flex justify-content-center container-fluid">
                        <div className="  mt-2 p-1 mx-2" style={{ height: "inherit" }}>
                        {uploadedImageHeader == null && item&&item.homeHeaderImage == null ? <h2>No image!</h2> :
                            <img src={uploadedImageHeader != null ? uploadedImageHeader.idFile : item&&item.homeHeaderImage.idFile} style={{ borderRadius: "5%", width: 250, height: 250, marginBottom: 10 }} />
                          }
                          <h5>Modifier l'image de l'entete de la page d'accueil : </h5>
                          <OneFileUploader maxNumberOfFiles={1} typeDispatch="ADD_HOME_HEADER_IMG" />
                        </div>
                        </div>
                      </Col>
                      <Col xs="12" sm="12" lg="6" >
                        <div className="d-flex justify-content-center container-fluid">
                        <div className="  mt-2 p-1 mx-2" style={{ height: "inherit" }}>
                          {uploadedImageContact == null && item&&item.homeContactImage == null ? <h2>No image!</h2> :
                            <img src={uploadedImageContact != null ? uploadedImageContact.idFile : item&&item.homeContactImage.idFile} style={{ borderRadius: "5%", width: 250, height: 250, marginBottom: 10 }} />
                          }
                          <h5>Modifier l'image de contact : </h5>
                          <OneFileUploader maxNumberOfFiles={1} typeDispatch="ADD_HOME_CONTACT_IMG" />
                        </div>
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
                }
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

export default connect(mapStateToProps, { patchOrg, getOneOrgById })(ModifyItem);