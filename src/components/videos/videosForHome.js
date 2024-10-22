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
import Button from "@material-ui/core/Button";
import {connect} from "react-redux"
import {getAllVideos,} from '../../redux/actions/videosActions'
import SearchByDateModal from './searchVideoByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Loadable from "react-loadable";
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import DoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
const [idTheme,setIdTheme]=useState()
const [titleTheme,setTitleTheme]=useState()
let history = useHistory();

const getListVideos=async()=>{
  setLoading(true)
  
try{
const Videos=await props.getAllVideos()
console.log("allVideos:",Videos)
if(titleTheme!="all"){
  let sortedList=Videos.sort((a,b)=>b.created - a.created);
  console.log("sortedVideos:",sortedList)
setAllVideos(sortedList)
}else{
  setAllVideos(Videos)
}
setLoading(false)
}
catch(e) {
console.log(e)
}
}

useEffect(()=>{
  getListVideos()
},[render])
  
const goToPage = (url,item) => {
  localStorage.setItem("videoId", item._id)
  localStorage.setItem("videoName", item.title)
  history.push(url);
}

const goToPageVideo=(url)=> {
  localStorage.setItem("themeTitle", "all")
  history.push(url);
}

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


const getDuration = date => {
  //using moment.js
  const dateFormatted = moment(date).format();
  const dateCreation = moment(dateFormatted);
  const currentDate = moment();
  //difference entre les deux dates
  const duration = moment.duration(currentDate.diff(dateCreation));
  // conditional return
  if (duration.years() > 0) {
    if (duration.years() === 1) {
      return `il y a 1 an`;
    } else {
      return `il y a ${duration.years()} ans`;
    }
  } else if (duration.months() > 0) {
    if (duration.months() === 1) {
      return `il y a 1 mois`;
    } else {
      return `il y a ${duration.months()} mois`;
    }
  } else if (duration.weeks() > 0) {
    if (duration.weeks() === 1) {
      return `il y a 1 sem`;
    } else {
      return `il y a ${duration.weeks()} sem`;
    }
  } else if (duration.days() > 0) {
    if (duration.days() === 1) return `il y a 1 j`;
    else return `il y a ${duration.days()} j`;
  } else if (duration.hours() > 0) {
    if (duration.hours() === 1) return `il y a 1 h`;
    else return `il y a ${duration.hours()} h`;
  } else if (duration.minutes() > 0) {
    if (duration.minutes() === 1) return `il y a 1 min`;
    else return `il y a ${duration.minutes()} min`;
  } else {
    if (duration.seconds() < 10) return `il y a quelques seconds`;
    else return `il y a ${duration.seconds()} s`;
  }
};

  return (

<div className="d-flex flex-column justify-content-center container"> 

{/* <Carousel
  additionalTransfrom={0}
  arrows
  autoPlay={true}
  autoPlaySpeed={3000}
  centerMode={false}
  className="container"
  containerClass="d-none d-lg-flex container"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 576,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 576
      },
      items:2,
      partialVisibilityGutter: 30
    }
  }}
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
 
>
  {
  
  listVideos.map((item,index)=>(index<5?
  <span className='m-2' style={{backgroundColor:"white"}}>
    <ReactPlayer
    
    url={item&&item.urlVideo}
    controls={false}
    width={250}
    height={230}
    config={{
      youtube: {
        embedOptions: { rel: 0 }
      }
    }}
/>
<div className="py-3 mr-3 " dir="auto">
<div className="  p-1" style={{fontWeight:"bold",fontSize:16, }}>{item.title}</div>
<div className="  p-1" style={{ fontSize:12, }}>{item.prof}</div>
<div className="  p-1" style={{color:"grey",fontSize:12, }}>{item.created&&getDuration(item.created)}</div>
<Button
            endIcon={<DoubleArrowRightIcon />}
            color="primary"
            variant="outlined"
            
            onClick={() => { goToPage(`/videos/${item._id}/${item.title.replace(/\s/g, '')}`,item) }}
            style={{width:100, fontWeight: "bold", fontSize: 12, marginTop: 10, borderRadius: 30 }}>Détails</Button>

</div>
</span>
  :<></>))} 
</Carousel> */}
<div name="sponsor" className="mx-3  d-flex flex-wrap justify-content-center" style={{textAlign:"center"}}>
{
  
  listVideos&&listVideos.map((item,index)=>(index<4?
  <span className='m-2 ' >
    <ReactPlayer
    
    url={item&&item.urlVideo}
    controls={false}
    width={250}
    height={230}
    config={{
      youtube: {
        embedOptions: { rel: 0 }
      }
    }}
/>
<div className="py-3 mr-3 " dir="auto">
<div className=" px-1 pt-1" style={{fontWeight:"bold",fontSize:16, }}>{item.title}</div>
<div className="  p-1" style={{ fontSize:12, }}>{item.prof}</div>
<div className=" px-1 pb-1" style={{color:"grey",fontSize:12, }}>{item.created&&getDuration(item.created)}</div>
<Button
            endIcon={<DoubleArrowRightIcon />}
            color="primary"
            variant="outlined"
            
            onClick={() => { goToPage(`/videos/${item._id}/${item.title.replace(/\s/g, '')}`,item) }}
            style={{width:100, fontWeight: "bold", fontSize: 12, marginTop: 10, borderRadius: 30 }}>Détails</Button>

</div>
</span>
  :<></>))}

</div>
<div className="container d-flex justify-content-center">
<Button endIcon={<ArrowRightAltIcon />} color="primary" style={{width:252, marginTop:10}} onClick={()=>goToPageVideo(`/videos`)}  > Voir tout les cours </Button>
</div>
</div>

    )
    }

const mapStateToProps=(state)=>{
  return{
    videos:state.videosReducer.videos,
    isFetching:state.videosReducer.videoIsFetching,
    currentUser:state.authReducer.profile,
  
  }
}

export default connect (mapStateToProps,{getAllVideos,})(ListVideos)