// import React, { forwardRef, useRef, useState, useImperativeHandle } from "react"
// import { Dashboard, DashboardModal } from '@uppy/react'
// import Uppy from '@uppy/core'

// import XHRUpload from '@uppy/xhr-upload'

// import {
//   //upload
//   FILE_UPLOAD_FAILED,
//   FILE_UPLOAD_SUCCESS,
//   FILE_IS_UPLOADING,
//   FILE_UPLOAD_PROGRESS
//  } from "../../redux/types/fileUploadTypes";

// import Tus from '@uppy/tus'
// import '@uppy/core/dist/style.css'
// import '@uppy/dashboard/dist/style.css'
// import Webcam from "@uppy/webcam"
// import '@uppy/core/dist/style.css'
// import '@uppy/webcam/dist/style.css'
// import { useDispatch,connect } from 'react-redux'
// import French from "@uppy/locales/lib/fr_FR"
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import PublishIcon from '@material-ui/icons/Publish';
// import {patchBook} from '../../redux/actions/bookActions'
// import {apiDeleteFileFromFolder,apiGetListCourseFolders} from "../../api/apiMicrosoft"
// import { Line, Circle } from 'rc-progress';
// import Fade from "@material-ui/core/Fade";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import io from "socket.io-client"
// const TOKEN_NAME = "ela-app-token";
// const thisSessionId = Math.random().toString(36).substr(2, 9);
// const msGraphToken="fhg48_UfGhra8_ph"

// const Uploader = forwardRef((props, ref) => {

//   const [open, setOpen] = useState(false)
//   const dispatch = useDispatch();
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [fileId, setFileId] = useState()
//   const [fileName, setFileName] = useState()
//   const [uploadSuccess,setUploadSuccess]=useState(false)
//   const [urlImage,setUrlImage]=useState(null)
//   const [isSaving,setIsSaving]=useState(false)
//   const [showAlert,setShowAlert]=useState(false)
//   const [numberOfFilesAdded,setNumberOfFilesAdded]=useState(0)

//   const uppy = React.useMemo(() => {
//     return Uppy({
//       restrictions: {
//         maxNumberOfFiles: props.maxNumberOfFiles,
//         allowedFileTypes: ['.pdf'],
//       },
      
//      meta:{
//        token:`Bearer ${localStorage.getItem(msGraphToken)}`,
//        path:props.pathUpload,
       
//      }

//     })
//       //.setMeta({ relativePath: window.webkitURL })
//      // .use(Webcam) // `id` defaults to "Webcam"
//       // or
//       //.use(Webcam, { id: 'MyWebcam' }) // `id` is… "MyWebcam"
//       .on("file-added",(file) => {
//         console.log("file-added:", file)
//         setShowAlert(false) //hide alert message "no file added!"
//         //setFileId(file.id)
//         uppy.setMeta({
//           token:`Bearer ${localStorage.getItem(msGraphToken)}`,
//         path:props.pathUpload,
//         fileId:file.id,
//         itemId:props.itemId,
//         multipleFiles:"false",//I used string value to avoid some errors in onedrive-Controller
//         name:`${props.title}.${file.extension}` // to facilitate getting  image
//       })
      
     

//       })
      
//       .use(XHRUpload, {
//         endpoint: '/xhrUploadFile',
//        //headers: { 'authorization': `Bearer ${localStorage.getItem(msGraphToken)}` },
//        headers: { 'authorization': `Bearer ${localStorage.getItem(TOKEN_NAME)}` },
//        timeout:0,
//        method: 'post',
//        formData: true,
//        fieldName: 'uploads', 
//       })   
      

//       .on('complete',async result => {
//         console.log('successful files:', result.successful)
//         if(result.successful.length>0)
//         setUploadSuccess(true)
       
//         const {response:{body:{item}}}=result.successful[0]
//         setFileId(item.id)
//         setFileName(item.name)
// // dispatch     @msgraph.downloadUrl


//         // let el = result.successful[0]
//         //   console.log(el.uploadURL)
//         //   let idFile = el.uploadURL.slice(27)
//         //   let image={idFile,...el.meta}
            
          
          
//         // console.log("ListeImges:", image)
//         // // props.getListImgs(imgIds)
//         // dispatch({ type: "ADD_ONE_FILE", payload: image })

//         // console.log('failed files:', result.failed)
//       })
//   }, [])

//   React.useEffect(()=>{
// //    /xhrUpload

// //const socket = io("http://localhost:3000/api")
// const socket = io(process.env.REACT_APP_FRONTEND_URL);
//     // Initiates the connection when the user visits the page, sending up the clients
//     // unique ID
//     socket.emit('connectInit', thisSessionId);
//     socket.on("uploadProgress", data => {
//       setUploadProgress(data)
//       console.log("[Frontend] => uploading progress obj..",data.percentage+"%")
//       dispatch({type:FILE_UPLOAD_PROGRESS,payload:data})
//         // We use Object.assign({}, obj) to create a copy of `obj`.
// const updatedFiles = Object.assign({}, uppy.getState().files)
// // We use Object.assign({}, obj, update) to create an altered copy of `obj`.
// console.log("updatedfiles!!!!!!!!!!!!!",updatedFiles)
// const updatedFile = Object.assign({}, updatedFiles[data.id], {
//   progress: Object.assign({}, updatedFiles[data.id].progress, {
//     bytesUploaded: data.bytesUploaded,
//     bytesTotal: data.bytesTotal,
//     percentage:data.percentage
//     //percentage: Math.floor((data.bytesUploaded / data.bytesTotal * 100).toFixed(2))

//   })
// })
// updatedFiles[data.id] = updatedFile //change progress values of files

// uppy.setState({files: updatedFiles})
//      })
//   return () => socket.disconnect();
//   },[])

//   // test progress-values received from server
//   React.useEffect(()=>{
  
//     console.log("[Frontend] => uploading progress..",uploadProgress+"%")
//     if (uploadProgress.percentage==100)
//     setIsSaving(false)
//   },[uploadProgress])
//   // end test

//   React.useEffect(() => {
//     return () => uppy.close()
//   }, [])

//   useImperativeHandle(ref, () => ({
//     resetUploder() {
//       console.log("hello reset!!!")
//       uppy.reset()
//     }

//   }));

//   const handleOpen = () => {
//     setOpen(true)
//     setUploadProgress(0)
//   }

//   const handleUpload=()=>{
//     if(uppy.getFiles().length>0){
//       setIsSaving(true)
//     uppy.upload()
//   }
//     else{
//       setShowAlert(true)
// console.log("no file added!!")
//     }
//   }
//   const handleClose =async () => {
//     setIsSaving(true)
//     let {data:{value}} = await apiGetListCourseFolders(`Platforme_Enseignant/Activités_de_recherche/Ouvrages-Monographies`)
//  console.log("values from oneFileUploader:", value)
    
//      if(uploadSuccess){
//        if(props.fileId){
//          if(fileId!==props.fileId){
//          let file=  value.filter((el)=>((el.id)==props.fileId))
//          console.log("file found one-upload:",file)
//          if(file.length>0)
//         await apiDeleteFileFromFolder(`Platforme_Enseignant/Activités_de_recherche/Ouvrages-Monographies`,props.fileName)//props.fileName)//delete last file
//          }
//      }
//      }
    
//  props.setFileName(fileName)//we store this file name for future use if user want to change image, so this file name is necessery to remove the last image uploaded into onedrive
 
 

//  let file=  value.filter((el)=>((el.id)==fileId))
//  console.log("file cover oneUpload:",file)
 
//  if (file.length>0){
// props.refreshUrlImage(file[0]["@microsoft.graph.downloadUrl"])
// await props.patchBook(props.itemId,{image:fileName,idImage:fileId})
// }
 

// setIsSaving(false)
//  setOpen(false)
//     uppy.reset()
//   }

//   return (
//     <div>
//       <Button
//         variant="outlined"
//         className="m-1"
//         onClick={handleOpen}
//         endIcon={<PublishIcon />}
//         style={{ width: 150 }}
//       >
//        Uploader
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         disableBackdropClick={true}
//       >
//         <DialogTitle id="alert-dialog-title" color="red">Ajouter des fichiers</DialogTitle>
//         <DialogContent>
//           < Dashboard
//             uppy={uppy}
//             inline={true}
//             // width={700}
//             height={200}
//             disableStatusBar={true}
//             disableInformer={true} 
//             //plugins={['Webcam']}
//             locale={
//               {
//                 strings: {
//                   dropPaste: 'Glisser vos fichiers ici, Collez ou %{browse}',
//                   browse: 'Accédez au dossier',
//                   // When `inline: false`, used as the screen reader label for the button that closes the modal.
//                   closeModal: 'Fermer',
//                   // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
//                   addMoreFiles: 'Ajouter plus',
//                   addMore: "Ajouter d'autres",
//                   cancel: "Annuller",
//                   uploadXFiles: {
//                     0: 'Télécharger %{smart_count} fichier',
//                     1: 'Télécharger %{smart_count} fichiers'
//                   },
//                   // TODO
//                   addingMoreFiles: 'َAjouter plus de fichiers',
//                   // Used as the header for import panels, e.g., “Import from Google Drive”.
//                   importFrom: 'Importé de %{name}',
//                   // When `inline: false`, used as the screen reader label for the dashboard modal.
//                   dashboardWindowTitle: 'Fenetre de téléchargement',
//                   // When `inline: true`, used as the screen reader label for the dashboard area.
//                   dashboardTitle: 'Téléchargement',
//                   // Shown in the Informer when a link to a file was copied to the clipboard.
//                   copyLinkToClipboardSuccess: 'Lien copié',
//                   // Used when a link cannot be copied automatically — the user has to select the text from the
//                   // input element below this string.
//                   copyLinkToClipboardFallback: 'Copier l\'url ci-dessous',
//                   // Used as the hover title and screen reader label for buttons that copy a file link.
//                   copyLink: 'Copier le lien',
//                   // Used as the hover title and screen reader label for file source icons, e.g., “File source: Dropbox”.
//                   fileSource: 'Source de fichier: %{name}',
//                   // Used as the label for buttons that accept and close panels (remote providers or metadata editor)
//                   done: 'Terminé',
//                   // TODO
//                   back: 'Précédent',
//                   // Used as the screen reader label for buttons that remove a file.
//                   removeFile: 'Supprimer',
//                   // Used as the screen reader label for buttons that open the metadata editor panel for a file.
//                   editFile: 'Modifier ',
//                   // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
//                   editing: 'Modification du %{file}',
//                   // Text for a button shown on the file preview, used to edit file metadata
//                   edit: 'Modifier',
//                   // Used as the screen reader label for the button that saves metadata edits and returns to the
//                   // file list view.
//                   finishEditingFile: 'Terminer la modification du fichier',
//                   // TODO
//                   saveChanges: 'Enregistrer',
//                   // Used as the label for the tab button that opens the system file selection dialog.
//                   myDevice: 'Mon appareil',
//                   // Shown in the main dashboard area when no files have been selected, and one or more
//                   // remote provider plugins are in use. %{browse} is replaced with a link that opens the system
//                   // file selection dialog.


//                   // Used as the hover text and screen reader label for file progress indicators when
//                   // they have been fully uploaded.
//                   uploadComplete: 'Terminé',
//                   // TODO
//                   uploadPaused: 'Téléchargement en pause',
//                   // Used as the hover text and screen reader label for the buttons to resume paused uploads.
//                   resumeUpload: 'Reprendre le téléchargement',
//                   // Used as the hover text and screen reader label for the buttons to pause uploads.
//                   pauseUpload: 'Pause',
//                   // Used as the hover text and screen reader label for the buttons to retry failed uploads.
//                   retryUpload: 'Reessayer',
//                   // Used as the hover text and screen reader label for the buttons to cancel uploads.
//                   cancelUpload: 'Annuller',

//                   // Used in a title, how many files are currently selected
//                   xFilesSelected: {
//                     0: '%{smart_count} fichier selectionné',
//                     1: '%{smart_count} fichiers selectionnés'
//                   },
//                   // TODO
//                   uploadingXFiles: {
//                     0: 'Téléchargement %{smart_count} fichier',
//                     1: 'Téléchargmentr %{smart_count} fichiers'
//                   },
//                   // TODO
//                   processingXFiles: {
//                     0: 'Processing %{smart_count} fichier',
//                     1: 'Processing %{smart_count} fichiers'
//                   },

//                   // The "powered by Uppy" link at the bottom of the Dashboard.
//                   // **NOTE**: This string is called `poweredBy2` for backwards compatibility reasons.
//                   // See https://github.com/transloadit/uppy/pull/2077
//                   poweredBy2: 'Platforme-Enseignant',

//                   // @uppy/status-bar strings:
//                   uploading: 'Téléchargement',
//                   complete: 'Terminé'
//                 }

//               }
//             }
//             thumbnailWidth={380}
//             showLinkToFileUploadResult={false}
//             metaFields={[
//               { id: 'name', name: 'Nom', placeholder: 'Nom du fichier' },
//               { id: 'captionAR', name: 'Description en Arab', placeholder: 'أضف تعليقا' },
//               { id: 'captionFR', name: 'Description en Français', placeholder: 'Ajoutez une description !' },
//               { id: 'captionENG', name: 'Description en Anglais', placeholder: 'Add a description !' }
//             ]}
           
//             {...props}
//           />
         
//         </DialogContent>
//         <DialogActions className="d-md-flex flex-column align-items-center justify-content-between container" >
//           <div >
//         <div  style={{ marginLeft:15,width: 280 }} className={uploadProgress.percentage>0?"mt-2 ":"d-none"}>
//         <span style={{fontSize:11,color:"grey"}}>  <Line percent={uploadProgress.percentage} strokeWidth="1" strokeColor="green" />Uploading: {uploadProgress.percentage}%</span>
       
//           </div>
//           <h4 className={showAlert?"":"d-none"} style={{color:"Red",marginLeft:15,marginRight:35}}>Veuillez ajouter un fichier!</h4>
        
//                           </div>
//                           <div className=" d-flex align-items-center">
//                           <div  style={{margingTop:15,marginRight:10,height:20}}>
//                           <Fade
//                             in={isSaving}
//                             style={{
//                               transitionDelay: isSaving
//                                 ? "600ms"
//                                 : "0ms",
//                               marginTop: 0,
//                               marginLeft: 10
//                             }}
//                             unmountOnExit
//                           >
//                             <CircularProgress size={20} value={100} />
//                           </Fade>
//                           </div>
//         <Button onClick={handleUpload} disabled={isSaving||uploadSuccess} color="secondary" autoFocus>
//             Upload
//           </Button>
//         <Button onClick={handleClose} color="primary" disabled={isSaving} autoFocus>
//             FERMER
//           </Button>
//           </div>
//         </DialogActions>
//       </Dialog>
//     </div>





//   )
// })
// export default connect (null,{patchBook})(Uploader);
