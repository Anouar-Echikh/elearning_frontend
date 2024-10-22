import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { Select } from 'material-ui-formik-components/Select'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import { RadioGroup } from 'material-ui-formik-components/RadioGroup'
import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";

import {connect,useDispatch} from "react-redux"


const  AlertDialog=(props)=> {
   const dispatch=useDispatch()
   const [loading,setLoading]=useState(false)
   const [objectInit, setObjectInit] = useState({
    startDate:null,
    endDate:null,
  })
    
 const handleClose=()=>{
dispatch({type:"CLOSE_DELETE"})
 }
 const handleYes=async(data)=>{
   setLoading(true)
await props.deleteFile()

setLoading(false)
  dispatch({type:"CLOSE_DELETE"})
  
  
   }

    return (
    <div>
     
      <Dialog
        open={props.openDelete}
        onClose={ handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="red">{props.infoDelete.title}</DialogTitle>
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.infoDelete.bodyText}
           {/* <div>Si oui, précisez l'année universitaire:</div> */}
           <Formik
              enableReinitialize={true}
              initialValues={objectInit}
              onSubmit={handleYes}
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
  <div style={{maxWidth:300}}>
                  
                
                          </div>        
                  
      {/* <Button onClick={()=>saveDoc() } color="primary" variant="outlined" >Enregistrer</Button> */}
      <div className="d-flex justify-content-center mt-2">
      <Button onClick={handleSubmit} color="primary" variant="outlined" className="mx-1">
            Oui
          </Button>
          <Button onClick={handleClose} color="secondary" variant="outlined" className="mx-1" >
           Non
          </Button>
          </div>
                        </div>
                 
                </Form>
              )}
            />
    
          </DialogContentText>
        </DialogContent>
        </LoadingOverlay>
        <DialogActions>
         
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps=(state)=>{
    return {
        openDelete:state.alertReducer.openDelete,
        infoDelete:state.alertReducer.infoDelete,

    }
}

export default connect (mapStateToProps) (AlertDialog);