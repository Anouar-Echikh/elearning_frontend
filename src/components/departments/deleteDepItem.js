import React ,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import {getAllSubDeps} from "../../redux/actions/sub-departmentsActions"
import {connect} from "react-redux"

const DeleteSponsor=(props)=> {
  const [open, setOpen] = React.useState(false);
  const [listFormations, setListFormations] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  
  };
  const deleteItemById=async()=>{
      console.log("delete item "+props.item._id+" alert!!")
      await props.deleteItem(props.item._id)
      setOpen(false);
    //refresh list news component
    props.render()
      
  }

  const getAllFormationsByDepId=async()=>{
    let listFormations=await props.getAllSubDeps(props.item._id)
    setListFormations(listFormations)
  }

  useEffect(()=>{
 getAllFormationsByDepId()
  },[])


  return (
    <div>
      
     <IconButton aria-label="delete" className="mx-2" onClick={handleClickOpen} >
        <DeleteIcon />
      </IconButton>
      {listFormations&&listFormations.length>0?
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Vous ne pouvez pas supprimer ce départment:
           <strong>{props.item.name}</strong> car il contient encore des formations.
           </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ok
          </Button>
         
        </DialogActions>
      </Dialog>
      
      
      
      :<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Voulez vous vraiment supprimer ce département?</p>
           <h4> {props.item.name}</h4>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={()=>deleteItemById()} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(null, { getAllSubDeps })(DeleteSponsor);