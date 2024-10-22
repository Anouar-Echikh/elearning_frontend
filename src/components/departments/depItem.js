import React from "react"
import {useNavigate} from "react-router-dom"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ModifyModal from "./modifyDepModal"
import DeleteItem from "./deleteDepItem"
import {connect} from "react-redux"
import {deleteOneDepById} from "../../redux/actions/departmentsActions"



const OneItem=({item,home,render,deleteOneDepById,profile})=>{
    const navigate=useNavigate()
    var depIdKey = 'depId' + (new Date()).getTime();//use unique title in routeState
    var depTitleKey = 'depTitle' + (new Date()).getTime();
    // console.log("imageUrl:",image)
    const goToPage=(url)=> {
      
        navigate(url,{state:{[depIdKey]:item._id,[depTitleKey]:item.name}});
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
<div className="d-flex rounded shadow-lg flex-content-between h-100 flex-column align-items-center bg-white  mx-2 mb-2" style={{width:252}}>

<div className="d-flex  flex-column align-items-center" onClick={()=>goToPage(`/sous-departement/${item._id}`)} style={{width:250,cursor:"pointer"}}>
<img className="mb-2 rounded-top " style={{height:150,width:"100%"}} src={item.image?item.image.idFile:require("../../imgs/no-image.png")}/>
<div className="py-3 " dir="auto">
<div className=" text-center p-1" style={{fontWeight:"bold",fontSize:16, }}>{item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name  }</div>

</div>
</div>
<div className={(profile.role=="depAdmin"||profile.role=="orgAdmin") ? "mx-2 px-2 d-flex justify-content-center":"d-none"}>
                 {/*modify program button */}
                <ModifyModal item={item} render={render}/>
               {/*  delete button  */}
                <DeleteItem item={item} deleteItem={deleteOneDepById}  render={render}/>
            </div>

    </div>
    )
}

const mapStateToProps = (state) => {
  return {
   
    profile: state.authReducer.profile,

  }
}


export default connect (mapStateToProps ,{deleteOneDepById})(OneItem); 