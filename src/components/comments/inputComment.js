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
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from "@material-ui/core/Button";
import { color } from "@mui/system";
import { connect } from "react-redux"
import { saveComment } from "../../redux/actions/commentsActions"
import { notificationAppReminder, stopReminder } from "../../redux/actions/notificationActions"



const useStyles = makeStyles()((theme) => {
  return {
    list: {
      width: 300,
      border: "1px solid gray"
    },
    text: {
      fontWeight: "bold",
      //   fontFamily: "courier",
      //   color: "blue",
      //   backgroundColor: "orange"
    },
    root: {
      borderRadius: 20,
      backgroundColor: "#ebedeb",
      padding: 10,
      marginBottom: 0,
      marginTop: 0
    },
    rootInput: {
      borderRadius: 20,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "lightGrey",
      padding: 10,
      marginBottom: 0,
      marginTop: 0
    },
    rootResponse: {
      marginLeft: 30,
      maxWidth: 600

    },
    hideRootResponse: {
      display: "none"
    },

  }
});

function AlignItemsList({ user, videoId, video, currentUser, saveComment, refreshListComments, notificationAppReminder }) {
  const { classes } = useStyles();
  const [comment, setComment] = useState()
  const [respComment, setRespComment] = useState()
  //const [displayRespBox,setDisplayRespbox]=useState({[item.idParent]:false});//useState with multiple values



  const displayResponseBox = (id) => {
    // setDisplayRespbox({[id]:true})//useState with multiple values
  }

  const handleOnchangeComment = (e) => {
    setComment(e.target.value)
  }

  const handleOnchangeRespComment = (e) => {
    setRespComment(e.target.value)
  }

  const _handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      console.log('Enter Button pressed, comment:', comment);
      if (comment != "") {
        let newComment = {
          parentId: "root",
          postId: videoId,
          comment,
          replies: []
        }
        let resp = await saveComment(newComment);
        console.log("resp comment:", resp)
        if (resp) {
          setComment("");
          refreshListComments()
         await createNotification("comment")
        
        }
      }


    }
    /*
     parentId: { type: String },
  validatedByAdmin:{type:Boolean,default:false},
  comment: { type: String },
  postId: { type: String },
  replies:[{type:Object}],
    
    */

  }
  //  Notification //
  const createNotification = async (val) => {
    let { subDepartment: { _id } } = video && video.theme;
    console.log("idFormation:", _id)
    let app1 = {};
    if (val == "valid") {
      app1 = { note: { subject: "E-Learning-Academy - Notification", text: `Le professeur ${currentUser.name} a validé un commentaire sous la video intitulée : ${video && video.title}`, link: `${process.env.REACT_APP_STUDENT_URL}/#/videos/${video && video._id}/${video && video.title}`, idFormation: _id }, date: 2000, important: true, type: "notif-add", level: "11", adminEmail: currentUser.email }

      console.log("app:", app1)
      //console.log("getTime():=>",((savedApp.startDate).getTime()-  new Date().getTime() )- 300000)
    } else if ("comment") {

      app1 = { note: { subject: "E-Learning-Academy - Notification", text: `Le professeur ${currentUser.name} a commenté la video intitulée : ${video && video.title}`, link: `${process.env.REACT_APP_STUDENT_URL}/#/videos/${video && video._id}/${video && video.title}`, idFormation: _id }, date: 2000, important: true, type: "notif-add", level: "11", adminEmail: currentUser.email }


    } else {
      app1 = { note: { subject: "E-Learning-Academy - Notification", text: `Le professeur ${currentUser.name} a enlevé la validation d'un commentaire sous la video intitulée : ${video && video.title}`, link: `${process.env.REACT_APP_STUDENT_URL}/#/videos/${video && video._id}/${video && video.title}`, idFormation: _id }, date: 2000, important: true, type: "notif-add", level: "11", adminEmail: currentUser.email }

    }
    await notificationAppReminder({ app: app1 })
  }

  //------------end Notification--------

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user && user.image && user.image.idFile ? "" : user && user.name} src={user && user.image && user.image.idFile ? user.image.idFile : ""} />
        </ListItemAvatar>
        <ListItemText
          classes={{ root: classes.rootInput }}
          secondary={
            <React.Fragment >
              <InputBase
                id="aa2"

                sx={{ ml: 1, flex: 1 }}
                placeholder="Ecrivez un commentaire..."
                inputProps={{ 'aria-label': 'Commentaires' }}
                onChange={(e) => handleOnchangeComment(e)}
                value={comment}
                multiline
                fullWidth
                onKeyPress={(e) => _handleKeyDown(e)}
              />
            </React.Fragment>
          }
        />
      </ListItem>


    </List>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, { saveComment, notificationAppReminder })(AlignItemsList);