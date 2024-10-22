
import React, { useEffect,useState } from "react"
//import SponsorItem from "./sponsorsItem"
import {connect,useDispatch, useSelector} from "react-redux"
import {getOneVideoById,patchVideo} from "../../redux/actions/videosActions"
import OneFileUploader from "./oneFileUploder"
import axios from "axios";
import {apiDownloadFileFromServer,apiDeleteFileFromServer} from '../../api/apiDownload'
import download from 'js-file-download';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DeleteFile from "./deleteDialog"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const items=[
{
id:0,
title:"File 1",
fileLink:"file1.png"
},
{id:0,
title:"File 2",
fileLink:"file2.png"
},
{
id:0,
title:"File 3",
fileLink:"file3.png"
},
]

const ListFiles=({video,getOneVideoById,patchVideo})=>{

const uploadedFile = useSelector(state => state.filesReducer.oneFile)
console.log("uploadedFile",uploadedFile)
  
const [allFiles,setAllFiles]=useState(video&&video.files)
const [loading,setLoading]=useState(false)

const AddFile=async()=>{

    let newListFiles=allFiles?[...allFiles,uploadedFile]:[uploadedFile]


let resp = await patchVideo(video._id,{...video,files:newListFiles})

if(resp){
    await getVideoDetails()
}
}



const deleteFile=async(file)=>{
    let filtredList=allFiles.filter((el)=>el.idFile!=file.idFile)
    let resp = await patchVideo(video._id,{...video,files:filtredList})

if(resp){
    await getVideoDetails()
    let success= await deleteFileFromServer(file)
    console.log("success:",success)
}
}
  


  const getVideoDetails=async()=>{
   // setLoading(true)
   console.log("oneVideo:",video)
  try{
  const video1=await getOneVideoById(video&&video._id)
  console.log("oneVideo:",video)
  setAllFiles(video1.files)
  // setLoading(false)
  }
  catch(e) {
  console.log(e)
  }
  }
  
//   idFile: "/files/0bda520157d431c6f949349c347534a7"
//   name: "Détails techniques.docx"
//   relativePath: null
//   type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

const getDownloadUrl=async(file)=> {
    let path = file.idFile.slice(1)
    console.log("path:",path)
    let data={
        path,
        fileName:file.name
    }
  let res=  await apiDownloadFileFromServer(data)
  download(res.data, file.name);
  }

  const deleteFileFromServer=async(file)=> {
    let path = file.idFile.slice(1)
    console.log("path:",path)
    let data={
        path,
        fileName:file.name
    }
  let {data:{success}}=  await apiDeleteFileFromServer(data)
  console.log("resUnlink:",success)
  return success
  }

    return (
        <>
<OneFileUploader maxNumberOfFiles={1} addFile={AddFile} />
<div class="table-responsive" style={{marginTop:20}}>
            <table class="table  ">
           <thead class="table-light">
           <tr>
           <th scope="col">#</th>
           <th class="w-75" scope="col">Fichiers</th>
           
           <th class="w-25" scope="col"></th>
           
           </tr>
           </thead>
           <tbody  >
{
    allFiles&&allFiles.length<0||allFiles==undefined
    
    ?    
    // <center>No Files!</center>
    <tr style={{textAlign:"center"}}>
    <td colSpan={4}> No Files!</td>
    </tr>
    
    : (
    loading?
    <tr style={{textAlign:"center"}}>
    <td colSpan={4}>Loading files..</td>
    </tr>
    
    :allFiles&&allFiles.map((file,index)=>(

        <tr style={{alignItems:"center"}}>
           <th scope="row">{index+1}</th>
           {/* <td>{file.name}</td> */}
           <td> <a  target="_blank" style={{cursor:"pointer",color:"blue"}} onClick={async()=>await getDownloadUrl(file)} >
           {file.name}
        </a></td>
           
           <td className="d-flex"> 
           <IconButton aria-label="delete" style={{cursor:"pointer",color:"grey"}} className='p-0 my-0 mr-2' onClick={async()=>await getDownloadUrl(file)} color="secondary">
  <CloudDownloadIcon />
</IconButton>
          <DeleteFile file={file} deleteFile={()=>deleteFile(file)}/>

           </td>
           
           </tr>
    )

    )
           
    )          
}
           
           </tbody>
           </table>
           </div>
            
           </>
    )
    }

    const mapStateToProps=(state)=>{
        return{}
      }
      
      export default connect (mapStateToProps,{getOneVideoById,patchVideo})(ListFiles)

    



























//  <Button variant="contained" className='my-2' color="secondary">Ajouter un fichier</Button>

