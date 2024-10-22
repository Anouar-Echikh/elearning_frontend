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
 



const  DeleteCourse =(props)=> {
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
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Voulez-vous vraiment quitter l'application?</p>
          
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={()=>confirm()}  color="disabled">
            Oui
          </Button>
          <Button onClick={()=>props.close()} variant="outlined" color="secondary" autoFocus>
            Non
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

export default (DeleteCourse)