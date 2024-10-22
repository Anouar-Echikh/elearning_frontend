import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@mui/material/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
//import ModifyProgram from "./modifyProgram"
import Loadable from "react-loadable";
import {useDispatch} from "react-redux"

const loading = () => (
    <div className="animated fadeIn pt-3 text-center">Loading...</div>
  );

  const AddItem = Loadable({
    loader: () => import("./importExelDoc"),
    loading
  });

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color:'white'
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
const dispatch=useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose =async () => {
    setOpen(false);
    //refresh list news component
    await props.render()
    //end refresh
  //  dispatch({ type: "CLEAR_STATE_ONE_FILE" })
  };

  return (
    <div>
         
         <Button endIcon={<CloudUploadIcon/>} variant="contained" onClick={handleClickOpen}  color="primary" className=" m-1"  >Importer Excel</Button>
        
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Activer/Désactiver des étudiants 
            </Typography>
            
          </Toolbar>
        </AppBar>
        
       <AddItem  closeAddModal={()=>handleClose()} year={props.year}  listStudents={props.listStudents} subDepId={props.subDepId} patchSubDep={props.patchSubDep}/>
      </Dialog>
    </div>
  );
}
