import React, { useRef, useState,useCallback, useEffect } from "react"

import { Row, Col } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RestoreIcon from '@mui/icons-material/Restore';
import {apiCreateCustomBackupforOneVideo,apiDownloadFileFromServer,apiRestoreMongoDB,apiDeleteFileFromServer} from '../../api/apiBackups'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, connect, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import { useLocation } from "react-router-dom"
import Loadable from "react-loadable";
import ReactPlayer from "react-player";

import ListChapters from "./listChapters"
import TabsDescription from './tabsDescription'
import LoadingOverlay from "react-loading-overlay";
import ScaleLoader from "react-spinners/ScaleLoader"
import LoadingButton from '@mui/lab/LoadingButton';
import {getOneVideoById} from "../../redux/actions/videosActions"
import {getAllCommentsByPostId} from "../../redux/actions/commentsActions"
import Breadcrumbs from "./breadcrumbOneVideo"
import getVideoId from 'get-video-id';
import AllComments from "../comments/allComments"
import download from 'js-file-download';
import OneFileUploader from "./video_backups/oneFileUploder"

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const EditVideoModal = Loadable({
  loader: () => import("./buttonEditVideoModal"),
  loading
});


const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%",
    maxWidth: "100%",
  },
  textField: {
    marginLeft: 0,
    marginRight: 0
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 1,
    marginRight: 1
  },
  actionsContainer: {
    marginBottom: 10
  },
  resetContainer: {
    padding: 20
  },
  placeholder: {
    height: 30
  }
}));

const HomeVideo = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const player = useRef()
  const [open, setOpen] = React.useState(false);
  const [play,setPlay]=useState(false)  //default false
  const [render,setRender]=useState(false)
  const [startFragmentTime,setStartFragmentTime]=useState(null)
  const [itemVideo,setItemVideo]=useState()
  const [loading,setLoading]=useState(true)
  const [backupLoading,setBackupLoading]=useState(false)
  const [endTiming, setEndTiming] = React.useState();//get end-seq from item-seq
  const [progress, setProgress] = React.useState();
  const [titleTheme,setTitleTheme]=useState()
  const [idVideo,setIdVideo]=useState()
const [depTitle,setDepTitle]=useState()
const [subDepTitle,setSubDepTitle]=useState()
const [allComments,setAllComments]=useState([])
const location = useLocation();
 // var routeState=location.state

  const getVideoById=async()=>{
    //console.log("routestate video:",routeState)
  
    try{
      setLoading(true)
  var videoId=""

 // if(routeState==undefined){
    let pathName=window.location.hash;
let dividedPath=pathName.split('/')
console.log("Path:",pathName)
console.log("dividedPath:",dividedPath)
setIdVideo(dividedPath[3])
videoId = dividedPath[3]

    const result=await props.getOneVideoById(videoId)
    console.log("resultGetAllPrograms",result)  
    let { title,subDepartment: { name } } = result && result.theme;
    setTitleTheme(title)
    setSubDepTitle(name)
    let listEventImages=[]
    
    setItemVideo(result)
    const list=await props.getAllCommentsByPostId(videoId)  //  ** ok ** il faut preciser bien les commentaires
  
     console.log("allComments:",list)
   
     setAllComments(list)
     setLoading(false)
    }catch(e){
      console.log(e)
  }
    }
    const getListCommentsByPostId=async()=>{
      setLoading(true)
     try{
         console.log("videoId:",idVideo)
    const list=await props.getAllCommentsByPostId(idVideo)  //  ** ok ** il faut preciser bien les commentaires
    //const list=await getAllCommentsByPostId(video._id)
     console.log("allComments:",list)
   
     setAllComments(list)
      setLoading(false)
     }
     catch(e) {
     console.log(e)
     }
     }
     
    useEffect(()=>{
      getVideoById()
     // getListCommentsByPostId()
     
    },[render])
//---------------------------------------------------


  const loadingFc = () => (
    <div className=" text-center d-flex flex-column justify-content-center align-items-center mx-auto" style={{height:200,marginTop:50,marginBottom:50}}><ScaleLoader
 color="#067BE3" loading={true} size={12}/></div>
  
    );

    const convertTimeToSeconds=(time)=>{
      //var hms = '02:04:33';   // your input string
    var a = time.split(':'); // split it at the colons
    
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    
    console.log("seconds",seconds);
    return seconds
    }

    const seekToChapter=(time)=>{
//player.current.seekTo()
//let time_in_second=convertTimeToSeconds(time)
player.current.seekTo(time)
setPlay(true)
setStartFragmentTime(time)
        
  }

  
//******************************** */


//************* Create Backup for current video**************/

const createBackup=async(data)=>{
  setBackupLoading(true)
  try{
console.log("create backup func!:",data)

const {data:{success,listFiles}}=await apiCreateCustomBackupforOneVideo(data)
if(success){
  if(listFiles.length>0)
  {
    let filename=listFiles[0].filename
    await downloadBackupFile(filename)
    await apiDeleteFileFromServer(filename)

  }
  setBackupLoading(false)
  enqueueSnackbar('Le fichier Backup  a été bien crée!', { variant: 'success' });
}else{
  setBackupLoading(false)
  enqueueSnackbar('Echec de création Backup !', { variant: 'error' });
}
}
catch(e) {
console.log(e)
setBackupLoading(false)
  enqueueSnackbar('Echec de création Backup !', { variant: 'error' });
}
}

//-------------------Download File Backup (json)----------------------
const downloadBackupFile=async(filename)=>{
  console.log('download backup file fun!')
 
  let res=  await apiDownloadFileFromServer(filename)
  download(res.data, filename);

}
//-----------------------------end download file backup---------------

//************************end create backup*******************/




  return (
<div>

{/* <div className='full-container ' style={{marginBottom:20,position:"relative",marginTop:40}} >
      
    <img className="" style={{width:1400,minWidth:1000,maxWidth:'100%',maxHeight:'100%'}} src={require("../../imges/header/courses.png")}/>
    <span className='mainHeaderText2' style={{position:"absolute", top:"50%",left:"20%",color:"white", fontWeight:"bold"}}>{itemVideo&&itemVideo.theme}</span>
    <span className='mainHeaderText1' style={{position:"absolute", top:"60%",left:"20%",color:"white", fontWeight:"bold"}}>{itemVideo&&itemVideo.title}</span>
    </div> */}
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={backupLoading}
  
>
<div className="d-flex flex-column justify-content-center align-items-center">
  <h2 className="m-2" style={{color:"inherit"}}>Création et téléchargement backup video</h2>
  <CircularProgress color="inherit" size={35} sx={{marginTop:10}}/>
  </div> 
 
</Backdrop>

<div className='container d-flex flex-column align-items-center flex-md-row justify-content-between 'style={{marginBottom:30}}>

      <div className="d-flex justify-content-center ">
<div className="my-2"  style={{fontSize:26, fontWeight:"bolder", marginLeft:10, color:"#666"}}>Détails video</div></div>
<Breadcrumbs level1={depTitle&&depTitle.length > 20 ? `${depTitle.substring(0, 20)}...` : depTitle} level2={subDepTitle&&subDepTitle.length > 20 ? `${subDepTitle.substring(0, 20)}...` : subDepTitle} level3={titleTheme&&titleTheme.length > 20 ? `${titleTheme.substring(0, 20)}...` : titleTheme} current={"Videos"} />
</div>
<div className="d-flex container px-0 justify-content-center justify-content-md-end">
  <EditVideoModal item={itemVideo} render={()=>setRender(!render)} />
  {/* <LoadingButton endIcon={<CloudDownloadIcon/>} variant="outlined" loadingPosition="end" loading={backupLoading} color="primary" className=" m-1" onClick={()=>createBackup(itemVideo)} ><span>Créer Backup</span></LoadingButton>
  <OneFileUploader refreshListFiles={()=>setRender()} loading={backupLoading}/> */}
  </div>
    <Paper className=" font container " style={{  padding: 20 }}>
      


<Row>
<div onContextMenu={e => e.preventDefault()} style={{ width: "100%" }}>
<Col xs="12" md="8">
  <h1>{itemVideo&&itemVideo.title}</h1>
  </Col>
  </div>
</Row>
<Row>
  <Col xs="12" md="8">
 

  
  <LoadingOverlay
                     active={loading}
                     spinner={<ScaleLoader color="#067BE3" loading={true} size={2}/>}
                     styles={{
                       overlay: base => ({
                         ...base,
                         background: "  rgba(252, 252, 252)"
                       })
                       
                     }}
                   >
                   
<ReactPlayer

      playing={play}// 
      onProgress={(state)=>{if (state.playedSeconds>=endTiming)setPlay(false)}}
      onReady={()=>setLoading(false)}
      ref={player}
      url={itemVideo&&itemVideo.urlVideo}
      controls={true}
      width="100%"
      config={{
        youtube: {
          embedOptions: { rel: 0,modestbranding:1 },
         }
      }}
 />
 
</LoadingOverlay>

 <div style={{width:"100%",marginTop:20}} className="border border-light pb-2 mb-2 px-2" >
   
   <TabsDescription description={itemVideo&&itemVideo.description} videoId={itemVideo&&itemVideo._id} video={itemVideo} files={"no files!"} />
 </div>
 </Col>
 <Col xs="12" md="4" className="border border-light p-2 " >
   <div >
    <span classname=" w-100 border border-light p-2 bg-light"><h2 >Les chapitres</h2></span>
 

 <LoadingOverlay
                     active={loading}
                     spinner={<ScaleLoader color="#067BE3" loading={true} size={2}/>}
                     styles={{
                       overlay: base => ({
                         ...base,
                         background: "  rgba(252, 252, 252)"
                       })
                       
                     }}
                   >
<ListChapters seekTo={(time)=>seekToChapter(time)} setEndTiming={setEndTiming} chapters={itemVideo&&itemVideo.chapters}/>
</LoadingOverlay>
</div>
   </Col>
</Row>
<Row>
  <Col xs="12" md="8" className="mt-3 ">
  <h3>Discussion</h3>
     <div >   
  {idVideo?<AllComments loading={loading} currentUser={props.profile} videoId={idVideo} video={itemVideo} allComments={allComments} refreshListComments={()=>setRender(!render)} />:"No items.."}
  </div>      
  </Col>
</Row>
    </Paper>
   
</div>
  )

}



const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile
  }
}

export default connect(mapStateToProps, { getOneVideoById,getAllCommentsByPostId})(HomeVideo);