import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import { useNavigate } from "react-router-dom"
import moment from "moment"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const listNotifs = [
  { title: " Cours Pédiatrie le 15/02/2021 - FM Monastir", text: "L'administration vous invite à animer un évenement." },
  { title: " Cours ORL le 26/06/2021 - FM Monastir", text: "L'administration vous invite à animer un évenement." }
]
const OneNotification = (props) => {
  const { previousApp, text,link, title, startDate, location, type } = props.notification

  return (
   
      <>
        <MenuItem className="d-flex flex-column align-items-start " style={{whiteSpace: 'normal'}}>
          <p className="my-0 " >{text}</p>
          
          <p className="my-0 " style={{ maxWidth: 240, fontWeight: "bold" }}>Lien de page: <a target="_blank" onClick={()=>props.closePanel()} href={"/#"+link}>Accéder</a></p>
         
        </MenuItem>
        <Divider />
      </>
     
         
      )
 
}

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const navigate=useNavigate() 
  
  const handleToggle = async () => {
    setOpen((prevOpen) => !prevOpen);
    await props.clearNumNotifications()
    
    
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (


    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{margin:5}}>
        <Badge badgeContent={props.numNotifications} color="secondary">
          <NotificationsIcon  />
        </Badge>
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} className="p-2" transition disablePortal >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper style={{ width: 410, paddingTop: 10, }}>
              
              <div style={{ marginLeft: 20,fontSize:16,fontWeight:"bold" }}>Notifications</div>
              <div className="d-flex justify-content-end align-items-center" style={{ marginLeft: 15, marginRight: 10 }}>
                {/* <span style={{ fontWeight: "bolder", fontSize: 15 }}>Nouveau</span> */}
                {/* <Button onClick={() => navigate("/notifications")} size="small" color="primary">Voir tout</Button>
                 */}
              </div>

              <ClickAwayListener onClickAway={handleClose}>


                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ maxHeight: 300, overflow: 'auto' }} >
                  <Divider />
                  {(props.listNotifications && props.listNotifications.length > 0) ? props.listNotifications.map((el, index) => <OneNotification link={el.link} key={index} closePanel={() => setOpen(!open)} notification={el.note} type={el.type} stopNotification={() => props.stopNotification()} redirectToAgendaPage={() => navigate("/calendar")} />) : <p className="container d-flex justify-content-center" ><strong>No notifications!</strong></p>}

                </MenuList>

              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>

  );
}
