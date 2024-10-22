import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
//import {apiDeleteFileFromDiplomaFolder,apiGetListCourseFolders} from "../../api/apiMicrosoft"
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {
  patchComment,
  deleteOneCommentById,
} from "../../redux/actions/commentsActions";
import LoadingButton from "@mui/lab/LoadingButton";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //refresh list news component
    props.refreshListComments();
    
    //end refresh
  };
  const validateComment = async () => {
    setLoading(true);

    let newComment = { ...props.item, validatedByAdmin: true };
    let resp = await props.patchComment(props.item._id, newComment);
    console.log("resp comment:", resp);
    if (resp) {
      
      await props.createNotification("valid");
      setLoading(false);
      handleClose();
    }
  };

 

  return (
    <div>
      <span
        style={{ cursor: "pointer", color: "green" }}
        className="my-0 mx-2"
        onClick={handleClickOpen}
      >
        {props.item.validatedByAdmin ? "Invalider" : "Valider"}
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick // disable ouside click
      >
        <DialogTitle id="alert-dialog-title">{"Avertissement!"}</DialogTitle>
        <DialogContent>
          {props.item.validatedByAdmin ? (
            <DialogContentText id="alert-dialog-description">
              <h3> Voulez-vous invalider ce commentaire?</h3>
              <h4> {props.item.comment}</h4>

              <span style={{ color: "#a10313" }}>
                <b>NB:</b>&nbsp;Une notification sera envoyée aux étudiants |{" "}
                {props.level} |.
              </span>
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              <h3> Voulez-vous valider ce commentaire?</h3>
              <h4> {props.item.comment}</h4>

              <span style={{ color: "#a10313" }}>
                <b>NB:</b>&nbsp;Une notification sera envoyée aux étudiants.
              </span>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading} color="secondary">
            Non
          </Button>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<TaskAltIcon />}
            variant="outlined"
            onClick={() => validateComment()}
          >
            Valider
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { patchComment })(AlertDialog);
