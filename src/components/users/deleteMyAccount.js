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
      console.log("delete user "+props.item._id+" alert!!")
      await props.deleteOneUserById(props.item._id)
      handleClose()
  }

  return (
    <div>
      
     {/* <IconButton aria-label="delete" className="m-2" onClick={handleClickOpen} >
        <DeleteIcon />
      </IconButton> */}
      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        className="mt-2 mr-2"
                        size="medium"
                        onClick={handleClickOpen}
                        disabled={false}
                      >
                        Supprimer mon compte
                          </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <h4> {props.item.name},</h4>
           <p> Voulez vous vraiment supprimer définitivement votre compte?</p>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={deleteUserById} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
