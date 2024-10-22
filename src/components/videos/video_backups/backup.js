import React, { Component,useState,useEffect} from "react";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

//import {apiDownloadFileFromServer,apiDeleteFileFromServer} from '../../../../api/apiDownload'
import {apiGetLastBackup,apiCreateBackup,apiGetBackupListFiles,apiDeleteFileFromServer,apiDownloadFileFromServer,apiRestoreMongoDB} from '../../api/apiBackups'
import BeatLoader from "react-spinners/BeatLoader"
import {connect,useDispatch} from 'react-redux'
import download from 'js-file-download';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import RestoreIcon from '@mui/icons-material/Restore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Tooltip from '@mui/material/Tooltip';
import RestoreAlertModal from "./restoreAlertDialog"
import DeleteAlertModal from "./deleteAlertDialog"
import OneFileUploader from "./oneFileUploder"
import moment from 'moment'
import { useSnackbar } from 'notistack';
import {notificationAppReminder} from '../../redux/actions/notificationActions'



 const  Backups =(props)=> {

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch()
  const [render,setRender]=useState(false)
  const [filename,setFilename]=useState("")

  const [listItems,setListItems]=useState([])
  const [searchItemsById,setSearchItemsById]=useState("")
  const [searchItemsByNom,setSearchItemsByNom]=useState("")
  const [searchItemsByPrenom,setSearchItemsByPrenom]=useState("")
  const [allItems,setAllItems]=useState([])
  const [loading, setLoading] = useState(false);

  const getAllFiles=async()=>{
    setLoading(true)
  try{
    
   
  const {data:{listFiles}}=await apiGetBackupListFiles()
  console.log("allItems:",listFiles)
  setAllItems(listFiles)
  setLoading(false)
  }
  catch(e) {
  console.log(e)
  setLoading(false)
  }
  }
  
  useEffect(()=>{
    getAllFiles()
  },[])

  const spinner=()=>{
    return( <div className="animated fadeIn pt-3 text-center mx-auto" style={{marginTop:20,marginBottom:20}}><BeatLoader color="#067BE3" loading={true} size={12}/></div>)
  }



 const createBackup=async()=>{
  setLoading(true)
  try{
console.log("create backup func!")
const {data:{success,listFiles}}=await apiCreateBackup("elearning")
if(success){
  await refreshListFiles()
  setLoading(false)
  enqueueSnackbar('Le fichier Backup  a été bien crée!', { variant: 'success' });
}else{
  setLoading(false)
  enqueueSnackbar('Echec de création Backup !', { variant: 'error' });
}
}
catch(e) {
console.log(e)
setLoading(false)
  enqueueSnackbar('Echec de création Backup !', { variant: 'error' });
}
}

const deleteBackupFileButton=(filename)=>{
 setFilename(filename)
  dispatch({ type: "OPEN_DELETE", payload: { title: "Avertissement !", bodyText: "Voulez-vous vraiment supprimer ce fichier de restauration?" } })
 }

const restoreBackupFileButton=(filename)=>{
  setFilename(filename)
    dispatch({ type: "OPEN_RESTORE", payload: { title: "Avertissement !", bodyText: "Toutes les données -à partir de ce point de restauration- seront perdues! Voulez-vous continuer?" } })
}

const restoreMongoDB=async()=>{
console.log('restore fun!')
console.log('restore filename:',filename)
try{
setLoading(true)
const {data:{success}}=await apiRestoreMongoDB(filename)
if(success){
const {data:{lastBackup}}=await apiGetLastBackup();
console.log("lastBackup:",lastBackup)
  createNotification("Restauration de la base de données.",lastBackup.date)
  await refreshListFiles()     
  setLoading(false)
  enqueueSnackbar('La restauration a été bien effectuée !', { variant: 'success' });
}else{
  setLoading(false)
  enqueueSnackbar('Echec de restauration DB!', { variant: 'error' });
}
}catch(e) {
  console.log(e)
  setLoading(false)
    enqueueSnackbar('Echec de restauration DB!', { variant: 'error' });
  }
}

const deleteBackupFile=async()=>{
console.log("filename:",filename)
try{
  setLoading(true)
  console.log('delete backup file fun!')
const {data:{success}}=await apiDeleteFileFromServer(filename)
if(success){
  await refreshListFiles()
  setLoading(false)
  enqueueSnackbar('Le fichier BKP a été supprimé avec succès !', { variant: 'success' });
}else{
  setLoading(false)
  enqueueSnackbar('Echec de suppression BKP !', { variant: 'error' });
}
}catch(e) {
  console.log(e)
  setLoading(false)
    enqueueSnackbar('Echec de suppression BKP!', { variant: 'error' });
  }
}

const downloadBackupFile=async(filename)=>{
  console.log('download backup file fun!')
 
  let res=  await apiDownloadFileFromServer(filename)
  download(res.data, filename);

}

const refreshListFiles=async()=>{
  await getAllFiles()
}

//convert bytes ...
const bytesToSize=(bytes)=>{
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


// ----- Notification ----- //
const createNotification=async (operation,dateBackup)=>{
  let app1={};
  
   app1= { note: { subject: "Platforme Etudiant - Notification",text:`Une opération backup a été effectuée`,admin:props.currentUser.name,level:"user",dateBackup:dateBackup,startDate:"",endDate:"",operation:operation,userName: "",
    userEmail:""},date:2000, important: true, type: "notif-backup", level: "", adminEmail: props.currentUser.email }

  console.log("app:", app1)
 
  await props.notificationAppReminder({ app:app1 })
}
// ----- end Notification ----- //

return (
    <div>
      <DeleteAlertModal deleteFile={deleteBackupFile}  />
      <RestoreAlertModal resotreMongoDB={restoreMongoDB} />
    <h1><b> Backups</b></h1>
    <div className="d-flex justify-content-start">
    <Button disabled={loading} className="my-3 mr-1" variant="contained" color="secondary" onClick={createBackup}> Create Backup</Button>
    <OneFileUploader refreshListFiles={refreshListFiles} loading={loading}/>
    </div>
    <div className="table-responsive" style={{width:"99%"}}>
  <table className="table table-bordered">
           
     
  <thead class="thead-light">
    <tr>
      <th className="text-center" scope="col" >#</th>
      <th scope="col"  >Backup file</th>
      <th scope="col"   >Size</th>
      <th scope="col"   >Creation</th>
      
      <th scope="col" className="text-center"  >Options</th>
    </tr>
  </thead>
  <tbody>
 {loading? 
 <tr >
 <td className="text-align-center" colspan="8">{ spinner()}</td>  
 </tr>
 :( allItems.length>0?allItems.map((el,index)=>
    <tr key={index+1}>
      <th scope="row" className=" text-center align-middle" >{index+1}</th>
      <td  className="  align-middle"  >{el.filename}</td>
      <td  className="  align-middle" >{bytesToSize(Number(el.size))}</td>
      <td  className="  align-middle" ><b>{moment(el.created).format("DD-MM-YYYY à HH:mm")}</b></td>
      <td  style={{maxWidth:50}}>
        <span className="d-flex justify-content-center flex-column flex-md-row" >
        <Tooltip title="Restaurer">
        <IconButton aria-label="restore" className="m-1 " color="primary" onClick={()=>restoreBackupFileButton(el.filename)}>
        <RestoreIcon />
      </IconButton>
      </Tooltip>
      <Tooltip title="Download">
      <IconButton aria-label="download" className="m-1" onClick={()=>downloadBackupFile(el.filename)}>
        <CloudDownloadIcon />
      </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
      <IconButton aria-label="delete" className="m-1" color="error" onClick={()=>deleteBackupFileButton(el.filename)} >
        <DeleteIcon  />
      </IconButton>
      </Tooltip>
        </span>

      </td>
    
      
    </tr>):
    <tr >
    <td className="  text-align-center" colspan="8">
    <div className="animated fadeIn  text-center mx-auto" style={{marginTop:20,marginBottom:20,fontWeight:"bold"}}>Vide!</div>
    </td>  
    </tr>
 )
   
}  
  </tbody>
</table>
        
     
    

    </div>
    </div>)
  }



const mapStateToProps = ({ authReducer,authStudentReducer }) => {
  return {
    currentUser: authReducer.profile,
   
    isAuth: authReducer.isAuth,
    
  };
};

export default connect(mapStateToProps, {notificationAppReminder  })(Backups);
