import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import { KeyboardDatePicker } from 'material-ui-formik-components/KeyboardDatePicker'
import { Row, Col } from "reactstrap";
import FilterIcon from "@material-ui/icons/FilterListRounded";
import {connect} from "react-redux"
import {deleteOneEventById} from '../../redux/actions/eventActions'
import moment from "moment"


const  DeleteEvent =(props)=> {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  // const deleteEvent= async(idEvent)=>{
  //  const result=  await props.deleteOneEventById(idEvent)
  //    console.log("deleteResult:",result)
  //    props.setAllowSearchByText(false)
  //    props.render() // to force listEvents component to rerender
  //  handleClose()
  // }

  const searchEvt=async(obj)=>{
   let dateEnd= moment(obj.dateEnd).format("DD-MM-YYYY")
   let dateStart= moment(obj.dateStart).format("DD-MM-YYYY")
    
   console.log("objDate:",obj)
   console.log("ssssssss:",Date(dateStart))
   if(Date(dateStart)<=Date(dateEnd)){
   await props.getListEventsByDate(obj)
     //props.setAllowSearchByText(false)
    // props.render() // to force listEvents component to rerender
     setOpen(false);
  }else{
setShow(true)
  }
  }
    
  

  const showAlert=()=>(
    <h5 style={{color:"red"}}>* La date "Fin" doit ètre supérieur à la date "Début"!</h5>
  )
  return (
    <div>
       {/* search by date */}
       <div>
               <Formik
              enableReinitialize={true}
              initialValues={{ dateStart: null,
              dateEnd: null}}
              onSubmit={searchEvt}
              validationSchema={Yup.object().shape({
                dateStart: Yup.date().nullable().required("Veuillez ajouter une date!"),
                dateEnd: Yup.date().nullable().required("Veuillez ajouter une date!"),
                
              })}
              render={({
                /** props given by formik */
                handleSubmit,
                errors,
                touched
              }) => (
                  <Form>
      
      <Button
        variant="outlined"
        className="m-1"
        onClick={handleClickOpen}
        endIcon={<FilterIcon/>}
        style={{width:250}}
      >
       Recherche par date
      </Button>
      {/* <IconButton aria-label="modify" className="" onClick={handleClickOpen}>
      <DeleteIcon/>
      </IconButton> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">{"Recherche par date:"}</DialogTitle>
        
        <DialogContent>
        {show==true?showAlert():""}
                    <div>
                    
                      Entre :
                              <Field
                                component={KeyboardDatePicker}
                                autoOk={false}
                                id="dateStart"
                                name="dateStart"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                                          placeholder="Entrer la date .."
                                label="Début "
                                fullWidth
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                error={errors.dateStart && touched.dateStart}
                                helperText={
                                  errors.dateStart && touched.dateStart ? errors.dateStart : null
                                }
                              />
                              et :
                              <Field
                                component={KeyboardDatePicker}
                                autoOk={false}
                                id="dateEnd"
                                name="dateEnd"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                               
                                placeholder="Entrer la date .."
                                label="Fin "
                                fullWidth
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                error={errors.dateEnd && touched.dateEnd}
                                helperText={
                                  errors.dateEnd && touched.dateEnd ? errors.dateEnd : null
                                }
                              />

                            

                       
                     {/* <Row className="d-flex justify-content-center ">


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
                          </div> 

                      </Row> */}
                    </div>
                 
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSubmit} color="primary" autoFocus>
            Recherche
          </Button>
          <Button onClick={handleClose} color="secondary">
            Fermer
          </Button>
          
        </DialogActions>
        
      </Dialog>
      </Form>
                )}
            />
                 </div>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{

  }
}

export default connect (mapStateToProps,{deleteOneEventById})(DeleteEvent)