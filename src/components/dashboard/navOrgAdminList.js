import React from "react"
import DashboardIcon from "@material-ui/icons/Dashboard";
import Group from "@mui/icons-material/Group";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import ListIcon from "@material-ui/icons/List";
import StoreIcon from "@material-ui/icons/Store";
import DvrIcon from '@material-ui/icons/Dvr';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventIcon from '@material-ui/icons/Event';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import InfoIcon from '@material-ui/icons/Info';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppsIcon from '@material-ui/icons/Apps';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import BallotIcon from '@material-ui/icons/Ballot';
//import QrCodeScannerIcon from '@material-ui/icons/QrCodeScanner';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ClassIcon from '@mui/icons-material/Class';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SchoolIcon from '@mui/icons-material/School';



function QrCodeScannerIcon(props) {
  return (
    <SvgIcon {...props}>
       <rect xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24"/>
        
      <path xmlns="http://www.w3.org/2000/svg" d="M9.5,6.5v3h-3v-3H9.5 M11,5H5v6h6V5L11,5z M9.5,14.5v3h-3v-3H9.5 M11,13H5v6h6V13L11,13z M17.5,6.5v3h-3v-3H17.5 M19,5h-6v6 h6V5L19,5z M13,13h1.5v1.5H13V13z M14.5,14.5H16V16h-1.5V14.5z M16,13h1.5v1.5H16V13z M13,16h1.5v1.5H13V16z M14.5,17.5H16V19h-1.5 V17.5z M16,16h1.5v1.5H16V16z M17.5,14.5H19V16h-1.5V14.5z M17.5,17.5H19V19h-1.5V17.5z M22,7h-2V4h-3V2h5V7z M22,22v-5h-2v3h-3v2 H22z M2,22h5v-2H4v-3H2V22z M2,2v5h2V4h3V2H2z"/>
    
    </SvgIcon>
  );
}
export default [
        
    {
      title: "Etablissement",
      url: "/org-setting",
      icon: AccountBalanceIcon,
      children: []
    },
    {
      title: "Départements",
      url: "/departments/",
      icon: AccountTreeIcon,
      children: [ ]
    },
   
    {
      title: "Professeurs",
      url: "/professors",
      icon:Group,
      children: []
    },
    {
      title: "Administrateurs",
      url: "/administrateurs",
      icon: SupervisedUserCircleIcon,
      children: [ ]
    },
    {
      title: "Utilisateurs",
      url: "/org-non-affected-users",
      icon: SupervisedUserCircleIcon,
      children: [ ]
    },
  ]