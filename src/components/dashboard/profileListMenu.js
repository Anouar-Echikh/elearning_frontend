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
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import {connect} from "react-redux"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));


const MenuListComposition=(props)=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const navigate = useNavigate()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);

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

 

const goToParamsPage=()=>{
  if(props.profile.role=="orgAdmin"){
    navigate("/org-setting")
    setOpen(false);
  }
   if(props.profile.role=="depAdmin"){
    navigate("/dep-setting")
   }
  }


  return (


    <>

      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="lightGrey"
      >
        <Avatar srcSet={props.user&&props.user.image&&props.user.image.idFile} sx={{ width: 32, height: 32 }} />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} className="p-2" transition disablePortal >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper style={{ width: 270, paddingTop: 10, }}>
              <div style={{ marginLeft: 20, fontSize: 16, fontWeight: "bold" }}>{props.user&&props.user.name}</div>
              <div style={{ marginLeft: 20, color: "grey", fontSize: 12, }}>{props.user&&props.user.local&&props.user.local.email}</div>
              <div className="d-flex justify-content-end align-items-center" style={{ marginLeft: 15, marginRight: 10 }}>
                {/* <span style={{ fontWeight: "bolder", fontSize: 15 }}>Nouveau</span> */}
                {/* <Button onClick={() => navigate.push("/notifications")} size="small" color="primary">Voir tout</Button>
                 */}
              </div>

              <ClickAwayListener onClickAway={handleClose}>


                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ maxHeight: 300, overflow: 'auto' }} >
                  <Divider />
                  <MenuItem onClick={()=>{navigate('/account');setOpen(false)}}>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    Gérer votre compte
                  </MenuItem>
                  <MenuItem onClick={()=>goToParamsPage()}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    Paramètres
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => props.logout()}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    Déconnexion
                  </MenuItem>


                </MenuList>

              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>

  );
}

const mapStateToProps = ({ authReducer }) => {
  return {
    profile: authReducer.profile,
    isAuth: authReducer.isAuth
  };
};

export default connect(mapStateToProps, {})(MenuListComposition)