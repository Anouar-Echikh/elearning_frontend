import React, { useEffect,useState } from 'react'
import {PhotoSwipe} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';



const ImageViewer=({items,title,name})=>{
const [open,setOpen]= useState()
const [options,setOptions]= useState()

    const openPhotoSwipe = (e) => {
        //e.preventDefault();
        setOpen(true)
        setOptions({closeOnScroll: false})
        
      };
      console.log("items:",items)
    
    return(<span>

            <span onClick={(e)=>openPhotoSwipe(e)} style={{cursor:"pointer",color:"#039EDD",marginLeft:5}}>
              voir
            </span>
            <PhotoSwipe 
            isOpen={open}
            items={items.map((item)=>item={w:1200,h:800,title:`${name} - ${title}`,thumbnail:item.idFile,src:item.idFile,imageSize:item.imageSize})} 
            options={options} 
                      
              onClose={()=>setOpen(false)}
              />


    </span>)
}
export default ImageViewer;