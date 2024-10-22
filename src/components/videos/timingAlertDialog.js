import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect,useDispatch} from "react-redux"
const  AlertDialog=(props)=> {
   const dispatch=useDispatch()
    
 const handleClose=()=>{
dispatch({type:"CLOSE_T"})
 }
    return (
    <div>
     
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="red">{props.info.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         <div className='d-flex flex-column justify-content-center align-items-center'>
         {props.info.bodyText}
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps=(state)=>{
    return {
        open:state.alertReducer.openT,
        info:state.alertReducer.info,

    }
}

export default connect (mapStateToProps) (AlertDialog);