import React, { forwardRef, useRef,useState, useImperativeHandle} from "react"
import { Dashboard, DashboardModal } from '@uppy/react'
import Uppy from '@uppy/core'
//import Webcam from "@uppy/webcam"
import Tus from '@uppy/tus'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { useDispatch } from 'react-redux'
//import French from "@uppy/locales/lib/fr_FR"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import PublishIcon from '@material-ui/icons/Publish';
const TOKEN_NAME = "comis-app-token";


const Uploader = forwardRef((props, ref) => {

  const [open,setOpen]=useState(false)
  const [fileName,setFileName]=useState("no filename")
  const [uploadSuccess,setUploadSuccess]=useState(false)

  const dispatch = useDispatch();
  const uppy = React.useMemo(() => {
    return Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes:  ['.gzip']
      },
    })
      //.use(Webcam) // `id` defaults to "Webcam"
      // or
      //.use(Webcam, { id: 'MyWebcam' }) // `id` is… "MyWebcam"
      .on("file-added",(file) => {
        console.log("file-added:", file)
        //setShowAlert(false) //hide alert message "no file added!"
       setFileName(file.name)
        uppy.setMeta({
         // multipleFiles:"false",//I used string value to avoid some errors in onedrive-Controller
        name:`${file.name}` // to facilitate getting  image
      })
    })

      .use(Tus,
        {
          endpoint: `/upload-backups`,
          headers: { 'authorization': `Bearer ${localStorage.getItem(TOKEN_NAME)}` },
        })


      .on('complete', result => {
        console.log('successful files:', result.successful)
        if(result.successful.length>0)
        {
        setUploadSuccess(true)
        let el = result.successful[0]
          console.log(el.uploadURL)
          let idFile = el.uploadURL.slice(30)
          let image={idFile,...el.meta}
            
          
          
        console.log("ListeImges:", image)
        // props.getListImgs(imgIds)
        dispatch({ type: "ADD_ONE_FILE", payload: image })

        console.log('failed files:', result.failed)
        }
      })
  }, [])
  
  React.useEffect(() => {
    return () => uppy.close()
  }, [])

useImperativeHandle(ref, () => ({
  resetUploder(){
    console.log("hello reset!!!")
    uppy.reset()
  }

}));

const handleOpen =()=> {
  setOpen(true)
}

const handleContinueButton =async()=> {
  if(uploadSuccess){
  await props.refreshListFiles()
  setUploadSuccess(false)
  setOpen(false)
  uppy.reset()
  }
   }

const handleClose =()=> {
setOpen(false)
uppy.reset()
}

  return (
    <div>
<Button
        variant="outlined"
        className="mx-1 my-3"
        onClick={handleOpen}
        endIcon={<PublishIcon />}
        style={{ width: 150}}
        color="primary"
        disabled={props.loading}
      >
      Uploader
      </Button>

<Dialog
        open={open}
        onClose={ handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="red">Uploader un fichier Backup</DialogTitle>
        <DialogContent>
     < Dashboard
      uppy={uppy}
      inline={true}
      width={700}
      height={250}
      locale={
      {
        strings: {
          dropPaste: 'Glisser vos fichiers ici, Collez ou %{browse}',
          browse: 'Parcourir',
          // When `inline: false`, used as the screen reader label for the button that closes the modal.
          closeModal: 'Fermer',
          // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
          addMoreFiles: 'Ajouter plus',
          addMore:"Ajouter d'autres",
          cancel:"Annuller",
          uploadXFiles: {
            0: 'Télécharger %{smart_count} fichier',
            1: 'Télécharger %{smart_count} fichiers'
          },
          // TODO
          addingMoreFiles: 'َAjouter plus de fichiers',
          // Used as the header for import panels, e.g., “Import from Google Drive”.
          importFrom: 'Importé de %{name}',
          // When `inline: false`, used as the screen reader label for the dashboard modal.
          dashboardWindowTitle: 'Fenetre de téléchargement',
          // When `inline: true`, used as the screen reader label for the dashboard area.
          dashboardTitle: 'Téléchargement',
          // Shown in the Informer when a link to a file was copied to the clipboard.
          copyLinkToClipboardSuccess: 'Lien copié',
          // Used when a link cannot be copied automatically — the user has to select the text from the
          // input element below this string.
          copyLinkToClipboardFallback: 'Copier l\'url ci-dessous',
          // Used as the hover title and screen reader label for buttons that copy a file link.
          copyLink: 'Copier le lien',
          // Used as the hover title and screen reader label for file source icons, e.g., “File source: Dropbox”.
          fileSource: 'Source de fichier: %{name}',
          // Used as the label for buttons that accept and close panels (remote providers or metadata editor)
          done: 'Terminé',
          // TODO
          back: 'Précédent',
          // Used as the screen reader label for buttons that remove a file.
          removeFile: 'Supprimer',
          // Used as the screen reader label for buttons that open the metadata editor panel for a file.
          editFile: 'Modifier ',
          // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
          editing: 'Modification du %{file}',
          // Text for a button shown on the file preview, used to edit file metadata
          edit: 'Modifier',
          // Used as the screen reader label for the button that saves metadata edits and returns to the
          // file list view.
          finishEditingFile: 'Terminer la modification du fichier',
          // TODO
          saveChanges: 'Enregistrer',
          // Used as the label for the tab button that opens the system file selection dialog.
          myDevice: 'Mon appareil',
          // Shown in the main dashboard area when no files have been selected, and one or more
          // remote provider plugins are in use. %{browse} is replaced with a link that opens the system
          // file selection dialog.


          // Used as the hover text and screen reader label for file progress indicators when
          // they have been fully uploaded.
          uploadComplete: 'Terminé',
          // TODO
          uploadPaused: 'Téléchargement en pause',
          // Used as the hover text and screen reader label for the buttons to resume paused uploads.
          resumeUpload: 'Reprendre le téléchargement',
          // Used as the hover text and screen reader label for the buttons to pause uploads.
          pauseUpload: 'Pause',
          // Used as the hover text and screen reader label for the buttons to retry failed uploads.
          retryUpload: 'Reessayer',
          // Used as the hover text and screen reader label for the buttons to cancel uploads.
          cancelUpload: 'Annuller',

          // Used in a title, how many files are currently selected
          xFilesSelected: {
            0: '%{smart_count} fichier selectionné',
            1: '%{smart_count} fichiers selectionnés'
          },
          // TODO
          uploadingXFiles: {
            0: 'Téléchargement %{smart_count} fichier',
            1: 'Téléchargmentr %{smart_count} fichiers'
          },
          // TODO
          processingXFiles: {
            0: 'Processing %{smart_count} fichier',
            1: 'Processing %{smart_count} fichiers'
          },

          // The "powered by Uppy" link at the bottom of the Dashboard.
          // **NOTE**: This string is called `poweredBy2` for backwards compatibility reasons.
          // See https://github.com/transloadit/uppy/pull/2077
          poweredBy2: 'Admin - Voix & parole',

          // @uppy/status-bar strings:
          uploading: 'Téléchargement',
          complete: 'Terminé'
        }

      }
      }
      thumbnailWidth={380}
      showLinkToFileUploadResult={false}
      metaFields={[
        { id: 'name', name: 'Nom', placeholder: 'Nom du fichier' },
        { id: 'captionAR', name: 'Description en Arab', placeholder: 'أضف تعليقا' },
        { id: 'captionFR', name: 'Description en Français', placeholder: 'Ajoutez une description !' },
        { id: 'captionENG', name: 'Description en Anglais', placeholder: 'Add a description !' }
      ]}
      plugins={['Webcam']}
      {...props}
    />
        </DialogContent>
        <DialogActions>
         
        <Button onClick={handleContinueButton} color="primary" autoFocus>
            Continuer
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Annuller
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  
    
    
    
  )
})
export default Uploader;
