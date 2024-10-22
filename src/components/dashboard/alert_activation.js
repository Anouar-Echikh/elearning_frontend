import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import {connect} from "react-redux"
 



const  Alert =(props)=> {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

 const handleClose = () => {
    //props.render() // to force listEvents component to rerender
    setOpen(false);
  };
  
    const confirm=()=>{
      props.logout()
     }

  return (
    <div>
    
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Compte désactivé!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Votre compte est désactivé pour le moment,</p>
           <p> veuillez contacter l'administrateur pour l'activer.</p>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={()=>confirm()} color="primary" >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps=(state)=>{
  return{

  }
}

export default (Alert)