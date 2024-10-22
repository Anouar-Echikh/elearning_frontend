import React,{useEffect} from 'react';
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
import PDFRecap from "./fullscreenDialogPDF"
import Event from '@material-ui/icons/Event';


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

const OneEvent=({ event, panel, render,getAllProgramsByEventId,listPrograms ,handleChange,expanded})=> {
  const classes = useStyles();
  
  


  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }
  
  
  

  return (
    <div className=" d-md-flex align-items-center flex-xs-column w-100 mx-2 ">
    <div className={classes.root}>
    
      <Accordion expanded={expanded === `panel${event._id}}`} onChange={handleChange(`panel${event._id}}`)} className=" my-2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className="d-md-flex flex-xs-column "
        >
          <div className=" container d-md-flex flex-xs-column justify-content-between">

            <Typography className={classes.heading}>{event.name}</Typography>
            <Typography className={classes.secondaryHeading}>{event.educationLevel}</Typography>


          </div>
        </AccordionSummary>

        <AccordionDetails >
      <div className=" container">
      <div><b>Nom et prénom:</b> {event.name}</div>
      <div><b>Date de naissance:</b> {moment(event.dateBirth).format("DD-MM-YYYY")}</div>
      <div><b>EducationLevel:</b> {event.educationLevel}</div>
      <div><b>Profession:</b> {event.profession}</div>
      <div><b>CIN:</b> {event.cin}</div>
      <div><b>Email:</b> {event.email}</div>
      <div><b>N° Tél:</b> {event.tel}</div>
      <div><b>Gouvernorat:</b> {event.city}</div>
      <div><b>Adresse:</b> {event.adress}</div>
 {/* valid :[{type:</b> {event.descFr}</div>String}],//array of object=>2 params{idEvent,valid} */}
 <div><b>Photo personnelle:</b>{event.avatar&&(<span> <ImageViwer items={[event&&event.avatar]}  title="Photo personnelle" name={event.name} />
 <span style={{cursor:"pointer",color:"#039EDD",marginLeft:5}} onClick={() => {handleDownload(event&&event.avatar.idFile,`${event.name}-Photo personnelle.jpg`)}}>Télécharger</span>
 </span> )} </div> 

 <div><b> Photo CIN (front):</b>{
 event.cinPhoto &&(<span> <ImageViwer items={[event.cinPhoto&&event.cinPhoto.front]}  title="CIN (front)" name={event.name} />
 <span style={{cursor:"pointer",color:"#039EDD",marginLeft:5}} onClick={() => {handleDownload(event.cinPhoto.front&&event.cinPhoto.front.idFile,`${event.name}-CIN (front).jpg`)}}>Télécharger</span> 
</span> )}</div> 
 <div><b> Photo CIN (Back):</b> {event.cinPhoto&&(<span> <ImageViwer items={[event.cinPhoto&&event.cinPhoto.back]}  title="CIN (back)" name={event.name} />
 <span style={{cursor:"pointer",color:"#039EDD",marginLeft:5}} onClick={() => {handleDownload(event.cinPhoto.front&&event.cinPhoto.front.idFile,`${event.name}-CIN (back).jpg`)}}>Télécharger</span>
 </span> )}</div> 
 <div><b>Justificatif du paiement:</b>{event.justifPay&&(<span> <ImageViwer items={[event&&event.justifPay]}  title="Justificatif du paiement" name={event.name} />
 <span style={{cursor:"pointer",color:"#039EDD",marginLeft:5}} onClick={() => {handleDownload(event.cinPhoto.front&&event.cinPhoto.front.idFile,`${event.name}-Justificatif du paiement.jpg`)}}>Télécharger</span>
 </span> )} </div> 
 <div><b>Date de création:</b> {moment(event.created).format("DD-MM-YYYY")}</div> 
 <PDFRecap member={event}/> 
           
      {/* <div className="d-md-flex flex-xs-column">
      <AddProgramDetail event={event}/>
      <ListPrograms event={event} /> 
      </div>
          
     <div className=" d-flex justify-content-center  " >
    {/* modify button 
    <ModifyModal event={event} render={render} />
    //  delete button 
    <DeleteEventAlert idEvent={event._id} render={render} /> 
  </div>*/}
          </div>
        </AccordionDetails>
      </Accordion>
      
    </div>
    
  </div>
  );
}



export default (OneEvent)