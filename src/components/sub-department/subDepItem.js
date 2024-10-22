import React from "react"
import {useNavigate} from "react-router-dom"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ModifyModal from "./modifySubDepModal"
import DeleteItem from "./deleteSubDepItem"
import {connect} from "react-redux"
import {deleteOneSubDepById} from "../../redux/actions/sub-departmentsActions"


const OneItem=({item,home,profile,render,deleteOneSubDepById,depTitle})=>{
    const history=useNavigate()
    const navigate = useNavigate();
    var subDepIdKey = 'subDepId' + (new Date()).getTime();//use unique title in localstorage
      var subDepTitleKey = 'subDepTitle' + (new Date()).getTime();
      var subDep_depTitleKey = 'subDep_depTitle' + (new Date()).getTime();
      var subDep_listProfKey = 'subDep_listProf' + (new Date()).getTime();
      var subDep_listStudentsKey = 'subDep_listStudents' + (new Date()).getTime();
     
    // console.log("imageUrl:",image)
    const goToPage=(url)=> {
      
      navigate(url,{state:{[subDepIdKey]:item._id,[subDepTitleKey]:item.name,[subDep_listProfKey]:item.professors,[subDep_listStudentsKey]:item.students,[subDep_depTitleKey]:depTitle}});
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
<div className="d-flex rounded flex-content-between h-100 flex-column align-items-center bg-white shadow-lg mx-2 my-2" style={{width:252}}>

{/* <div className="d-flex  flex-column align-items-center" onClick={()=>goToPage(`/themes/${item._id}`)} style={{width:250,cursor:"pointer"}}> */}
<div className="d-flex  flex-column align-items-center" onClick={()=>goToPage(`/sous-departement/index`)} style={{width:250,cursor:"pointer"}}>


<img className="rounded-top" style={{height:180,width:"100%"}} src={item.image?item.image.idFile:require("../../imgs/no-image.png")}/>
<div className="py-3 " dir="auto">
<div className=" text-center p-1" style={{fontWeight:"bold",fontSize:16, }}>{item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name  }</div>

</div>
</div>
<div className={(profile.role=="depAdmin"||profile.role=="orgAdmin") ? "mx-2 px-2 d-flex justify-content-center":"d-none"}>
                 {/*modify program button */}
                <ModifyModal item={item} render={render}/>
               {/*  delete button  */}
                <DeleteItem item={item} deleteItem={deleteOneSubDepById}  render={render}/>
            </div>

    </div>
    )
}

const mapStateToProps = (state) => {
  return {
   
    profile: state.authReducer.profile,

  }
}
export default connect (mapStateToProps,{deleteOneSubDepById})(OneItem); 