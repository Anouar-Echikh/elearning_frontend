import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import {deleteManyVideoById} from "../../redux/actions/videosActions"
import {connect} from "react-redux"
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";

const DeleteSponsor=(props) =>{
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const [loading,setLoading]=useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false)
    setOpen(false);
    
  };
  const deleteThemeById=async()=>{
    setLoading(true)
      console.log("delete event "+props.item._id+" alert!!")
     let bool= await props.deleteManyVideoById(props.item._id)
     if(bool){
      await props.deleteThemeItem(props.item._id)

      setOpen(false);
    //refresh list news component
    props.render()
    //end refresh
     }
  }

  return (
    <div>
      
     <IconButton aria-label="delete" className="mx-2" onClick={handleClickOpen} >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <LoadingOverlay
                    active={loading}
                    spinner={<BeatLoader size={10} color={"#40A4EB"} />}
                    styles={{
                      overlay: base => ({
                        ...base,
                        background: "  rgba(252, 252, 252, 0.61)"
                      })
                      
                    }}
                  >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <p> Voulez vous vraiment supprimer ce module:
           <strong> {props.item.title}</strong>
           </p>
           <p style={{color:"red", fontWeight:"bold"}}>NB: Tous les videos de ce module seront supprimées !</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={()=>deleteThemeById()} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
        </LoadingOverlay>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(null, { deleteManyVideoById })(DeleteSponsor);