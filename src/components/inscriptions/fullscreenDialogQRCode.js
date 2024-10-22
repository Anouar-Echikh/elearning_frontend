import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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

const PDFMember = Loadable({
  loader: () => import("./pdf"),
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
  const [close, setClose] = React.useState(true);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setClose(false);
    
  };

  return (
    <div>
         
           
       <Dialog fullScreen open={props.open&&close} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
             Validation par QR Code
            </Typography>
            
          </Toolbar>
        </AppBar>
        
        <PDFMember member={props.member} close={handleClose}/>
      </Dialog>
    </div>
  );
}
