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
import {deleteOneEventById} from '../../redux/actions/eventActions'

const  DeleteEvent =(props)=> {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.render() // to force listEvents component to rerender
    setOpen(false);
  };
  const deleteEvent= async(idEvent)=>{
   const result=  await props.deleteOneEventById(idEvent)
     console.log("deleteResult:",result)
   handleClose()
  }

  return (
    <div>
      
      {/* <Button
        variant="outlined"
        className="m-1"
        onClick={handleClickOpen}
        endIcon={<DeleteIcon/>}
      >
       Supprimer
      </Button> */}
      <IconButton aria-label="modify" className="" onClick={handleClickOpen}>
      <DeleteIcon/>
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
            Voulez vous vraiment supprimer cet événement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={()=>deleteEvent(props.idEvent)} color="primary" autoFocus>
            Oui
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

export default connect (mapStateToProps,{deleteOneEventById})(DeleteEvent)