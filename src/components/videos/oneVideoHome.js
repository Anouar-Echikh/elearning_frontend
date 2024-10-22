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
import { useHistory } from "react-router-dom";
import axios from "axios"
import ReactPlayer from "react-player";
import ScaleLoader from "react-spinners/ScaleLoader"
import LoadingOverlay from "react-loading-overlay";
import DoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const OneItem = ({ item, render, deleteOneVideoById, }) => {
  const [loading, setLoading] = useState({})
  const [imgUrl, setImgUrl] = useState("ff")
  const [endTiming, setEndTiming] = React.useState();
  const [progress, setProgress] = React.useState();

  let history = useHistory();

  const goToPage = (url) => {
    localStorage.setItem("videoId", item._id)
    localStorage.setItem("videoName", item.title)
    history.push(url);
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
            src={require("../../../../assets/noFile.png")}
            color="transaprent"
            imageStyle={{ borderRadius: "5%", width: "inherit", height: "inherit" }}
            style={{ width: 70, height: 70, padding: 0 }}
            iconContainerStyle={{ width: 70, height: 70 }}

          />
            :
            <LoadingOverlay
              active={loading[item._id]}
              spinner={<ScaleLoader color="#067BE3" loading={true} size={2} />}
              styles={{
                overlay: base => ({
                  ...base,
                  background: "rgba(252, 252, 252)"
                })

              }}
            >

              <ReactPlayer
                onReady={() => setLoading({ [item._id]: false })}
                
                url={item.urlVideo}
                controls={true}
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    embedOptions: { rel: 0 }
                  }
                }}
              />

            </LoadingOverlay>

          }

        </div>
        <div className="mx-2 px-2 py-2 d-flex flex-column   " >



          <div><strong>Thème: </strong> {item.theme}</div>
          <div><strong>Niveau: </strong> {item.level}</div>
          <div><strong>Titre: </strong> {item.title}</div>
          <div><strong>Description: </strong> {item.description}</div>
          <div><strong>Url: </strong> {item.urlVideo}</div>
          <div><strong>Date de création: </strong>{item.created} </div>
          <div><strong>Professeur: </strong>{item.prof} </div>

          <Button
            endIcon={<DoubleArrowRightIcon />}
            color="primary"
            variant="outlined"
            
            onClick={() => { goToPage(`/videos/${item._id}/${item.title.replace(/\s/g, '')}`) }}
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
      <div className=" h-100  d-flex flex-md-column justify-content-center" >
        {/*modify program button */}
        <ModifyModal item={item} render={render} />
        {/* delete button */}
        <DeleteItem item={item} deleteItem={deleteOneVideoById} render={render} />
      </div>
    </div>




  )
}

export default connect(null, { deleteOneVideoById })(OneItem);