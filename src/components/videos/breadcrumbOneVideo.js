import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useNavigate,useLocation } from 'react-router-dom';

export default function IconBreadcrumbs(props) {
  const navigate = useNavigate();
  function handleClick(val) {
   // event.preventDefault();
    navigate(val)
  }

  return (
    <div role="presentation"  style={{padding:12, backgroundColor:"#F4EFEE",borderRadius:20, fontSize:14}}>
      <Breadcrumbs aria-label="breadcrumb">
        
          
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor:"pointer" }}
          color="inherit"
          onClick={()=>navigate(-4)}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Acceuil
        </Link>
         

       { props.level1 ? <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center',cursor:"pointer" }}
          color="inherit"
          
          onClick={()=>navigate(-3)}
        >
        {props.level1 }

        </Link>:""}

        { props.level2 ? <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center',cursor:"pointer" }}
          color="inherit"
          
          onClick={()=>navigate(-1)}
        >
        {props.level2 }

        </Link>:""}
        { props.level3 ? <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center',cursor:"pointer" }}
          color="inherit"
          
          onClick={()=>navigate(-1)}
        >
        {props.level3 }

        </Link>:""}
       
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >         
          {props.current}
        </Typography>

      </Breadcrumbs>
    </div>
  );
}
