import React ,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {connect} from "react-redux"
import {getAllVideos,} from '../../../../redux/actions/videosActions'

import moment from "moment"
import Container from '@material-ui/core/Container';
import AccountComponent from "./adminModifyUser"


const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const AccountPage=(props)=> {
  const classes = useStyles();


  




  return (
    <div>

{/* <div className='full-container ' style={{marginBottom:20,position:"relative",marginTop:40}} >
      
    <img className="" style={{width:1400,minWidth:1000,maxWidth:'100%',maxHeight:'100%'}}  src={require("../../../imges/header/courses.png")}/>
    <span className='mainHeaderText1' style={{position:"absolute", top:"50%",left:"20%",color:"white", fontWeight:"bold"}}><span>{titleTheme!="all"?titleTheme:"Tout les cours"}</span></span>
    </div> */}
    <Container>
      <div className='full-container justify-content-center' style={{overflow:"hidden", marginBottom: 20, position: "relative", marginTop: 40 }}  >
     
        <img className="" style={{minWidth:1400,maxWidth:'100%',maxHeight:'100%',
     position: 'relative',  
     left: '50%',
     transform:' translate(-50%)'
      }}  src={require("../../../imges/header/courses.png")} />
      
      <span className='mainHeaderText1' style={{position:"absolute", top:"50%",left:"10%",color:"white", fontWeight:"bold"}}><span>Gérer votre compte</span></span>
      
      </div>
      </Container>
    <AccountComponent item={props.currentUser} />
    </div>
  );
}


const mapStateToProps=(state)=>{
  return{
    
    isFetching:state.videosReducer.videoIsFetching,
    currentUser:state.authReducer.profile,
  
  }
}

export default connect (mapStateToProps,{})(AccountPage)