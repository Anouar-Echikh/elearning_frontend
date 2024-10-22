import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect,useDispatch} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor:'rgba(0,0,30,0.4)'
  },
}));


const  AlertDialog=(props)=> {
   const dispatch=useDispatch()
   const classes = useStyles();
 const handleClose=()=>{
dispatch({type:"CLOSE"})
 }
    return (
    <div>
     
      <Dialog
        open={props.open}
        onClose={ handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" color="red">{props.info.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.info.bodyText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
         
          <Button onClick={()=>{props.removeChapter(props.info);handleClose()}} color="primary" autoFocus>
            Oui
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps=(state)=>{
    return {
        open:state.alertReducer.open,
        info:state.alertReducer.info,

    }
}

export default connect (mapStateToProps) (AlertDialog);