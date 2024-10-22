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

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
//import SearchIcon from '@material-ui/icons/Search';

import Event from "./OneEvent"
import {connect} from "react-redux"
import {getAllInscriptions} from '../../redux/actions/inscriptionActions'
import SearchByDateModal from './alertSearchEventDialog'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import moment from "moment"



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

const ListEvents=(props)=> {
  const classes = useStyles();
const [render,setRender]=useState(false)
const [allEvents,setAllEvents]=useState([])
const [listEvents,setListEvents]=useState([])
const [searchEvent,setSearchEvent]=useState("")
const [loading,setLoading]=useState(false)
const [objDate,setObjDate]=useState({dateStart:moment(new Date("01/01/1880")),dateEnd:moment(new Date("01/01/2100"))})
const [expanded, setExpanded] = React.useState(false);
const getListEvents=async()=>{
  setLoading(true)
try{

setAllEvents(await props.getAllInscriptions())
setLoading(false)
}
catch(e) {
console.log(e)
}
}

useEffect(()=>{
  getListEvents()
},[render])
  
const handleChange = (panel1) => (event1, isExpanded) => {
  setExpanded(isExpanded ? panel1 : false);
  
};

useEffect(()=>{
  setLoading(true)
    
    setListEvents(allEvents.filter(
      event => event.name.toLowerCase().includes(searchEvent.toLowerCase())
    ) );
  
  setLoading(false)
},[searchEvent,allEvents])

// useEffect(()=>{
//   setLoading(true)
   
//      setListEvents(allEvents.filter(
//       //event dateStart is in standard format (including houres minutes and seconds) 
//       //so in order to get date==date or date<=date, we have to format it into "mm-dd-yyyy" 
//       //then format it to number and then compare
//       event => (moment(event.dateStart) >= moment(objDate.dateStart) && moment(event.dateStart) <=  moment(objDate.dateEnd))) );
//     setLoading(false)
// },[objDate,allEvents])

const searchEventsByDate=(objDate)=>{
  
  //setObjDate(objDate)
  setListEvents(allEvents&&allEvents.filter(
    //event dateStart is in standard format (including houres minutes and seconds) 
    //so in order to get date==date or date<=date, we have to format it into "mm-dd-yyyy" 
    //then format it to number and then compare
    event => (new Date(event.created) >= new Date(objDate.dateStart) && new Date(event.created) <= new Date(objDate.dateEnd ) )));
  setLoading(false)
  
}
const loadingSpinner=()=>{
  return (
<div className="loader-view">
                            <CircularProgress />
                          </div>)
}

  return (
    <div className="w-100 d-flex flex-column justify-content-center " >
      <div className="d-md-flex flex-xs-column  justify-content-between my-2 mx-auto mx-md-2 ">
      
      <OutlinedInput
      variant="outlined"
                  placeholder="Recherche par titre "
                  className="m-1"
                  style={{ width: 250 , height:37 }}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     <IconButton
                  //       aria-label="search "
                  //       className="p-2 "
                  //       onClick={clearSearchInput}
                  //     >
                  //       <ClearIcon />
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                  size="small"
                  endAdornment={
                    <InputAdornment  position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  onChange={(e) => setSearchEvent(e.target.value)}                
                value={searchEvent}
                />

                {/* problem searching by date */}
             <SearchByDateModal getListEventsByDate={searchEventsByDate}  />   
      </div>
    {props.isFetching||loading?<center>Loading ...</center>: (listEvents.length<1?<center>No items!</center>:listEvents.map((event,index)=>(
      <Event key={index} event={event} panel={index} render={()=>setRender(!render)} handleChange={handleChange} expanded={expanded}/>
    )))}
     
     
    </div>
  );
}


const mapStateToProps=(state)=>{
  return{
    events:state.eventReducer.events,
    isFetching:state.eventReducer.eventIsFetching
  
  }
}

export default connect (mapStateToProps,{getAllInscriptions})(ListEvents)