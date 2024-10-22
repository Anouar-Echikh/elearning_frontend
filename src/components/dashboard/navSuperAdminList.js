import React from "react"

import HomeIcon from '@mui/icons-material/Home';

import SvgIcon from '@material-ui/core/SvgIcon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


export default [
    {
      title: "Acceuil",
      url: "/home",
      icon: HomeIcon,
      children: []
    },
    
    {
      title: "Établissements",
      url: "/etablissements",
      icon: AccountBalanceIcon,
      children: []
    },
    
    {
      title: "Administrateurs",
      url: "/administrateurs",
      icon: SupervisedUserCircleIcon,
      children: [ ]
    },
    {
      title: "Non affectés",
      url: "/non-affected-users",
      icon: SupervisedUserCircleIcon,
      children: [ ]
    },
  ]