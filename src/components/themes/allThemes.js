import React, { useEffect, useState } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
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
import OneThemeItem from "./themesItem"
import { connect } from "react-redux"
import { getAllThemes } from '../../redux/actions/themesActions'
import SearchByDateModal from './searchThemesByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import AddThemeModal from "./addThemeModal"
import {useNavigate,useParams,useLocation} from "react-router-dom"
import Container from '@material-ui/core/Container';
import Breadcrumbs from "./breadcrumb"
import LoadingOverlay from "react-loading-overlay";
import HashLoader from "react-spinners/HashLoader"



// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '33.33%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// }));



const ListThemes = (props) => {
  //const classes = useStyles();
  const [render, setRender] = useState(false)
  const [allThemes, setAllThemes] = useState([])
  const [listThemes, setListThemes] = useState([])
  const [searchThemes, setSearchThemes] = useState("")
  const [loading, setLoading] = useState(true)
  const [subDepId, setSubDepId] = useState("")
  const [subDepTitle, setSubDepTitle] = useState("")
  const [depTitle, setDepTitle] = useState("")
  
  const location = useLocation();
  var routeState=location.state
  
  const navigate=useNavigate()

  const getListThemes = async () => {
    
    setLoading(true)

    var idSubDep=""
    let routeStateKeys=Object.keys(routeState)
    for(let el of routeStateKeys){
      if(el.includes("subDepId")==true){
    setSubDepId(routeState[el])
    idSubDep=routeState[el]
    }else if(el.includes("_")){
      setDepTitle(routeState[el])
    }else{
      setSubDepTitle(routeState[el])
    }
    }

    try {
      console.log("useLocation:",location.state)
      const Themes = await props.getAllThemes(idSubDep)
      console.log("allThemes:", Themes)
      setAllThemes(Themes)
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getListThemes()
  }, [render])



  useEffect(() => {
    setLoading(true)

    setListThemes(allThemes&&allThemes.filter(
      item => item.title.toLowerCase().includes(searchThemes.toLowerCase())
    ));

    setLoading(false)
  }, [searchThemes, allThemes])



  const searchThemesByDate = (objDate) => {


    setListThemes(allThemes&&allThemes.filter(
      //format to "dd-mm-yyyy" then compare with isSameOrAfter and  isSameOrBefore
      theme => (moment(moment(theme.created).format("DD-MM-YYYY")).isSameOrAfter(moment(moment(objDate.dateStart).format("DD-MM-YYYY")))
        && moment(moment(theme.created).format("DD-MM-YYYY")).isSameOrBefore(moment(moment(objDate.dateEnd).format("DD-MM-YYYY"))))))
    setLoading(false)

  }

  return (
    <div>

      <div name="allThemes" className="container-video d-flex flex-column justify-content-center "  >
        {/* <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:22,fontWeight:"bold" ,color:"#3f51b5"}}></div></div> */}
        <div className='container d-flex flex-column align-items-center flex-md-row justify-content-between 'style={{marginBottom:20}}>

{/* <div className="d-flex justify-content-center "><div className=""  style={{fontSize:22,fontWeight:"bolder" ,paddingLeft:10,color:"#3f51b5",borderLeft: "solid #3f51b5 3px"}}>Thèmes</div></div> */}
<div className="d-flex justify-content-center ">
<div className="my-2"  style={{fontSize:24, fontWeight:"bolder", marginLeft:10, color:"#666"}}>{subDepTitle.length > 20 ? `${subDepTitle.substring(0, 20)}...` : subDepTitle}</div></div>
<Breadcrumbs level1={depTitle.length > 20 ? `${depTitle.substring(0, 20)}...` : depTitle} level2={subDepTitle.length > 20 ? `${subDepTitle.substring(0, 20)}...` : subDepTitle} level3={"index"} current={"modules"} />
</div>
<div className="animated slideInUpTiny animation-duration-3">
<div className="animated slideInUpTiny animation-duration-3">
<div className="row mb-md-3">
<div className="col-12">
                    
<div className="jr-card d-print-none">
<div className='container d-flex flex-column align-items-center flex-md-row justify-content-between my-2 mx-auto mx-md-2 '>
  <div style={{fontSize:24, fontWeight:"bolder"}}>Modules</div>
  <div className='d-flex flex-column-reverse flex-md-row  justify-content-md-end my-2 align-items-center'>      
        
  <OutlinedInput
            variant="outlined"
            placeholder="Recherche par titre "
            className="m-1"
            style={{ width: 250, height: 37 }}
            size="small"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={(e) => setSearchThemes(e.target.value)}
            value={searchThemes}
          />

{(props.profile.role=="depAdmin"||props.profile.role=="orgAdmin"||props.profile.role=="professor") ? <AddThemeModal render={() => setRender(!render)} idSubDep={subDepId} />:""}
                      
          
       
          {/* problem searching by date */}
          {/* <SearchByDateModal getListThemesByDate={searchThemesByDate} /> */}
      
        </div>
        </div>

        <LoadingOverlay
        active={loading}
        spinner={<HashLoader color="#bdbdbd" loading={true} size={40} />}
        styles={{
          overlay: base => ({
            ...base,
            background: "  rgba(252, 252, 252)"
          })

        }}
      >
        <div className=" mt-3 d-flex justify-content-center flex-wrap ">

          {(listThemes&&listThemes.length < 1)
            ? (
              <List>
                <ListItem className="d-flex justify-content-center " >
                  <center className="mt-2"><h3>No items!</h3></center>
                </ListItem>
                
              </List>
            )
            :
            
           
            listThemes&&listThemes.map((el, index) => (

            <OneThemeItem key={el._id} item={el} render={() => setRender(!render)} subDepTitle={subDepTitle} depTitle={depTitle} />

            ))
          
            
          }
        </div>
        </LoadingOverlay>
      </div>
      </div>
      </div>

      </div>
      </div>
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

export default connect(mapStateToProps, { getAllThemes })(ListThemes)