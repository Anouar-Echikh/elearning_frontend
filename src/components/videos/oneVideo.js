import React, { useState, useEffect } from 'react'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import moment from "moment"
import ModifyModal from "./modifyVideoModal"
import DeleteItem from "./deleteVideoItem"
import { connect, } from "react-redux"
import { deleteOneVideoById } from "../../redux/actions/videosActions"
import Image from 'material-ui-image'
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
//import {apiGetListFilesByAccountName} from '../../api/apiMicrosoft'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ReactPlayer from "react-player";
import ScaleLoader from "react-spinners/ScaleLoader"
import LoadingOverlay from "react-loading-overlay";
import DoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const OneItem = ({ item, render,profile, deleteOneVideoById,themeTitle,subDepTitle,depTitle }) => {
  const [loading, setLoading] = useState({})
  const [imgUrl, setImgUrl] = useState("ff")
  const [endTiming, setEndTiming] = React.useState();
  const [progress, setProgress] = React.useState();

  const navigate = useNavigate();
  var videoIdKey = 'videoId' + (new Date()).getTime();//use unique title in localstorage
   // var videoTitleKey = 'videoName' + (new Date()).getTime();
    var themeTitleKey = 'themeTitle' + (new Date()).getTime();
    var depTitleKey = 'depTitle' + (new Date()).getTime();
    var subDepTitleKey = 'subDepTitle' + (new Date()).getTime();

  const goToPage = (url) => {
    localStorage.setItem("videoId", item._id)
    localStorage.setItem("videoName", item.title)
   
      navigate(url,{state:{[videoIdKey]:item._id,[depTitleKey]:depTitle,[subDepTitleKey]:subDepTitle,[themeTitleKey]:themeTitle}});
  }
  
  const scrollTo = (name) => {
    scroller.scrollTo(name, {
      duration: 1000,
      offset: -130,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }


  useEffect(() => {
    //getListItemImages()
    //loading for waiting video
    setLoading({ [item._id]: true })
  }, [])

  const getBlob = async (url) => {

    //  let blob=await fetch(url).then(r => r.blob());

    const res = await axios.get(url, {
      responseType: 'blob'
    });
    console.log("res", res.data)
    const blobURL = URL.createObjectURL(res.data);
    window.open(blobURL, "_blank")

  }

  return (

    <div className="w-100 mx-0 d-md-flex flex-xs-column justify-content-md-between align-items-center border rounded " style={{ backgroundColor: "white" }} >
      <div className=" mx-0  d-md-flex flex-sm-column flex-md-row justify-content-md-between">
        <div className="  d-flex flex-column align-items-center align-items-md-start justify-content-center ">

          {item.urlVideo === null ? <Image
            loading={<CircularProgress size={30} />}
            src={require("../../assets/noFile.png")}
            color="transaprent"
            imageStyle={{ borderRadius: "5%", width: "inherit", height: "inherit" }}
            style={{ width: 70, height: 70, padding: 0 }}
            iconContainerStyle={{ width: 70, height: 70 }}

          />
            :

<img src={item.thumbnail} style={{width:"100%",height:230}}  />

//             <LoadingOverlay
//               active={loading[item._id]}
//               spinner={<ScaleLoader color="#067BE3" loading={true} size={2} />}
//               styles={{
//                 overlay: base => ({
//                   ...base,
//                   background: "rgba(252, 252, 252)"
//                 })

//               }}
//             >

// <Image
//             loading={<CircularProgress size={30} />}
//             src={item.thumbnail}
//             color="transaprent"
//             imageStyle={{ borderRadius: "5%", width: "inherit", height: "inherit" }}
//             style={{ width: 70, height: 70, padding: 0 }}
//             iconContainerStyle={{ width: 70, height: 70 }}

//           />

//               {/* <ReactPlayer
//                 onReady={() => setLoading({ [item._id]: false })}
                
//                 url={item.urlVideo}
//                 controls={true}
//                 width="100%"
//                 height="100%"
//                 config={{
//                   youtube: {
//                     embedOptions: { rel: 0 }
//                   }
//                 }}
//               /> */}

//             </LoadingOverlay>

          }

        </div>
        <div className="mx-2 px-2 py-2 d-flex flex-column   " >



        <div><strong>Formation: </strong> {item.theme&&item.theme.subDepartment&&item.theme.subDepartment.name}</div>
        <div><strong>Module: </strong> {item.theme&&item.theme.title}</div>
        <div><strong>Titre: </strong> {item.title}</div>
        <div><strong>Description: </strong> {item.description}</div>
        <div><strong>Url: </strong> {item.urlVideo}</div>
        <div><strong>Date de création: </strong>{moment(item.created).format("DD-MM-YYYY à HH:mm")} </div>
        <div><strong>Professeur: </strong>{item.prof&&item.prof.name} </div>

          <Button
            endIcon={<DoubleArrowRightIcon />}
            color="primary"
            variant="outlined"
           
            onClick={() => { goToPage(`/${item.theme&&item.theme.title}/videos/${item._id}`) }}
            
            style={{width:150, fontWeight: "bold", fontSize: 12, marginTop: 10, borderRadius: 30 }}>Voir détails</Button>

          {/* <div className="mt-3"><strong>Les chapitres : </strong> </div>
                    
                    <div  className="d-flex  justify-content-start border rounded my-3 pl-3">
                    
                      <div style={{marginTop:20}}>
                     
                     {
                       item.chapters.length>0
                       ? item.chapters.map((el,index)=>(
                         <div className="d-flex justify-content-center">
                             <span style={{fontSize:13,fontWeight:"bold",}}>{index+1}-{el.text}</span>
                             <span style={{fontSize:13,fontWeight:"bold",}}>{el.startTime}</span>
                               
                        </div>
                       ))
                        : <p style={{color:"red",fontWeight:"bold"}}> (*) Veuillez ajouter des chapitres!</p>
                     
                    }
</div>
</div> */}
        </div>

      </div>
      <div className={(1==1) ?" h-100  d-flex flex-md-column justify-content-center":"d-none"} >
        {/*modify program button */}
        <ModifyModal item={item} render={render} />
        {/* delete button */}
        <DeleteItem item={item} deleteItem={deleteOneVideoById} render={render} />
      </div>
    </div>




  )
}

const mapStateToProps = (state) => {
  return {
   
    profile: state.authReducer.profile,

  }
}

export default connect(null, { deleteOneVideoById })(OneItem);