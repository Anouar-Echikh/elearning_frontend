import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import fileDownload from 'js-file-download'
import moment from "moment"
import ImageViwer from "./imageViewer"
import {connect} from "react-redux"
//import QrCodeModal from "./full"
import QrReader from "react-qr-reader"
import QrCodeModal from "./fullscreenDialogQRCode"
import {getOneInscriptionById} from '../../redux/actions/inscriptionActions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    // flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  options: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const QRCODE=(props)=> {
  const classes = useStyles();
  const [resultScan,setResultScan]=useState("")
  const [open,setOpen]=useState(false)
  const [member, setMember] = useState();
  


  const handleErrorFile=(error)=>{
     console.log("error scan : ", error)

  }
  
  const handleScanFile=async(result)=>{
      if(result){
      console.log("sacnResult:", result)
      setResultScan(result)
      const member= await props.getOneInscriptionById(result)
      setMember(member)
      setOpen(true)
      }
  }
  
  

  return (
    <div className=" d-md-flex align-items-center flex-xs-column w-100 mx-2 ">
    <div className={classes.root}>
    
      <div className="d-flex justify-content-center flex-column align-items-center container" style={{maxWidth:500}}>

<h3>QR Reader</h3>
<QrCodeModal open={open} member={member}/>
<QrReader  
delay={300}
style={{width:"100%"}}
onError={handleErrorFile}
onScan={handleScanFile}
/>
      </div>
    </div>
    
  </div>
  );
}



export default connect(null, { getOneInscriptionById }) (QRCODE)