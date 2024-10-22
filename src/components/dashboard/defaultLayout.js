import React,{useState} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Loadable from "react-loadable";

import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@mui/material/Typography";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {  Link, Route, Routes } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import routes from "../../routes";
import ModifyUser from "../users/modifyUserProfileModal"
import {useNavigate} from "react-router-dom"

import Collapse from "@material-ui/core/Collapse";
//to compose multiple HC
import { compose } from "recompose";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { connect } from "react-redux";
import { user_logout, lockUser } from "../../redux/actions/authActions";
import { getUserById } from "../../redux/actions/usersActions";
import { getAllNotificationSortedByDateAndLimited, setToReadenNotification } from "../../redux/actions/notificationActions"

import navSuperAdminList from "./navSuperAdminList"
import navDepAdminList from "./navDepAdminList"
import navOrgAdminList from "./navOrgAdminList"
import navProfList from "./navProfList"
import ProfileListMenu from "./profileListMenu"
import NotificationComponent from "./notificationsListMenu";
import io from "socket.io-client"
import SkeletonDrawer from "./skeletonDrawer";
import AlertUserActivation from "./alert_activation";
import AlertUserLogout from "./alert_logout";


const thisSessionId = Math.random().toString(36).substr(2, 9);
localStorage.setItem("SocketSessionId",thisSessionId)
    


//Styling drawer

const drawerWidth = 210;
const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
backgroundColor:"white",
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 5,
    marginTop: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#231955",
     color: "#fff"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  sidebarHeader: {},
  h2: {
    padding: "16px 0",
    margin: "auto 0"
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      //display: "none"
      fontSize: 14,
      color:"#231955",
      fontWeight:"bold"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
      display: "block",
      color:"#231955",
      fontWeight:"bold"
    }
  },

  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  DrawerAvatar: {
    marginTop: 20,
    marginBottom: 10,
    width: 80,
    height: 80,
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  toolBarAvatar: {
    marginTop: 0,
    marginBottom: 0,
    width: 40,
    height: 40,
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  rootListItem:{
    borderTopRightRadius: "10% ",
    borderBottomRightRadius: "10%",
    "&$selected": {
      backgroundColor: "#1F4690",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "#1F4690",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "#1F4690",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  }
  
  ,
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});



const DefaultLayoutComponent =(props)=> {
  
  const [mobileOpen,setMobileOpen]=useState(false)
  const [anchorEl,setAnchorEl]=useState(null)
  const [mobileMoreAnchorEl,setMobileMoreAnchorEl]=useState(null)
  
  const [titles,setTitles] = useState([]);
  const [logout, setLogout] = useState(false);
  const [navigationList,setNavigationList] = useState([]);
const navigate =useNavigate()


const getNavList=(role)=>{
  switch (role) {
    case "superAdmin":
      return navSuperAdminList;
      case "Administrateur":
      return navSuperAdminList;
      case "professor":
        return navProfList;
      case "depAdmin":
        return navDepAdminList;
        case "orgAdmin":
          return navOrgAdminList;
    default: return []
      
  }
}

//---------- Notification socket io ---------------------

const [notifications, setNotifications] = useState([])
const [updatedList, setUpdatedList] = useState(false)
const [numNotifications, setNumNotifications] = useState(0)
const [socket123, setSocket123] = useState()

React.useEffect(() => {
  const socket = io(process.env.REACT_APP_STUDENT_URL);
  // Initiates the connection when the user visits the page, sending up the clients
  // unique ID

  socket.emit('connectInit', localStorage.getItem("SocketSessionId"));
  setSocket123(socket)
  //socket.emit('stop', "hello");  

  socket.on("notificationsProf",async data => {

     await getListNotifications()
   // setUpdatedList(!updatedList)
    console.log("[Frontend] => NotificationProf..", data)
    console.log(notifications)

    // dispatch({type:FILE_UPLOAD_PROGRESS,payload:data})
    // We use Object.assign({}, obj) to create a copy of `obj`.

  })
  socket.on("refresh",async data => {

    await getListNotifications()
  // setUpdatedList(!updatedList)
  // console.log("[Frontend] => NotificationProf..", data)
   //console.log(notifications)

   // dispatch({type:FILE_UPLOAD_PROGRESS,payload:data})
   // We use Object.assign({}, obj) to create a copy of `obj`.

 })
  return () => socket.disconnect();
}, [])

const getListNotifications = async () => {
  let obj = await props.getAllNotificationSortedByDateAndLimited()
  if(obj){
let { notifications, nb }=obj
  
  if (notifications != undefined) {
    setNumNotifications(nb)
    setNotifications(notifications)
    console.log("notifs:",notifications)
  }
}
}

React.useEffect(() => {
  getListNotifications()

}, [updatedList])

const setNotificationsToreaden = async () => {
  setNumNotifications(0)
  await props.setToReadenNotification(props.profile._id);
};


//-------------------------------------------------------

  

  const handleCollapsListMenuClick = e => {
   setTitles(state => ({...state,[e.title]:!state[e.title]}))
    
    if(e.children.length<1){
      navigate(e.url);
    //close drawer
    setMobileOpen( false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleProfileMenuOpen = event => {
    setAnchorEl( event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handlClickListItem = link => {
    navigate(link);
    //close drawer
    setMobileOpen(false);
  };

 
    const { classes, theme, match } = props;
    //const { anchorEl, mobileMoreAnchorEl } = tstate;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        
        <ModifyUser handleMenuClose={handleMenuClose} item={props.profile}/>
        <MenuItem
          onClick={() => {
            props.user_logout();
            //this.props.push("/login");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton >
            <Badge badgeContent={4} color="secondary">
              <MailIcon sx={{ color: "#1e2d53" }}/>
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton >
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon  sx={{ color: "#1e2d53" }}/>
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          {/* <IconButton color="inherit">
            <AccountCircle />
          </IconButton> */}
          <Avatar
            alt="Remy Sharp"
            src={
              props.profile.image
                ? props.profile.image.idFile
                : require("../../assets/images/123.jpg")
            }
            className={classes.toolBarAvatar}
          />
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    // loading drawer
    const loading = () => (
      <SkeletonDrawer classes={classes}/>
     );
     
     const DrawerComponent = Loadable({
       loader: () => import("./drawer"),
       loading
     });
   

    return (
      <div className={classes.root}>
        <AlertUserActivation
        open={props.profile.active === "inactive"}
        logout={()=>props.user_logout()}
      />
      <AlertUserLogout
        open={logout}
        logout={()=>props.user_logout()}
        close={() => setLogout(false)}
      />
        <CssBaseline />
        <div className="d-print-none">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar classes={classes.toolbar}>
              <IconButton
                
                aria-label="Open drawer"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon sx={{ color: "#1e2d53" }}/>
              </IconButton>
              <Typography
                className={classes.title}
                variant="h7"
                noWrap
              >
              E-Learning Academy
              </Typography>

              <div className={classes.grow} />

              <div className="my-0">
              
                <NotificationComponent listNotifications={notifications} clearNumNotifications={() => setNotificationsToreaden()} numNotifications={numNotifications}  />
                <ProfileListMenu logout={() => setLogout(true)}  user={props.profile} />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        {renderMenu}
        {renderMobileMenu}
        <div className="d-print-none">
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={props.container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <DrawerComponent 
                classes={classes} 
                titles={titles} 
                handlClickListItem={handlClickListItem} 
                handleCollapsListMenuClick={handleCollapsListMenuClick} 
                getNavList={getNavList} 
                props={props}/>
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                <DrawerComponent 
                classes={classes} 
                titles={titles} 
                handlClickListItem={handlClickListItem} 
                handleCollapsListMenuClick={handleCollapsListMenuClick} 
                getNavList={getNavList} 
                props={props}
                />
             
              </Drawer>
            </Hidden>
          </nav>
        </div>
        <div className="app-main-container">
          <div className="app-header d-print-none" />
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <div className="app-wrapper">
              <Routes>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        element={<route.component />}
                      />
                    ) : null;
                  })}
                </Routes>
              
              </div>
            </div>
            <footer className="app-footer d-print-none d-flex justify-content-center justify-content-md-between flex-md-row flex-column " >
              <span className="">Copyright E-Learning Academy © 2024</span>
              <span className="">Developed by ND-TECH</span>
            </footer>
          </main>
        </div>
      </div>
    );
  }


DefaultLayoutComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = ({ authReducer }) => {
  return {
    profile: authReducer.profile,
    isAuth: authReducer.isAuth
  };
};

const ComposedLayout = compose(
  
  withStyles(styles, { withTheme: true })
)(DefaultLayoutComponent);

const DefaultLayout = connect(mapStateToProps, {
  user_logout,
  lockUser,
  getUserById,
  getAllNotificationSortedByDateAndLimited, setToReadenNotification
})(ComposedLayout);
export default DefaultLayout;
