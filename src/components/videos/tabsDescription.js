
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
 import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import AllComments from "../comments/allComments"
import InputComment from "../comments/inputComment"
import {connect} from "react-redux"
import Button from '@material-ui/core/Button';
import ListFiles from "../course-files/listFiles"


 function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    
  };
}


 function ScrollableTabsButtonVisible(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <Box  sx={{minHeight:250, width: '100%',margin:"5px"  }}>
    <Box sx={{ flexGrow: 1, width: "100%", bgcolor: 'background.paper' ,fontSize:12}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        
        aria-label="visible arrows tabs example"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Description" style={{marginRight:30}} {...a11yProps(0)}/>
        <Tab label="Fichiers" style={{marginRight:20}} {...a11yProps(1)}/>
       
        
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      {props.description}
      </TabPanel>   
          <TabPanel value={value} index={1}>
          
          <ListFiles video={props.video}/>
           
       </TabPanel>
       
    </Box>
  );
  
}

const mapStateToProps = ({ authReducer }) => {
  return {
    profile: authReducer.profile,
    isAuth: authReducer.isAuth
  };
};

export default connect (mapStateToProps)(ScrollableTabsButtonVisible)