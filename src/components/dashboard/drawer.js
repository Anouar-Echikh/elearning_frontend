import React from "react"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {  Link, Route, Routes } from "react-router-dom";

const Drawer = ({classes, 
    titles, 
    handlClickListItem,
    handleCollapsListMenuClick,
    getNavList,
    props})=>(
    <div>
      <Grid container justify="center" direction="column" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={
            props.profile.image
              ? props.profile.image.idFile
              : require("../../assets/images/123.jpg")
          }
          className={classes.DrawerAvatar}
        />
        <span className=" text-bold ">{props.profile.name}</span>
        <span className="mb-2 small text-white">
          {props.profile.role}
        </span>
      </Grid>

      <List>
        {getNavList(props.profile.role).map((item, indexItem) => (
          <>
            <ListItem
              button
              onClick={()=> handleCollapsListMenuClick(item)}
              component={item.children.length > 0 ? "" : Link}
               to={item.url}
              key={item.title}
              exact
              classes={{root:classes.rootListItem}}
            >
              <ListItemIcon className="px-0">
                <item.icon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText className="px-0" primary={item.title} />
              {item.children.length > 0 ? (
                titles[item.title] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                ""
              )}
            </ListItem>

            <Collapse
              in={titles[item.title]}
              component="li"
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.children.map((child, index) => (
                  <ListItem
                  
                    button
                    onClick={() => handlClickListItem(child.url)}
                    component={Link}
                     to={child.url}
                    key={index}
                    className="pl-2"
                  >
                    <ListItemIcon className="px-0">
                      <child.icon sx={{ color: "white" }}  />
                    </ListItemIcon>
                    <ListItemText className="px-0" primary={child.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        ))}

        {/* <ListItem button component={Link} to="/mailBox" onClick={()=>setMobileOpen(false)}  classes={{root:classes.rootListItem}}>
          <ListItemIcon>
            <MailIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Mailbox" />
        </ListItem> */}

        {/* <ListItem button component={Link} to="/notifications" onClick={()=>setMobileOpen(false)}  classes={{root:classes.rootListItem}}>
          <ListItemIcon>
            <NotificationsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem> */}
      </List>
    </div>
  );

  export default Drawer;