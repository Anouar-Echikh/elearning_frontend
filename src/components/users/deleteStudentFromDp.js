import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //refresh list news component
    props.render()
    //end refresh
  };
  const deleteUserById=async()=>{
      //console.log("delete user "+props.item._id+" alert!!")
      await props.deleteOneUserById(props.item)
      handleClose()
  }

  return (
    <div>
      
     <IconButton aria-label="delete" className="m-2" onClick={handleClickOpen} >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Voulez vous vraiment supprimer l'étudiant(e)?</p>
            <h4> {props.item&&props.item.student.name}</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={()=>deleteUserById()} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
