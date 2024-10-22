import React, { useEffect, useState } from 'react';
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
import OneItem from "./depItem"
import { connect } from "react-redux"
import { getAllDeps } from '../../redux/actions/departmentsActions'
import SearchByDateModal from './searchDepsByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import AddItemModal from "./addDepModal"
import {useNavigate,useParams,useLocation} from "react-router-dom"
import Container from '@material-ui/core/Container';
import Breadcrumbs from "./breadcrumb"
import LoadingOverlay from "react-loading-overlay";
import HashLoader from "react-spinners/HashLoader"


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



const ListItems = (props) => {
//let {idOrg}=useParams()
  const classes = useStyles();
  const [render, setRender] = useState(false)
  const [allItems, setAllItems] = useState([])
  const [listItems, setListItems] = useState([])
  const [searchItems, setSearchItems] = useState("")
  const [loading, setLoading] = useState(true)
  const [orgId, setOrgId] = useState("")
  const [orgTitle, setOrgTitle] = useState("")
  let location=useLocation()
  var routeState=location.state
  
  const navigate=useNavigate()

  const getListItems = async () => {
    setLoading(true)
    var idOrg=""
console.log("routeState:",routeState)

let routeStateKeys=Object.keys(routeState)
for(let el of routeStateKeys){
  if(el.includes("orgId")==true){
setOrgId(routeState[el])
idOrg=routeState[el]
}else{
  setOrgTitle(routeState[el])
}
}
//
    try {
      const items = await props.getAllDeps(idOrg)
      console.log("allItems:", items)
      console.log("idOrg:", idOrg)
      setAllItems(items)
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getListItems()
  }, [render])



  useEffect(() => {
    setLoading(true)

    setListItems(allItems&&allItems.filter(
      item => item.name.toLowerCase().includes(searchItems.toLowerCase())
    ));

    setLoading(false)
  }, [searchItems, allItems])



  const searchItemsByDate = (objDate) => {


    setListItems(allItems&&allItems.filter(
      //format to "dd-mm-yyyy" then compare with isSameOrAfter and  isSameOrBefore
      item => (moment(moment(item.created).format("DD-MM-YYYY")).isSameOrAfter(moment(moment(objDate.dateStart).format("DD-MM-YYYY")))
        && moment(moment(item.created).format("DD-MM-YYYY")).isSameOrBefore(moment(moment(objDate.dateEnd).format("DD-MM-YYYY"))))))
    setLoading(false)

  }

  return (
    <div>
<Container>
      {/* <div className='full-container justify-content-center' style={{overflow:"hidden", marginBottom: 20, position: "relative", marginTop: 40 }}  >
     
        
      
        <span className='mainHeaderText1' style={{ position: "absolute", top: "50%", left: "10%", color: "white", fontWeight: "bold" }}>Thèmes</span>
      
      </div> */}
      </Container>
      <div name="allItems" className="container-video d-flex flex-column justify-content-center "  >
        {/* <div className="container d-flex justify-content-center " style={{marginBottom:20,height:40}}><div className=""  style={{fontSize:26,fontWeight:"bolder" ,color:"#3f51b5"}}>{depTitle}</div></div> */}
      
        <div className='container d-flex flex-column align-items-center flex-md-row justify-content-between 'style={{marginBottom:20}}>

<div className="d-flex justify-content-center "><div className=""  style={{fontSize:24, fontWeight:"bolder", marginLeft:10, color:"#666"}}>{orgTitle}</div></div>
<Breadcrumbs  current={""}/>
</div>
<div className="animated slideInUpTiny animation-duration-3">
<div className="row mb-md-3">
<div className="col-12">
                    
<div className="jr-card d-print-none">
<div className='container d-flex flex-column align-items-center flex-md-row justify-content-between my-2 mx-auto mx-md-2 '>
  <div style={{fontSize:24, fontWeight:"bolder"}}>Départements</div>
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
            onChange={(e) => setSearchItems(e.target.value)}
            value={searchItems}
          />
  {(props.profile.role=="orgAdmin") ? <AddItemModal render={() => setRender(!render)} orgId={orgId}/>:""}
           

          </div>
          </div>
        <div className="container d-flex flex-column align-items-center flex-md-row justify-content-end my-2 mx-auto mx-md-2  " >
          

          
          {/* problem searching by date */}
          {/* <SearchByDateModal getListItemsByDate={searchItemsByDate} /> */}
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

          {(listItems&&listItems.length < 1)
            ? (
              <List>
                <ListItem className="d-flex justify-content-center " >
                  <center className="mt-2"><h3>vide!</h3></center>
                </ListItem>
                
              </List>
            )
            : 
            
           
            listItems&&listItems.map((el, index) => (


              <OneItem key={el._id} item={el} render={() => setRender(!render)} />



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
      
  );
}


const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsorsReducer.sponsors,
    isFetching: state.sponsorsReducer.sponsorIsFetching,
    profile: state.authReducer.profile,

  }
}

export default connect(mapStateToProps, { getAllDeps })(ListItems)