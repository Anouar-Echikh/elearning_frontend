import React ,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from "@material-ui/icons/Search";

import CircularProgress from "@material-ui/core/CircularProgress";

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

import InputAdornment from "@material-ui/core/InputAdornment";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from'@material-ui/core/Paper';
import OneUser from "./oneUser"
import {connect} from "react-redux"
import {getUsers} from '../../redux/actions/usersActions'
import SearchByDateModal from './searchVideosByDateModal'
import OutlinedInput from '@material-ui/core/OutlinedInput';
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

const ListUsers=(props)=> {
  const classes = useStyles();
const [render,setRender]=useState(false)
const [allUsers,setAllUsers]=useState([])
const [listUsers,setListUsers]=useState([])
const [searchUsers,setSearchUsers]=useState("")
const [loading,setLoading]=useState(false)


const getListUsers=async()=>{
  setLoading(true)
try{
const users=await props.getUsers()
console.log("allUsers:",users)
setAllUsers(users)
setLoading(false)
}
catch(e) {
console.log(e)
}
}

useEffect(()=>{
  getListUsers()
},[render])
  

const filterListUsers=(users)=>{
  
    let filtredFromProfessors=users.filter((el)=>el.role=="professor")
 console.log("list:",filtredFromProfessors)
 console.log("profile:",props.profile)
 if(props.profile.role!="superAdmin"){
      let filtredList=filtredFromProfessors.filter((el)=>el.organization==props.profile.organization["_id"])
      return(filtredList)
 }else{
  return filtredFromProfessors
 }
}

useEffect(()=>{
  setLoading(true)
    if (allUsers!=undefined){
    setListUsers(allUsers.filter(
      item => item.name.toLowerCase().includes(searchUsers.toLowerCase())
    ) );
  }
  setLoading(false)
},[searchUsers,allUsers])



const searchUsersByDate=(objDate)=>{
  console.log("obj from dateModal:",objDate)
  console.log("allUsers:",allUsers)
  console.log("moment(moment(event.dateStart):",moment(objDate.dateStart).format("MM-DD-YYYY"))
  //setObjDate(objDate)
  setListUsers(allUsers.filter(
    //event dateStart is in standard format (including houres minutes and seconds) 
    //so in order to get date==date or date<=date, we have to format it into "mm-dd-yyyy" 
    //then format it to number and then compare
    user => (new Date(user.created) >= new Date(objDate.dateStart) && new Date(user.created) <= new Date(objDate.dateEnd ) )));
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
      <div className="m-2 container"  style={{fontSize:24, fontWeight:"bolder", color:"#666"}}>Professeurs</div>
      <div className="d-md-flex flex-xs-column container justify-content-between my-2 mx-auto mx-md-2 p-2">
      
      <OutlinedInput
      variant="outlined"
                  placeholder="Recherche par titre "
                  className="m-1"
                  style={{ width: 250 , height:37 }}
                  
                  size="small"
                  endAdornment={
                    <InputAdornment  position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  onChange={(e) => setSearchUsers(e.target.value)}                
                value={searchUsers}
                />

                {/* problem searching by date */}
             <SearchByDateModal getListUsersByDate={searchUsersByDate}  />   
      </div>
      
    
     <List>
                
                { (listUsers.length<1 )
                   ?(
                     <>
                     <ListItem className="d-flex justify-content-center " >
                      <center className="mt-2"><h3>No users!</h3></center>
                     </ListItem>
                    
                     </>
                    )
                   :(loading?<center>Loading ...</center>:filterListUsers(listUsers).map((el,index)=>(
                     <>
                   <ListItem >
                   <OneUser key={el._id}  user={el} render={()=>setRender(!render)} />
                   </ListItem>
                  
                     </>
                   )) )
                }
                 </List>
     
    </div>
    
  );
}


const mapStateToProps=(state)=>{
  return{
    // users:state.usersReducer.users,
    // isFetching:state.usersReducer.usersIsFetching,
    // isAuth:state.authReducer.isAuth,
    profile: state.authReducer.profile,  
  }
}

export default connect (mapStateToProps,{getUsers})(ListUsers)