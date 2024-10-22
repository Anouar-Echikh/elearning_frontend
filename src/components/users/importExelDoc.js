import React, { useRef, useState, useEffect } from "react"

import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { Select } from 'material-ui-formik-components/Select'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import DownloadIcon from '@mui/icons-material/Download';

import OneFileUploader from "./oneFileExcelUploder"
import AlertModal from "./alertDialog"
import { useSelector, connect, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import * as XLSX from "xlsx";
import download from 'js-file-download';

//import { saveFile } from "../../../redux/actions/fileActions"
import { notificationAppReminder } from "../../redux/actions/notificationActions"
import {apiDownloadExcelFromServer} from '../../api/apiDownload'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";
import { useSnackbar } from 'notistack';
import moment from 'moment'


//import "./inputFile.css"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 150,
  width: 170,
  lineHeight: '80px',
  padding: 20,
  margin: 10,
  fontWeight: "bold",
  cursor: "pointer",

}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const HomeComponent = (props) => {


  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);
  const [file, setFile] = useState([]);
  const [arr, setArr] = useState([]);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false)
  const [objectInit, setObjectInit] = useState({
    startDate: null,
    endDate: null,
  })


  const readExcel = async (file) => {

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;


      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const wsname = wb.SheetNames[0];
      console.log(wsname)
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);



      // setItems(data);
      console.log("sheet Json2:", data)
      createTableToSave(data)
    }
  }

  const docVerif = (items) => {
    if (items.length > 0) {
      if (items[3] == undefined || Object.keys(items[3]).length < 38) {//60 case toujours repmlies et 1 peut etre vide
        return false
      } else {
        for (let i = 3; i < items.length; i++) {
          if (items[i].__EMPTY != undefined) { continue; }
          else {
            return false
          }
        }
        return true
      }
    } else {
      return false
    }
  }




  const createTableToSave = (items) => {

    let arr = []


    for (let i = 0; i < items.length; i++) {
      let listKeys = Object.keys(items[i])

      let data = {
        _id: "",
        email: "",
        active: false,
      }

      if (listKeys.includes('email') && listKeys.includes('activer')) {



        data.email = items[i].email
        items[i].activer === "oui" ? data.active = true : data.active = false


        console.log(`newDataObject[${i}]`, data)

        //data1[i-4]=data
        arr.push(data)

      } else {
        dispatch({ type: "OPEN", payload: { title: "Avertissement !", bodyText: "Une mauvaise organisation du tableau!, Veuillez télécharger et utiliser l'exemple de fichier fournit par l'application! ." } })
        //alert("Vérifiez le tableau, le n° CIN est obligatoire!")
      }
    }

    setArr(arr)
  }

  const validateEmail = (val) => {

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.match(validRegex)) {

      

      return true;

    } else {

      
      return false;

    }

  }
  const saveDoc = async (data) => {

    let data1 = arr
    console.log("ArrDoc:", arr)
    setLoading(true)
    if (data1.length > 0) {

      let arrDuplicatedItems = []
      let invalidEmails = []

      for (let item of data1) {
        let arrItemsDuplicated = data1.filter((el) => el.email == item.email)
        if (arrItemsDuplicated.length > 1) {
          arrDuplicatedItems.push(item)
        } 
        if (validateEmail(item.email)==false) {
               
          invalidEmails.push(item.email)
        }
      }
      if (arrDuplicatedItems.length > 0) {
        dispatch({ type: "OPEN", payload: { title: "Avertissement !", bodyText: "Il y a des emails doubles! Veuillez vérifier votre fichier." } })
        setLoading(false)
      }
      else {

        if (invalidEmails.length < 1) {
          let modifiedList = props.listStudents
          
          console.log("ListStudents:", modifiedList)

          for (let i = 0; i < data1.length; i++) {
            for (let j = 0; j < modifiedList.length; j++) {
              let { student } = modifiedList[j];
              if (student.local.email === data1[i].email )
              modifiedList[j].active= data1[i].active 
              
              }
            }

          
          
          let newList = modifiedList.map((item) => {return { _id:item.student._id, active: item.active }})
          console.log("newListStudents:", newList)
          let resp =  await props.patchSubDep(props.subDepId, { students: newList });
          
          if (resp) {
            //await createNotification()
            setLoading(false)
            // setReset(true)
            props.closeAddModal()
            enqueueSnackbar('Modification effectuée avec succès!', { variant: 'success' });
          } else {

            setLoading(false)
            setReset(true)
            props.closeAddModal()
            enqueueSnackbar('Echec de modification !', { variant: 'error' });


          }
        } else {
          setLoading(false)
          dispatch({ type: "OPEN", payload: { title: "Avertissement !", bodyText: "Il y a des émail inncorrect ! ==> " + invalidEmails.map((email) => (" " + email + " ")) } })
        }
      }
    } else {
      setLoading(false)

      //enqueueSnackbar('Enregistrement non  effectuée !', { variant: 'error' });
      dispatch({ type: "OPEN", payload: { title: "Avertissement !", bodyText: "Veuillez selectionner un fichier !" } })

    }

  }

  //  Notification //
  const createNotification = async () => {
    let app1 = {};

    app1 = { note: { subject: "Platforme Etudiant - Notification", text: `Une opération a été effectuée sur la base des relèves de notes`, admin: props.currentUser.name, level: "PCEM2", startDate: props.year.startDate, endDate: props.year.endDate, operation: "Ajout" }, date: 2000, important: true, type: "notif-add", level: "PCEM2", adminEmail: props.currentUser.email }

    console.log("app:", app1)

    await props.notificationAppReminder({ app: app1 })
  }

  const downloadExempleFile=async(filename)=>{
    console.log('download exemple file fun!')
   
    let res=  await apiDownloadExcelFromServer(filename)
    download(res.data, filename);
  
  }

  return (
    <div className="w-100 d-flex flex-column justify-content-center " style={{ marginTop: 50 }} >
      <AlertModal />
      <div className="container d-flex justify-content-center flex-column align-items-center " style={{ marginBottom: 10, minHeight: 20, textAlign: "center" }}>
        <div className="  py-2  " style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 20, paddingRight: 20, color: "#3f51b5" }}>Activer/Désactiver à partir d'un fichier Excel</div>
        <Button  startIcon={<DownloadIcon/>} style={{ fontSize: 13, fontWeight: "bold", paddingLeft: 20, paddingRight: 20, color: "green" }} onClick={()=>downloadExempleFile("activation_exemple.xlsx")}>Télécharger activation_exemple.xlsx</Button>
      </div>
      <LoadingOverlay
        active={loading}
        spinner={<BeatLoader size={10} color={"#40A4EB"} />}
        styles={{
          overlay: base => ({
            ...base,
            background: "  rgba(252, 252, 252, 0.61)"
          })

        }}
      >
        <div className="d-flex flex-column  justify-content-center align-items-center my-2 mx-auto mx-md-2 " >
          <Formik
            enableReinitialize={true}
            initialValues={objectInit}
            onSubmit={saveDoc}
            validationSchema={Yup.object().shape({
              // startDate: Yup.date().nullable().required("Veuillez ajouter la date début de l'année!"),
              // endDate: Yup.date().nullable().required("Veuillez ajouter la date fin de l'année!"),
            })}
            render={({
              /** props given by formik */
              handleSubmit,
              handleChange,
              errors,
              values,
              touched
            }) => (
              <Form>

                <div className="d-flex flex-column  justify-content-center align-items-center my-2 mx-auto mx-md-2" >
                  <div style={{ maxWidth: 300 }}>
                    

                  </div>
                  <OneFileUploader maxNumberOfFiles={1} reset={reset} readFile={(file => readExcel(file))} />
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"


                    onClick={handleSubmit}

                    // disabled={props.couseIsSaving}
                    disabled={false}
                  >
                    Enregistrer
                  </Button>
                  {/* <Button onClick={()=>saveDoc() } color="primary" variant="outlined" >Enregistrer</Button> */}
                </div>

              </Form>
            )}
          />








        </div>
      </LoadingOverlay>
    </div>

  )
}

const mapStateToProps = ({ authReducer, authStudentReducer }) => {
  return {
    currentUser: authReducer.profile,

    isAuth: authReducer.isAuth,

  };
};

export default connect(mapStateToProps, { notificationAppReminder })(HomeComponent);


