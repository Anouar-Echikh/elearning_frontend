import React, { useEffect,useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import { getAllDeps } from '../../redux/actions/departmentsActions'
import { connect } from "react-redux"

 function DeleteOrg(props) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const [listDepartments, setListDepartments] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //refresh list news component
    props.render()
    //end refresh
  };
  const deleteItemById=async()=>{
      console.log("delete item "+props.item._id+" alert!!")
      await props.deleteItem(props.item._id)
      handleClose()
  }

  const getAllDepOfThisOrg=async()=>{
    try {
      const items = await props.getAllDeps(props.item._id)
      
      setListDepartments(items)
      
    }
    catch (e) {
      console.log(e)
    }
  

  }

  useEffect(()=>{
    getAllDepOfThisOrg()
  },[])

  return (
    <div>
      
     <IconButton aria-label="delete" className="mx-2" onClick={handleClickOpen} >
        <DeleteIcon />
      </IconButton>
      {listDepartments&&listDepartments.length>0?
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Vous ne pouvez pas supprimer cet étalissement:
           <strong>{props.item.name}</strong> car il contient encore des départements.
           </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ok
          </Button>
         
        </DialogActions>
      </Dialog>
      
      :
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Voulez vous vraiment supprimer cette établissement?</p>
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
      </Dialog>
}</div>
  );
}
export default connect(null, { getAllDeps })(DeleteOrg)