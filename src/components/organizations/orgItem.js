import React from "react"
import {useNavigate} from "react-router-dom"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ModifyModal from "./modifyOrgModal"
import DeleteItem from "./deleteOrgItem"
import {connect} from "react-redux"
import {deleteOneOrgById} from "../../redux/actions/organizationsActions"


const OneItem=({item,home,render,deleteOneOrgById})=>{
    const navigate=useNavigate()
    var orgIdKey = 'orgId' + (new Date()).getTime();//use unique title in localstorage
    var orgTitleKey = 'orgTitle' + (new Date()).getTime();
    // console.log("imageUrl:",image)
    const goToPage=(url)=> {
      // localStorage.setItem("orgId",item._id)
      // localStorage.setItem("orgTitle",item.name)
      //   navigate(url);
        navigate(url,{state:{[orgIdKey]:item._id,[orgTitleKey]:item.name}});
      }
      const scrollTo=(name)=> {
        scroller.scrollTo(name, {
          duration: 1000,
          offset:-130,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }
    return(
<div className="d-flex shadow-lg rounded flex-content-between flex-column align-items-center bg-white  mx-2 my-2" style={{width:252, height:"inherit"}}>

<div className="d-flex  flex-column align-items-center" onClick={()=>goToPage(`/departements/${item._id}`)} style={{width:250,marginTop:20,cursor:"pointer"}}>
<img className="m-2" style={{height:120,width:150 }} src={item.image.idFile}/>
<div className="m-1" style={{height:80, marginBottom:20}}>
<div className=" text-center p-1" style={{fontWeight:"bold",fontSize:15, }}>{item.name}</div>

</div>
</div>
<div className={" d-flex justify-content-center p-0 mt-2 w-100 card-footer bg-transparent"}>
                 {/*modify program button */}
                <ModifyModal item={item} render={render}/>
               {/*  delete button  */}
                <DeleteItem item={item} deleteItem={deleteOneOrgById}  render={render}/>
            </div>

    </div>
    )
}

export default connect (null,{deleteOneOrgById})(OneItem); 