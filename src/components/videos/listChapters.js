import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import BookIcon from '@mui/icons-material/Book';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import moment from "moment"

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView(props) {
  

    const seekTo=(item)=>{
      props.seekTo(item.startTiming)
      props.setEndTiming(item.endTiming)

      console.log("item.startTiming",moment.duration(item.startTiming*1000).asSeconds().toFixed(2))
      console.log("item.endTiming",moment.duration(item.endTiming*1000).asSeconds().toFixed(2))
      console.log("item-duration",moment.duration((item.endTiming-item.startTiming)*1000).asMinutes().toFixed(2))
  }



  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={props.chapters&&props.chapters.length>0?[props.chapters[0]["id"]]:["0"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ minHeight: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >


    { //liste des chapitres
   props.chapters&&props.chapters.length>0?
    props.chapters&&props.chapters.map((el,index)=>  
      <StyledTreeItem nodeId={el.id} labelText={el.text} labelIcon={BookIcon}>
       {//liste des séquences
        el.list&&el.list.map((item,index)=>
        <StyledTreeItem
          nodeId={index}
          labelText={item.text}
          labelIcon={PlayCircleOutlineIcon}
          labelInfo={moment.duration((item.endTiming-item.startTiming)*1000).asSeconds()>60?`${moment.duration((item.endTiming-item.startTiming)*1000).asMinutes().toFixed(0)} min`:`${moment.duration((item.endTiming-item.startTiming)*1000).seconds().toFixed(0)} sec`}
          color="#1a73e8"
          bgColor="#e8f0fe"
          onClick={()=>seekTo(item)}
        />
        )
      }
      </StyledTreeItem>
    ):<div className='d-flex flex-column align-items-center justify-content-center' style={{height:200,width:"100%"}}>
      <b>Pas de chapitres!</b>
    </div>
  
  }
    </TreeView>
  );
}

