import React, { useRef, useState, useEffect } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@material-ui/core';
import { grey } from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from "@material-ui/core/Button";
import { color } from "@mui/system";
import InputComment from "./inputComment"
import OneComment from "./oneComment"
import { connect } from "react-redux"
import { getAllCommentsByPostId } from "../../redux/actions/commentsActions"
import LoadingOverlay from "react-loading-overlay";
import HashLoader from "react-spinners/HashLoader"


const useStyles = makeStyles({
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


});

const items = [
  { id: 1, idParent: 0, name: "Anouar", comment: "Comment 1", replies: [{ id: "qq", idParent: 1, name: "Mohamed", comment: "CommentResp.. 1" }, { id: "qs", idParent: 1, name: "Salah", comment: "CommentResp.. 2" }] },
  { id: 2, idParent: 0, name: "Ali", comment: "Comment 2", replies: [] },
  { id: 3, idParent: 0, name: "Dr. Habib Besbes", comment: "Comment 3", replies: [] },
]

function AlignItemsList({ currentUser, videoId, video, refreshListComments, allComments,loading }) {
  const classes = useStyles();

  //const [allComments,setAllComments]=useState([])
  //const [loading, setLoading] = useState(true)
  const [render, setRender] = useState(false)


  //   const getListCommentsByPostId=async()=>{
  //    setLoading(true)
  //   try{
  //       console.log("videoId:",videoId)
  //  const list=await getAllCommentsByPostId(videoId)  //  ** ok ** il faut preciser bien les commentaires
  //  //const list=await getAllCommentsByPostId(video._id)
  //   console.log("allComments:",list)

  //   setAllComments(list)
  //    setLoading(false)
  //   }
  //   catch(e) {
  //   console.log(e)
  //   }
  //   }


  // useEffect(()=>{
  //    // getListCommentsByPostId()
  // },[])


  return (
    <div style={{ width: "inherit" }}>
      <InputComment user={currentUser} videoId={videoId} currentUser={currentUser} video={video} refreshListComments={refreshListComments} />
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

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {
            (allComments && allComments.length < 1)
              ?

              <ListItem className="d-flex justify-content-center " style={{ marginTop: 50 }}>
                <center className="mt-2"><h3>0 commentaires!</h3></center>
              </ListItem>
              :
              allComments && allComments.map((el,index) => <OneComment video={video} key={index} currentUser={currentUser} item={el}  refreshListComments={refreshListComments} />)
          }

        </List>
      </LoadingOverlay>
    </div>);
}
const mapStateToProps = (state) => {
  return {


  }
}

export default connect(mapStateToProps, { getAllCommentsByPostId })(AlignItemsList)