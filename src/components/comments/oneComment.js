import React, { useRef, useState, useEffect } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
//import { makeStyles } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import OneRespComment from "./oneRespComment"
import { connect } from "react-redux"
import { saveComment,patchComment, deleteOneCommentById } from "../../redux/actions/commentsActions"
import { notificationAppReminder, stopReminder } from "../../redux/actions/notificationActions"
import moment from "moment"
import ValidateDialog from "./validateDialog"
import InvalidateDialog from "./invalidateDialog"
import DeleteParentComment from "./deleteDialog"


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
      marginTop: 0,


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
      maxWidth: 600,
    },
    hideRootResponse: {
      display: "none"
    },
    secondary: {

    }
  }
});

function OneComment({ currentUser, video, item,saveComment, patchComment, refreshListComments, deleteOneCommentById, notificationAppReminder }) {
  const { classes } = useStyles();
  const [comment, setComment] = useState()
  const [validated, setValidated] = useState(false)
  const [respComment, setRespComment] = useState()
  const [displayRespBox, setDisplayRespbox] = useState({ [item._id]: false });//useState with multiple values
  const [loading, setLoading] = useState(true)

  const { user } = item;

  const displayResponseBox = (id) => {
    setDisplayRespbox({ [id]: true })//useState with multiple values
  }

  const handleOnchangeComment = (e) => {
    setComment(e.target.value)
  }

  const handleOnchangeRespComment = (e) => {
    setRespComment(e.target.value)
  }


  const _handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Enter Button pressed, respComment:', respComment);
      if (respComment != "") {
        let newRespComment = {
          parentId: item._id,
          postId: item.postId,
          comment: respComment,
          replies: [],
          
        }
        let savedRespComment = await saveComment(newRespComment);
        console.log("resp comment:", savedRespComment)
        if (savedRespComment) {
        let newComment = { ...item, replies: [...item.replies, savedRespComment._id] }
        let resp = await patchComment(item._id, newComment);
        console.log("resp comment:", resp)
        if (resp) {
          setDisplayRespbox({ [item._id]: false })
          await createNotification("resp-comment")
                    
          refreshListComments();
        }
      }
      }
    }


  }

  const deleteRespComment = async (idRespComment) => {

    setLoading(true)
    let filtredListReplies = item.replies.filter((el) => el._id != idRespComment)

    let newComment = { ...item, replies: filtredListReplies.map((el)=>el._id) }
    let resp = await patchComment(item._id, newComment);
    console.log("resp comment:", resp)
    if (resp) {
      setLoading(false)
      setRespComment("");
      refreshListComments();

    }
  }

  const deleteParentComment = async (id) => {

    let resp = await deleteOneCommentById(id);
    if (resp) {
      refreshListComments();
    }
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


  //  Notification //
  const createNotification = async (val) => {
    let { subDepartment: { _id } } = video && video.theme;
    console.log("idFormation:", _id)
    let app1 = {};
    
     if (val=="resp-comment") {

      app1 = { note: { subject: "E-Learning-Academy - Notification", text: `Le professeur ${currentUser.name} a répondu à un commentaire sous la video intitulée : ${video && video.title}`, link: `/videos/${video && video._id}/${video && video.title}`, idFormation: _id }, date: 2000, important: true, type: "notif-add", level: "11", adminEmail: currentUser.email }


    } else {
      if(val="invalid")
      app1 = { note: { subject: "E-Learning-Academy - Notification", text: `Le professeur ${currentUser.name} a enlevé la validation d'un commentaire sous la video intitulée : ${video && video.title}`, link: `/videos/${video && video._id}/${video && video.title}`, idFormation: _id }, date: 2000, important: true, type: "notif-add", level: "11", adminEmail: currentUser.email }
else
app1 = { note: { subject: "E-Learning-Academy - Notification", text: `Le professeur ${currentUser.name} a validé un commentaire sous la video intitulée : ${video && video.title}`, link: `/videos/${video && video._id}/${video && video.title}`, idFormation: _id }, date: 2000, important: true, type: "notif-add", level: "11", adminEmail: currentUser.email }

    }
    await notificationAppReminder({ app: app1 })
  }

  //------------end Notification--------

  const authorizedToManageComment = (itemComment) => {
    if ((video.prof._id == currentUser._id)) //manage all
      return true
    else return false
  }

  const authorizedToResponse = (itemComment) => {
    if ((itemComment.user["_id"]!==currentUser._id))
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
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt={user && user.image && user.image.idFile ? "" : user && user.name} src={user && user.image && user.image.idFile ? user.image.idFile : ""} />
        </ListItemAvatar>
        <ListItemText
          classes={{ secondary: classes.secondary, primary: classes.text, root: item && item.validatedByAdmin ? classes.rootValidated : classes.root }}
          primary={user && user.name}
          secondary={
            <React.Fragment>

              <Typography
                sx={{ whiteSpace: "pre-line", display: "inline", overflowWrap: "break-word" }}
                component="p"
                variant="body2"
                color="text.primary"
              >
                {item.comment}
              </Typography>


            </React.Fragment>

          }
        />
      </ListItem>
      <span style={{ marginLeft: 100, padding: 0, fontSize: 12, fontWeight: "bold" }} className="  d-flex justify-content-start">

      { authorizedToResponse(item) ? <span style={{ cursor: "pointer" }} className="my-0 mx-2" onClick={() => displayResponseBox(item._id)}>Répondre</span>:""}
        {authorizedToManageComment(item) ? <DeleteParentComment loading={loading} item={item} deleteRespComment={() => deleteParentComment(item._id)} /> : ""}
        {authorizedToValidComment(item) ?( !item.validatedByAdmin?<ValidateDialog createNotification={createNotification} item={item} level={""} refreshListComments={refreshListComments} />:
      <InvalidateDialog createNotification={createNotification} item={item} level={""} refreshListComments={refreshListComments} />
      ) : ""}
        <span style={{ color: "grey" }} className="my-0 mx-2">{item && getDuration(item.created)}</span>
      </span>
      {item.replies && item.replies.length > 0 ? item.replies.map((resp) =>
        (<OneRespComment currentUser={currentUser} item={resp} video={video} deleteRespComment={deleteRespComment} level={"11"} createNotification={createNotification} refreshListComments={refreshListComments} />)

      ) : <></>
      }
      <div className={displayRespBox[item && item._id] ? "":"d-none"}>
      <ListItem
        alignItems="flex-start"
        //useState with multiple values
        classes={displayRespBox[item && item._id] ? { root: classes.rootResponse } : { root: classes.hideRootResponse }}

      >
        <ListItemAvatar>
          <Avatar alt={currentUser && currentUser.image && currentUser.image.idFile ? "" : currentUser && currentUser.name} src={currentUser && currentUser.image && currentUser.image.idFile ? currentUser.image.idFile : ""} />
        </ListItemAvatar>
        <ListItemText
          classes={{ root: classes.rootInput }}
          secondary={
            <React.Fragment>
              <InputBase
                id="aa1"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Répondre..."
                inputProps={{ 'aria-label': 'Commentaires' }}
                onChange={(e) => handleOnchangeRespComment(e)}
                value={comment}
                fullWidth
                multiline
                onKeyPress={(e) => _handleKeyDown(e)}
              />
            </React.Fragment>
          }
        />
      </ListItem>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {saveComment, patchComment, deleteOneCommentById, notificationAppReminder })(OneComment);