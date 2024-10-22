import React from 'react'

import moment from "moment"
import ModifyUserModal from "./modifyUserModal"
import DeleteOneUser from "./deleteUser"
import { connect } from "react-redux"
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { deleteUser } from "../../redux/actions/usersActions"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  Greenbadge: {
    top: "90%",
    right: 15,
    height: 18,
    width: 18,
    borderRadius: 50,
    backgroundColor: "#8bc34a",
    // The border color match the background color.
    border: `3px solid ${theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
      }`
  },
  Redbadge: {
    top: "90%",
    right: 15,
    height: 18,
    width: 18,
    backgroundColor: "#f44336",
    // The border color match the background color.
    borderRadius: 50,
    border: `3px solid ${theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
      }`
  }
}));

const OneUser = ({ user, render, deleteUser }) => {
  const classes = useStyles();
  // get duration with moment.js
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
        return `il y a une année`;
      } else {
        return `il y a ${duration.years()} ans`;
      }
    } else if (duration.months() > 0) {
      if (duration.months() === 1) {
        return `il y a un mois`;
      } else {
        return `il y a ${duration.months()} mois`;
      }
    } else if (duration.weeks() > 0) {
      if (duration.weeks() === 1) {
        return `il y a une semaine`;
      } else {
        return `il y a ${duration.weeks()} semaines`;
      }
    } else if (duration.days() > 0) {
      if (duration.days() === 1) return `il ya un jour`;
      else return `il y a ${duration.days()} jours`;
    } else if (duration.hours() > 0) {
      if (duration.hours() === 1) return `il ya une heure`;
      else return `il y a ${duration.hours()} heures`;
    } else if (duration.minutes() > 0) {
      if (duration.minutes() === 1) return `il ya une minute`;
      else return `il y a ${duration.minutes()} minutes`;
    } else {
      if (duration.seconds() < 10) return `il ya quelques secondes`;
      else return `il y a ${duration.seconds()} seconds`;
    }
  };

  return (

    <div className="w-100 m-2 p-2 d-md-flex border  flex-xs-column justify-content-md-between  rounded ">
      <div className="container d-md-flex flex-xs-column-reverse justify-content-md-between">

        <div className="m-2 p-2 d-flex flex-column justify-content-center align-items-center ">
          <div className="mb-2">
            <Badge
              variant="dot"
              // to change color of badge we should make a contional rendering classes
              classes={
                //condition of rendering
                user.connected
                  ? { badge: classes.Greenbadge }
                  : { badge: classes.Redbadge }
              }
            >
              <Avatar
                alt={user.name}
                src={user.image != null ? user.image.idFile : require('../../assets/images/avatar.png')}
                style={{
                  width: 100,
                  height: 100,
                  textDecoration: "none",
                  marginLeft: 0,
                  padding: 0
                }}
              />
            </Badge>

          </div>
          <h2><strong> {user.name}</strong></h2>
         
          <div> {user.role}</div>
        </div>
        <div className=" m-2 p-2 d-flex flex-column justify-content-center  ">



          <div><strong>Email: </strong> {user.microsoft && user.microsoft.email}</div>
          <div><strong>N° tél: </strong> {user.phone}</div>
          
          <div><strong>Dernier accès: </strong> {getDuration(user.lastLogin)}</div>
          <div><strong>Date de création: </strong> {moment(user.joined).format("DD-MM-YYYY à HH:mm")}</div>
          <div> {user.connected ? <p style={{ color: "green" }}>Connected</p> : <p style={{ color: "red" }}>Disconnected</p>}</div>
          <div> {user.active==="active" ? <span style={{ color: "green" }}>Activé</span> : <span style={{ color: "red" }}>Désactivé</span>}</div>

        </div>
      </div>
      <div className="m-2 p-2 d-flex flex-md-column justify-content-center">
        {/*modify program button */}
        <ModifyUserModal item={user} render={render} />
        {/*  delete button  */}
        <DeleteOneUser item={user} deleteOneUserById={deleteUser} render={render} />
      </div>
    </div>




  )
}

export default connect(null, { deleteUser })(OneUser);