import React ,{useEffect,useState} from 'react';
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

import {connect} from "react-redux"
import {getAllVideos,} from '../../redux/actions/videosActions'
import SearchByDateModal from './searchVideoByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Loadable from "react-loadable";
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import Container from '@material-ui/core/Container';
import {useNavigate,useParams,useLocation} from "react-router-dom"
import Breadcrumbs from "./breadcrumb"

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const AddVideoModal = Loadable({
  loader: () => import("./addVideoModal"),
  loading
});
const OneVideo = Loadable({
  loader: () => import("./oneVideo"),
  loading
});

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

const ListVideos=(props)=> {
  const classes = useStyles();
const [render,setRender]=useState(false)
const [allVideos,setAllVideos]=useState([])
const [listVideos,setListVideos]=useState([])
const [searchVideos,setSearchVideos]=useState("")
const [loading,setLoading]=useState(false)
const [idTheme,setIdTheme]=useState("")
const [titleTheme,setTitleTheme]=useState()
const [depTitle,setDepTitle]=useState()
const [subDepTitle,setSubDepTitle]=useState()
const location = useLocation();
  var routeState=location.state

const getListVideos=async()=>{
  setLoading(true)

  console.log("routestate video:",routeState)
  var idTheme=""
  let routeStateKeys=Object.keys(routeState)
  for(let el of routeStateKeys){
    if(el.includes("themeId")==true){
      setIdTheme(routeState[el])
      idTheme=routeState[el]
      console.log("idTheme:",idTheme)
  }else if(el.includes("themeTitle")){
    setTitleTheme(routeState[el])
  }else if(el.includes("subDepTitle")==true)
  {setSubDepTitle(routeState[el])
  }
  else{
    setDepTitle(routeState[el])
  }
}
  
try{
const Videos=await props.getAllVideos(idTheme)
console.log("allVideos:",Videos)
// if(titleTheme!="all"){
//    filtredList=Videos.filter((el)=>el.theme==titleTheme)
// setAllVideos(filtredList)
// }else{
//   setAllVideos(Videos)
// }
setAllVideos(Videos)
setLoading(false)
}
catch(e) {
console.log(e)
}
}

useEffect(()=>{
  getListVideos()
},[render])
  


useEffect(()=>{
  setLoading(true)
  if(allVideos!==undefined){
    setListVideos(allVideos.filter(
      item => item.title.toLowerCase().includes(searchVideos.toLowerCase())
    ) );
    }else{
      setRender(!render)
    }
  setLoading(false)
},[searchVideos,allVideos])



const searchEventsByDate=(objDate)=>{
  
  //setObjDate(objDate)
  if(allVideos!==undefined){
  setListVideos(allVideos.filter(
    video => (new Date(video.created) >= new Date(objDate.dateStart) && new Date(video.created) <= new Date(objDate.dateEnd ) )));
  }else{
    setRender(!render)
  }
  
    setLoading(false)
  
}
const loadingSpinner=()=>{
  return (
<div className="loader-view">
                            <CircularProgress />
                          </div>)
}

  return (
    <div>


   
    <div name="allVideo" className="container-video d-flex flex-column justify-content-center "   >
      {/* <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:28,fontWeight:"bolder" ,color:"#3f51b5"}}>Tous les videos</div></div> */}
      
      <div className='container d-flex flex-column align-items-center flex-md-row justify-content-between 'style={{marginBottom:20}}>

      <div className="d-flex justify-content-center ">
<div className="my-2"  style={{fontSize:24, fontWeight:"bolder", marginLeft:10, color:"#666"}}>{titleTheme}</div></div>
<Breadcrumbs level1={depTitle} level2={subDepTitle} level3={"index"} level4={"modules"} current={titleTheme}  />
</div>
<div className="animated slideInUpTiny animation-duration-3">
<div className="animated slideInUpTiny animation-duration-3">
<div className="row mb-md-3">
<div className="col-12">
                  
<div className="jr-card d-print-none">
<div className='container d-flex flex-column align-items-center flex-md-row justify-content-between my-2 mx-auto mx-md-2 '>
  <div style={{fontSize:24, fontWeight:"bolder"}}>Tous les cours</div>
  <div className='d-flex flex-column-reverse flex-md-row  justify-content-md-end my-2 align-items-center'>      
  <OutlinedInput
      variant="outlined"
                  placeholder="Recherche par titre "
                  className="m-1"
                  style={{ width: 250 , height:37 }}
                  size="small"
                  endAdornment={
                    <InputAdornment  position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  onChange={(e) => setSearchVideos(e.target.value)}                
                value={searchVideos}
                />
     
      
      {(props.profile.role=="professor") ? <AddVideoModal  render={()=>setRender(!render)} idTheme={idTheme}/>:""}

                {/* problem searching by date */}
             {/* <SearchByDateModal getListEventsByDate={searchEventsByDate}  />    */}
      </div>
      </div>
      
    
     <div className='mx-md-3 ' >
                
                { (props.isFetching||listVideos===undefined)?<center>Loading ...</center>: (listVideos.length<1?<center>No items!</center>:listVideos.map((el,index)=>(
                  
                     
                   <div className='my-3'>
                   <OneVideo key={el._id}  listItems={listVideos} item={el}  render={()=>setRender(!render)}  depTitle={depTitle} subDepTitle={subDepTitle} themeTitle={titleTheme} />
                   </div>
                   
                   
                   )) )
                }
                 </div>
                 </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}


const mapStateToProps=(state)=>{
  return{
    videos:state.videosReducer.videos,
    isFetching:state.videosReducer.videoIsFetching,
    profile:state.authReducer.profile,
  
  }
}

export default connect (mapStateToProps,{getAllVideos,})(ListVideos)