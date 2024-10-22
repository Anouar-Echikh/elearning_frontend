import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
//import {apiDeleteFileFromDiplomaFolder,apiGetListCourseFolders} from "../../api/apiMicrosoft"
import { useSnackbar } from 'notistack';
import {connect} from 'react-redux'
import {patchComment,deleteOneCommentById} from "../../redux/actions/commentsActions"
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/DeleteRounded';


function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
  };
 
const deleteComment=async()=>{
  setLoading(true)
  await props.deleteRespComment()
  setLoading(false)
  setOpen(false);
}
  
  return (
    <div>
      {/* <span style={{cursor:"pointer"}} className="my-0 mx-2" onClick={()=>deleteRespComment(item._id)}>Supprimer</span> */}
     <span style={{cursor:"pointer"}} className="my-0 mx-2" onClick={handleClickOpen}>Supprimer</span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
        
          <DialogContentText id="alert-dialog-description">
           <h3> Voulez-vous vraiment supprimer ce commentaire?</h3>
           <h4> {props.item.comment}</h4>
           
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading} color="primary">
            Non
          </Button>
          <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<DeleteIcon />}
        variant="outlined"
        onClick={()=>deleteComment()}
      >
       Supprimer
      </LoadingButton>
         
        </DialogActions>
      </Dialog>
    </div>
  );
        }

const mapStateToProps=(state)=>{
  return{

  }
}

export default connect (mapStateToProps,{patchComment})(AlertDialog);
