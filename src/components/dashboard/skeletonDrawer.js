import React from "react"
import Skeleton from '@mui/material/Skeleton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const SkeletonDrawer=({classes})=>{


return(
    <div>
<Grid container justify="center" direction="column" alignItems="center">

<Skeleton animation="wave" variant="circular" width={60} height={60} sx={{ bgcolor: '#5C629B',marginTop:2 }}/>
<Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1,fontSize: '1rem',width:"40%",marginTop:2,marginBottom:5 }}variant="text"  />



</Grid>

<List>

  <>
    <ListItem
      button
      
      classes={{root:classes.rootListItem}}
    >
      <ListItemIcon className="px-0">
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1 }}variant="rectangular" width={20} height={20} />
      </ListItemIcon>
      <ListItemText className="px-0" >
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',fontSize: '1rem',borderRadius:1}}variant="text"  />
       </ListItemText> 
      
     
    </ListItem>
    <ListItem
      button
      
      classes={{root:classes.rootListItem}}
    >
      <ListItemIcon className="px-0">
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1 }}variant="rectangular" width={20} height={20} />
      </ListItemIcon>
      <ListItemText className="px-0" >
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',fontSize: '1rem',borderRadius:1 }}variant="text"  />
       </ListItemText> 
      
     
    </ListItem>
    <ListItem
      button
      
      classes={{root:classes.rootListItem}}
    >
      <ListItemIcon className="px-0">
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1 }}variant="rectangular" width={20} height={20} />
      </ListItemIcon>
      <ListItemText className="px-0" >
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1,fontSize: '1rem' }}variant="text"  />
       </ListItemText> 
      
     
    </ListItem>
    <ListItem
      button
      
      classes={{root:classes.rootListItem}}
    >
      <ListItemIcon className="px-0">
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1 }}variant="rectangular" width={20} height={20} />
      </ListItemIcon>
      <ListItemText className="px-0" >
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1,fontSize: '1rem' }}variant="text"  />
       </ListItemText> 
      
     
    </ListItem>
    <ListItem
      button
      
      classes={{root:classes.rootListItem}}
    >
      <ListItemIcon className="px-0">
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1 }}variant="rectangular" width={20} height={20} />
      </ListItemIcon>
      <ListItemText className="px-0" >
      <Skeleton animation="wave" sx={{ bgcolor: '#5C629B',borderRadius:1,fontSize: '1rem' }}variant="text"/>
       </ListItemText> 
      
     
    </ListItem>
    
  </>
</List>
</div>)
};
export default SkeletonDrawer;