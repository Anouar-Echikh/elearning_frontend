import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import FilterIcon from "@material-ui/icons/FilterListRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
//import OneThemeItem from "./themesItem"
import { connect } from "react-redux"
import { getAllThemes } from '../../redux/actions/themesActions'
//import SearchByDateModal from './searchThemesByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import moment from "moment"
//import AddThemeModal from "./addThemeModal"
import {useNavigate,useParams,useLocation} from "react-router-dom"
import Container from '@material-ui/core/Container';
import Breadcrumbs from "./breadcrumb"
import "./style.css"


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



const SubDepartmentIndex = (props) => {
  const classes = useStyles();
  const [render, setRender] = useState(false)
  const [allThemes, setAllThemes] = useState([])
  const [listThemes, setListThemes] = useState([])
  const [searchThemes, setSearchThemes] = useState("")
  const [loading, setLoading] = useState(false)
  const [subDepId, setSubDepId] = useState("")
  const [subDepTitle, setSubDepTitle] = useState("")
  const [depTitle, setDepTitle] = useState("")
  const [listStudents, setListStudents] = useState([])
  const [listProf, setListProf] = useState([])
  
  const location = useLocation();
  var routeState=location.state
  
  
  const navigate = useNavigate();
  var subDepIdKey = 'subDepId' + (new Date()).getTime();//use unique title in localstorage
    var subDepTitleKey = 'subDepTitle' + (new Date()).getTime();
    var subDep_depTitleKey = 'subDep_depTitle' + (new Date()).getTime();
    var subDep_listProfKey = 'subDep_listProf' + (new Date()).getTime();
    var subDep_listStudentsKey = 'subDep_listStudents' + (new Date()).getTime();
   
  // console.log("imageUrl:",image)
  const goToPage=(url)=> {
    
    navigate(url,{state:{[subDepIdKey]:subDepId,[subDepTitleKey]:subDepTitle,[subDep_listProfKey]:listProf,[subDep_listStudentsKey]:listStudents,[subDep_depTitleKey]:depTitle}});
    }



  const getListThemes = async () => {
    
    setLoading(true)

    //------------
    
    //-----------

    var idSubDep=""
    let routeStateKeys=Object.keys(routeState)
    for(let el of routeStateKeys){
      if(el.includes("subDepId")==true){
    setSubDepId(routeState[el])
    idSubDep=routeState[el]
    }else if(el.includes("depTitle")){
      setDepTitle(routeState[el])
    }else if(el.includes("subDepTitle")){
      setSubDepTitle(routeState[el])
    }else if(el.includes("listProf")){
        setListProf(routeState[el])
    }else{
        setListStudents(routeState[el])
    }
    }

  }

  useEffect(() => {
    getListThemes()
  }, [render])



  return (
    <div>

      <div name="allThemes" className="container-video d-flex flex-column justify-content-center "  >
        {/* <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:22,fontWeight:"bold" ,color:"#3f51b5"}}></div></div> */}
        <div className='container d-flex flex-column align-items-center flex-md-row justify-content-between 'style={{marginBottom:20}}>

{/* <div className="d-flex justify-content-center "><div className=""  style={{fontSize:22,fontWeight:"bolder" ,paddingLeft:10,color:"#3f51b5",borderLeft: "solid #3f51b5 3px"}}>Thèmes</div></div> */}
<div className="d-flex justify-content-center ">
<div className="my-2"  style={{fontSize:24, fontWeight:"bolder", marginLeft:10, color:"#666"}}>{subDepTitle}</div></div>
<Breadcrumbs level1={depTitle} level2={subDepTitle} current={"index"} />
</div>



  <div className="row1-container">
    
    <div className="box box-down red" onClick={()=>goToPage(`/themes/${subDepTitle}`)} style={{cursor:"pointer"}} >
      
      {/* <p>Uses data from past projects to provide better delivery estimates</p> */}
      <img src={require("../../imgs/modules.png")} style={{width:90,height:70,marginBottom:20}} alt="" />
      <h2>Modules</h2>
    </div>
    <div className="box box-down blue" onClick={()=>goToPage(`/dep-professors`)} style={{cursor:"pointer"}}>
     
      {/* <p>Uses data from past projects to provide better delivery estimates</p> */}
      <img src={require("../../imgs/teachers.png")}  style={{width:80,height:70,marginBottom:20}} alt=""/>
      <h2>Professeurs</h2>
    </div>
    <div className="box box-down orange" onClick={()=>goToPage(`/dep-students`)} style={{cursor:"pointer"}}>
     
      {/* <p>Uses data from past projects to provide better delivery estimates</p> */}
      <img src={require("../../imgs/students.png")} style={{width:80,height:70,marginBottom:20}} alt=""/>
      <h2>Etudiants</h2>
    </div>
  </div>
  {/* <div className="row2-container">
    <div class="box orange">
      <h2>Karma</h2>
      <p>Regularly evaluates our talent to ensure quality</p>
      <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt=""/>
    </div>
  </div> */}
  




      </div>
      </div>
      
  );
}


const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsorsReducer.sponsors,
    isFetching: state.sponsorsReducer.sponsorIsFetching,
    profile: state.authReducer.profile,

  }
}

export default connect(mapStateToProps, {})(SubDepartmentIndex)