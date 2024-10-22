import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { Select } from 'material-ui-formik-components/Select'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ReactPlayer from "react-player";

import OneFileUploader from "./oneFileUploder"
import AlertModal from "./alertDialog"
import { useSelector, connect, useDispatch } from 'react-redux'
import { saveVideo,patchVideo } from '../../redux/actions/videosActions'
import { getAllThemes} from '../../redux/actions/themesActions'
//import {setAuthHeaderForMsGraph,apiGetListFilesByAccountName,apiGetListCourseFolders} from "../../api/apiMicrosoft"
import { useSnackbar } from 'notistack';
//import { Line, Circle } from 'rc-progress';
//import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
//import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import moment from "moment"
import AddChapters from "./todoChapters"
import getVideoId from 'get-video-id';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%",
    maxWidth: "100%",
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
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const ModifyVideo = (props) => {
  const classes = useStyles(); 
  const uploaderRef = useRef()
  const { enqueueSnackbar } = useSnackbar();
  //const [list,setList]=useState([])
  const list = useSelector(state => state.filesReducer.files)
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [back, setBack] = useState(false);
  const [pathUpload, setPathUpload] = useState("Platform_4_UHA/Publications/errors");
  const [pathUpdated, setPathUpdated] = useState(false);
  const [itemId,setItemId]=useState("")
  const [coverImageName,setCoverImageName]=useState()
  const [render, setRender] = useState(false);
  const [listFiles, setListFiles] = useState([]);
  const [listChapters, setListChapters] = useState(props.item.chapters);
  const [coverImageUrl,setCoverImageUrl]=useState(null)
  const [itemTitle,setItemTitle]=useState()
  const [allThemes, setAllThemes] = useState([])
  const [imgUrl,setImgUrl]=useState()
  const [thumbnail,setThumbnail]=useState()
  const [fileId,setFileId]=useState()
  const [otherTypeComponentExist, setOtherTypeComponentExist] = useState(false)
  const [objectInit, setObjectInit] = useState({
    title:props.item.title,
  
 
  module:props.item.module,
  prof:props.item.prof,
  description: props.item.description,
  urlVideo: props.item.urlVideo,
  chapters: listChapters,
  })
  const dispatch = useDispatch()
  const history=useNavigate()

  //refresh msGraph_token every component load
  //useEffect(()=>{setAuthHeaderForMsGraph()},[])
  
  const modules = [
    "Anatomie",
    "Biochimie",
    "Statistiques-Informatique",
    "Chimie",
    "Cytologie",
    "Embryologie",
    "Histologie",
    "Physiologie générale",
    "Physique-biophysique",
    "Santé Société et Humanité",
    "Langues",
  ]
  const levels = [
    "1ère année",
    "2ème année",
    "3ème année",
    "4ème année",
    "5ème année",
  ]
  const profs = [
    "Dr. Habib Besbes",
    "Dr. Charfeddine Amri",
    "Dr. Medecin 1",
    "Dr. Medecin 2",
    "Dr. Medecin 3",
  ]
  const categories = [
    "Allergologie/Immunologie", 
    "Anesthésiologie",
    "Andrologie",
    "Cardiologie",
    "Chirurgie cardiaque",
    "Chirurgie esthétique, plastique et reconstructive",
    "Chirurgie générale",
    "Chirurgie maxillo-faciale",
    "Chirurgie pédiatrique",
    "Chirurgie thoracique",
    "Chirurgie vasculaire",
    "Neurochirurgie",
    "Dermatologie",
    "Endocrinologie",
   " Gastro-entérologie",
    "Gériatrie",
    "Gynécologie",
    "Hématologie",
    "Hépatologie",
    "Infectiologie",
    "Médecine aiguë",
    "Médecine du travail",
    "Médecine générale",
    "Médecine interne",
    "Médecine nucléaire",
    "Médecine palliative",
    "Médecine physique",
    "Médecine préventive",
    "Néonatologie",
    "Néphrologie",
    "Neurologie",
    "Odontologie",
    "Oncologie",
    "Obstétrique",
    "Ophtalmologie",
    "Orthopédie",
    "Oto-Rhino-Laryngologie",
    "Pédiatrie",
    "Pneumologie",
    "Psychiatrie",
   "Radiologie",
   "Radiothérapie",
   "Rhumatologie",
    "Urologie",
  ]
   
    const modifyVideo = async (data, { resetForm }) => {
    console.log("data:",data)
    setObjectInit({
      title:data.title,
 
  module:data.module,
  prof:props.profile._id,
  description: data.description,
  urlVideo: data.urlVideo,
  thumbnail:thumbnail,
  chapters: listChapters,
      
    });
    

   
      
      
      const result = await props.patchVideo(props.item._id,data)
      console.log("result of updating data:", data)
        
        if (result) {
            //const path_obj=await createFolderForOneCourse(savedCourse.title)
            // let newPathUpload=`Platforme_Enseignant/Activités_de_recherche/Ouvrages-Monographies`
            // setPathUpload(newPathUpload)
            setItemId(props.item._id)//for update item in onFile-upload
           // setItemTitle(moment(data.pubDate).format("YYYY")+"-"+data.title)
            //setItemTitle(moment(data.date).format("YYYY")+"-"+data.title)
           // setImageId(props.item.idImage)
            // console.log("item from patch item:",props.item)
            // setFileId(props.item.idImage)  //for deleting last file pdf uploaded
            // setCoverImageName(props.item.image)  //for deleting last file pdf uploaded
            handleNext(1)//next step

             enqueueSnackbar('Enregistrement effectuée avec succès!', { variant: 'success' });
          } else {
            enqueueSnackbar('Enregistrement non effectuée !', { variant: 'error' });
          }
        
        
        
     


    

    
  }

  const getListChapiter = (list) => {
    //let newlist=list.map((el)=>el.timing==0?)
    setListChapters(list)
    console.log("ListVideos from modifyComponent:", list)
  }

  const clearForm = () => {
    //reset uploader uppy
    uploaderRef.current.resetUploder()

  }
  
  const handleNext = async (step) => {
    // if (listFiles.length>0)
    // { if (!pathUpdated )
    //    { 
    //      console.log("listfile.length2:",listFiles.length)
    //      let newPath=pathUpload
    //      await props.patchBook(itemId,{pathUpload:newPath})
    //     setPathUpdated(true)
    // }
    // }
    if(step==2)
    {
      const resp = await props.patchVideo(itemId, {...objectInit,chapters:listChapters})
      console.log("result of update-saving item:", resp)
      console.log("objInit:", objectInit)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };
  //get ref code form
const finishButton=async ()=>{
  const resp = await props.patchVideo(itemId, {...objectInit,chapters:listChapters})
  console.log("result of update-saving item:", resp)
  console.log("objInit:", objectInit)
  props.close()
}
  const handleBack = async () => {
    //get last new ref doc
   // await this.props.getLastSaleDocByType("dev");
   setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // set refdoc in state and go to back
    
    //setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setObjectInit({
      title:"",
  theme:"",
 
  module:"",
  description: "",
  urlVideo: "",
  chapters: [],
    })
  //  setActiveStep(0)
  //  setCoverImageUrl(null)
  //  setCoverImageName(null)
  };

//   const getListFiles=async()=>{
//     try{
//       const files=await apiGetListFilesByAccountName(props.item.user.email,`Platforme_Enseignant/Activités_de_recherche/Ouvrages-Monographies`)
//       console.log("allItem files:",files.data.value)
//       let list=files.data.value
//      // setAllNews(Items)
//      // const foundFile=list.filter((el)=>((el.name).search(item.title)>-1))
//       const foundFile=list.filter((el)=>(el.id==props.item.idImage))
//       console.log('foundFile:',foundFile)
//       if(foundFile.length>0)
//       setImgUrl(foundFile[0]['webUrl'])
// else setImgUrl("noImage")
//       //setLoading(false)
//       }
//       catch(e) {
//       console.log(e)
//       }

//   }
  
  React.useEffect(()=>{
  //  getListFiles()
    
  },[render])
  
  

  const refreshListUsers_CoverImage=(urlImage)=>{
    setCoverImageUrl(urlImage)
    //setRender(prev=>!prev)
  }

  const validationSchemaShape=()=>{
    let validationShape = {
      title:Yup.string().required("Ce champ est obligatoire (*)"),
        
      description: Yup.string().required("Ce champ est obligatoire (*)"),
     
      urlVideo:  Yup.string().required("Ce champ est obligatoire (*)"),
     };
    
    
    return validationShape
  }

  // get All themes
const getListThemes=async()=>{
  
  try{
  const themes=await props.getAllThemes()
  console.log("allthemes:",themes)
  
  setAllThemes(themes)
  
  }
  catch(e) {
  console.log(e)
  }
  }
  useEffect(()=>{
    getListThemes()
  },[])
  //end get themes list


  //---- get Video id from url youtube
const getVideoThumbnailUrl=(url)=>{
  const {id}= getVideoId(url)
  let urlThumbnail="https://img.youtube.com/vi/"+id+"/hqdefault.jpg"
  setThumbnail(urlThumbnail)
  return urlThumbnail
  }
//-------------------------
  
  return (

    <div className="animated slideInUpTiny animation-duration-3">
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card-header mb-2 d-flex align-items-center justify-content-center">
           
          </div>
          <div className="jr-card d-print-none  ">
          <div  className='mx-auto'>
          <div className=" mb-2 d-flex justify-content-center">
          <h1>Modifier une video</h1>
          </div>
         
            <AlertModal />
        <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
                  <StepLabel>{"Informations générales"}</StepLabel>
                  <StepContent>
                    <Formik
                      enableReinitialize={true}
                      initialValues={objectInit}
                      onSubmit={modifyVideo}
                      validationSchema={Yup.object().shape(validationSchemaShape())}
                      render={({
                        /** props given by formik */
                        handleSubmit,
                        handleChange,
                        errors,
                        values,
                        touched
                      }) => (
                        <Form>
                         

                          <Row>
                            <Col xs="12" sm="12" lg="6">
                            {/* <Field
                                component={Select}
                                name="prof"
                                variant="outlined"
                                label="Professeur"
                                options={profs.map((el, index) => ({ value: el._id, label: el.name }))}
                                error={errors.prof && touched.prof}
                                helperText={
                                  errors.prof && touched.prof ? errors.prof : null
                                }
                              /> */}
                        
                             
                               
                              {/* <Field
                                component={Select}
                                name="module"
                                variant="outlined"
                                label="Module"
                                options={modules.map((el, index) => ({ value: el, label: el }))}
                                error={errors.module && touched.module}
                                helperText={
                                  errors.module && touched.module ? errors.module : null
                                }
                              /> */}
                           
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
                           
                              <Field
                                component={TextField}
                                id="description"
                                name="description"
                                label="Description"
                                placeholder="Description.."
                                className={classes.textField}
                                multiline
                                rowsMax={10}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.description && touched.description}
                                helperText={
                                  errors.description && touched.description ? errors.description : null
                                }
                              />
                             <Field
                                component={TextField}
                                id="urlVideo"
                                name="urlVideo"
                                label="Lien de video"
                                placeholder="Lien.."
                                className={classes.textField}

                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.urlVideo && touched.urlVideo}
                                helperText={
                                  errors.urlVideo && touched.urlVideo ? errors.urlVideo : null
                                }
                              />
                                <h3 style={{ color: "red" }}>* Thumbnail:</h3>
                              <img src={getVideoThumbnailUrl(values.urlVideo)} style={{width:"100%",marginBottom:10}} />
                            </Col>
                            <Col xs="12" sm="12" lg="6">
                              <h3 style={{ color: "red" }}>*Video **</h3>
                              <ReactPlayer
                                url={values.urlVideo}
                                controls={true}
                                width="100%"
                                config={{
                                  youtube: {
                                    embedOptions: { rel: 0 }
                                  }
                                }}
                              />
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

                              // disabled={props.couseIsSaving}
                              disabled={false}
                            >
                              Enregistrer et continuer
                            </Button>

                            <div className={classes.placeholder}>
                              {/* <Fade
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
                          </Fade> */}
                            </div>
                          </Row>

                        </Form>
                      )}
                    />
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>{"Mentionner les chapitres et les sous-chapitres:"}</StepLabel>
                  <StepContent>
                    <div className="mb-2">
                    <AddChapters list={listChapters} id="goalsFr" urlVideo={objectInit.urlVideo}
                          name="goalsFr" label="Objectifs de l'association" placeholder="Ajouter un objectif .." getListChapiter={getListChapiter}  />
                                           
                    </div>
                    <Row className="d-flex justify-content-center  " style={{marginTop:20}}>
                    {/* <div className={classes.actionsContainer}>
                      <div> */}
                        {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    size="small"
                  >
                    Précédent
                  </Button> */}
                        <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>finishButton()}
                    className={classes.button}
                    
                  >
                   Enregistrer et fermer
                  </Button>
                      </Row>
                    {/* </div> */}
                  </StepContent>
                </Step>

          
         
        </Stepper>
        
          </div>
</div>
        </div>
      </div>
    </div>

  )

}

const mapStateToProps=(state)=>{
  return{
    // users:state.usersReducer.users,
    // isFetching:state.usersReducer.usersIsFetching,
    // isAuth:state.authReducer.isAuth,
    profile: state.authReducer.profile,  
  }
}

export default connect(mapStateToProps, { saveVideo,patchVideo,getAllThemes })(ModifyVideo);