import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import moment from "moment"
//import { apiDeleteFileFromFolder, apiGetListCourseFolders } from "../../api/apiMicrosoft"
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import {apiDeleteFileFromServer} from '../../api/apiDownload'
import {deleteManyCommentsByPostId} from "../../redux/actions/commentsActions"
import {connect} from "react-redux"

import { useSnackbar } from 'notistack';

const  DeleteAlertDialog=(props)=> {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const [isSaving,setIsSaving]=useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //refresh list news component
    props.render()
    //end refresh
  };

  const deleteFileFromServer=async(file)=> {
    let path = file.idFile.slice(1)
    console.log("path:",path)
    let data={
        path,
        fileName:file.name
    }
  let {data:{success}}=  await apiDeleteFileFromServer(data)
  console.log("resUnlink:",success)
  return success
  }



  const deleteItemById = async () => {
    setIsSaving(true)
//delete list files
let listFiles=props.item.files
for (let file of listFiles ){
  let bool=await deleteFileFromServer(file)
  console.log("deleted File status:",bool)
}
// delete all comments 
let resp=await props.deleteManyCommentsByPostId(props.item._id)

    console.log("comments deleted:", resp)

    const result = await props.deleteItem(props.item._id)
    console.log("delete formation:", result)
    
   
    setIsSaving(false)
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
          <DialogContentText id="alert-dialog-description" >
            <p> Voulez vous vraiment supprimer cette video? :</p>
            <div style={{ color: "black" }}>
            <p><strong>Titre</strong>   : {props.item.title}</p>
                       
            
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <div  style={{margingTop:30,marginLeft:30,height:30}}>
                          <Fade
                            in={isSaving}
                            style={{
                              transitionDelay: isSaving
                                ? "600ms"
                                : "0ms",
                              marginTop: 10,
                              marginLeft: 10
                            }}
                            unmountOnExit
                          >
                            <CircularProgress size={20} value={100} />
                          </Fade>
                          </div>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={() => deleteItemById()} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, { deleteManyCommentsByPostId})(DeleteAlertDialog);