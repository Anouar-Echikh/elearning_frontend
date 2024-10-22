import React, { useRef, useState, useEffect } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from 'tss-react/mui';
import { grey } from "@mui/material/colors";

import moment from "moment"
import ValidateDialog from "./validateDialog"
import InvalidateDialog from "./invalidateDialog"
import DeleteComment from "./deleteDialog"


const useStyles = makeStyles()((theme) => {
  return{
    list: {
      width: "300",
      border: "1px solid gray"
    },
    text: {
      fontWeight: "bold",
    },
    root:{
        borderRadius:20,
        backgroundColor:"#ebedeb",
        padding:10,
        marginBottom:0,
        marginTop:0
    },
    rootInput:{
        borderRadius:20,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"lightGrey",
        padding:10,
        marginBottom:0,
        marginTop:0
    },
    rootValidated: {
      borderRadius: 20,
      backgroundColor: "#dbfcc0",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#55ba02",
      padding: 10,
      marginBottom: 0,
      marginTop: 0,
      whiteSpace: 'normal'
    },
    rootResponse :{
        marginLeft:30,
        maxWidth:650

    },
    hideRootResponse :{
      display:"none"
  },
    
}
  });

export default function AlignItemsList({item,createNotification,video,refreshListComments,currentUser,level,deleteRespComment}) {
    const {classes} = useStyles();
   const [comment,setComment]=useState()
   const [respComment,setRespComment]=useState()
   const [displayRespBox,setDisplayRespbox]=useState({[item.id]:false});//useState with multiple values
   const {user}=item;


const displayResponseBox=(id)=>{
  setDisplayRespbox({[id]:true})//useState with multiple values
}

const handleOnchangeComment=(e)=>{
setComment(e.target.value)
}

const handleOnchangeRespComment=(e)=>{
    setRespComment(e.target.value)
}


const getDuration = date => {
  //using moment.js
  const dateFormatted = moment(date).format();
  const dateCreation = moment(dateFormatted);
  const currentDate = moment();
  //difference entre les deux dates
  const duration = moment.duration(currentDate.diff(dateCreation));
  // conditional return
  if (duration.years() > 0) {
    if (duration.years() === 1) {
      return `1 an`;
    } else {
      return `${duration.years()} ans`;
    }
  } else if (duration.months() > 0) {
    if (duration.months() === 1) {
      return `1 mois`;
    } else {
      return `${duration.months()} mois`;
    }
  } else if (duration.weeks() > 0) {
    if (duration.weeks() === 1) {
      return `1 sem`;
    } else {
      return `${duration.weeks()} sem`;
    }
  } else if (duration.days() > 0) {
    if (duration.days() === 1) return `1 j`;
    else return `${duration.days()} j`;
  } else if (duration.hours() > 0) {
    if (duration.hours() === 1) return `1 h`;
    else return `${duration.hours()} h`;
  } else if (duration.minutes() > 0) {
    if (duration.minutes() === 1) return `1 min`;
    else return `${duration.minutes()} min`;
  } else {
    if (duration.seconds() === 1) return `1 s`;
    else return `${duration.seconds()} s`;
  }
};

const authorizedToManageComment = (itemComment) => {
  if ((video.prof._id == currentUser._id))
    return true
  else return false
}

const authorizedToValidComment = (itemComment) => {
  if ((video.prof._id == currentUser._id && itemComment.user["_id"]!==currentUser._id))
    return true
  else return false
}

return (
    
     <>
      <ListItem alignItems="flex-start"
      classes={{ root:classes.rootResponse} }
      >
        <ListItemAvatar>
        <Avatar alt={user&&user.image&&user.image.idFile?"":user&&user.name} src={user&&user.image&&user.image.idFile?user.image.idFile:""} />
        </ListItemAvatar>
        <ListItemText
        classes={{ primary: classes.text,root:item && item.validatedByAdmin ? classes.rootValidated : classes.root }}
          primary={user&&user.name}
          secondary={
            <React.Fragment>
                
              <Typography
                 sx={{whiteSpace: "pre-line",display:"inline",overflowWrap: "break-word"  }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.comment}
              </Typography>
              
         
            </React.Fragment>
            
          }
        />
      </ListItem>
      <span style={{marginLeft:100 , padding:0, fontSize:12,fontWeight:"bold"}} className="  d-flex justify-content-start">
      
      {authorizedToManageComment(item)?<DeleteComment item={item} deleteRespComment={()=> deleteRespComment(item&&item._id)} />:""}
      {authorizedToValidComment(item) ?( !item.validatedByAdmin?<ValidateDialog createNotification={createNotification} item={item} level={level}  refreshListComments={refreshListComments} />:
    <InvalidateDialog createNotification={createNotification} item={item} level={level} refreshListComments={refreshListComments} />
  ) : ""}
     <span style={{color:"grey" }} className="my-0 mx-2">{item.created&&getDuration(item.created)}</span>
      </span>
      
      </> 
  );
}
