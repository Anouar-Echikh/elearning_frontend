import React from "react"
import {useNavigate} from "react-router-dom"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ModifyThemeModal from "./modifyThemeModal"
import DeleteThemeItem from "./deleteThemeItem"
import {connect} from "react-redux"
import {deleteOneThemeById} from "../../redux/actions/themesActions"
import {getAllVideos} from "../../redux/actions/videosActions"
import { requirePropFactory } from "@material-ui/core"


const ThemeItem=({item,home,profile,render,deleteOneThemeById,subDepTitle,depTitle,getAllVideos})=>{
    
     
    
    const navigate = useNavigate();
    var themeIdKey = 'themeId' + (new Date()).getTime();//use unique title in localstorage
      var themeTitleKey = 'themeTitle' + (new Date()).getTime();
      var depTitleKey = '_depTitle' + (new Date()).getTime();
      var subDepTitleKey = '_subDepTitle' + (new Date()).getTime();
     
    // console.log("imageUrl:",image)
    const goToPage=(url)=> {
      
      // localStorage.setItem(subDepIdKey,item._id)
      // localStorage.setItem(subDepTitle,item.name)
     // history.push(url);
      navigate(url,{state:{[themeIdKey]:item._id,[themeTitleKey]:item.title,[depTitleKey]:depTitle,[subDepTitleKey]:subDepTitle}});
      }
      const scrollTo=(name)=> {
        scroller.scrollTo(name, {
          duration: 1000,
          offset:-130,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }

const deleteOneTheme=async()=>{
  



}


    return(
<div className="d-flex rounded flex-column align-items-center bg-white shadow-lg mx-2 my-2" style={{width:252}}>

<div className="d-flex  flex-column align-items-center" onClick={()=>goToPage(`/${item.title}/videos`)} style={{width:250,cursor:"pointer"}}>
<img className="rounded-top" style={{height:180,width:'100%'}} src={item.image?item.image.idFile:require("../../imgs/no-image.png")}/>
<div className="py-3 mr-3 " dir="auto">
<div className="  p-1" style={{fontWeight:"bold",fontSize:16, }}>{item.title}</div>

</div>
</div>
<div className={(profile.role=="depAdmin"||profile.role=="orgAdmin"||profile.role=="professor") ? "mx-2 px-2 d-flex justify-content-center":"d-none"}>
                 {/*modify program button */}
                <ModifyThemeModal item={item} render={render}/>
               {/*  delete button  */}
                <DeleteThemeItem item={item} deleteThemeItem={deleteOneThemeById}  render={render}/>
            </div>

    </div>
    )
}
const mapStateToProps = (state) => {
  return {
   
    profile: state.authReducer.profile,

  }
}
export default connect (mapStateToProps,{deleteOneThemeById,getAllVideos})(ThemeItem); 