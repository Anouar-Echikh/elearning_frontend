import React, { useState, useEffect } from "react"
import PDFMerger from 'pdf-merger-js/browser'
import { jsPDF } from "jspdf";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { connect } from "react-redux"
import moment from "moment"
//import { getAllDiplomasByEmail } from '../../redux/actions/diplomaActions'


//import { apiGetListFilesByAccountName } from '../../api/apiMicrosoft'
//import PDFViewer from 'pdf-viewer-reactjs'


const PDFViwer = ({member}) => {

  const [mergedPdfUrl, setMergedPdfUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState()

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  


  //---------start diplomas pdf ------------
  const getDataBlobs = async () => {
    var doc = new jsPDF();
    doc.setProperties({
      title: 'Platforme Enseignant'
    })
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    var width = doc.internal.pageSize.getWidth()
    //var height = doc.internal.pageSize.getHeight()
    doc.addImage(require('../../imgs/logo.jpg'), "JPG", (width / 2)-15, 10, 30, 40)
    doc.text("Fiche d'adhésion", width / 2, 70, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Nom et prénom:", 20, 90);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.name, 60, 90);
    ///---------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Date de naissance:", 20, 100);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(moment(member.dateBirth).format("DD-MM-YYYY"), 60, 100);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Niveau d'étude:", 20,110);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.educationLevel, 60,110);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Profession:", 20, 120);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.profession, 60, 120);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("CIN:", 20, 130);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.cin, 60, 130);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Email:", 20, 140);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.email, 60, 140);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("N° Tél:", 20, 150);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.tel, 60, 150);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Gouvernorat:", 20, 160);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.city, 60, 160);
    //------------------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Adresse:", 20, 170);
    doc.setFont("helvetica","normal" );
    doc.setFontSize(12);
    doc.text(member.adress, 60, 170);
    //------------------------------------


    doc.addImage(member.qrcodeImg, "JPG", (width / 2)-20, 200, 40, 40)








    let urlPdf = doc.output('blob')
    console.log("urlPdf", urlPdf)
    const mergedPDF = new PDFMerger();

    await mergedPDF.add(urlPdf)
    //const files = await apiGetListFilesByAccountName(props.profile.microsoft.email, `Platforme_Enseignant/Titres et Diplômes/Diplômes`)
   // console.log("allDiplomas images:", files.data.value)
   const files={cinFrontPhoto:"",cinBackPhoto:"",justifPhoto:"",personalPhoto:""}
    

   

    
    
        // const res = await axios.get("", {
        //   responseType: 'blob'
        // });
        // console.log("res", res.data)
        // const blobURL = URL.createObjectURL(res.data);
        // var pdf = new jsPDF();
        // //pdf.addPage("a4","p")
        // if ((res.data.type).search("pdf") > -1) 
        // { await mergedPDF.add(res.data)
        //   URL.revokeObjectURL(blobURL)
        // }
        // else {
        //   if (image.height < image.width)
        //     pdf.addImage(blobURL, "JPEG", 10, -180, 275, 190, null, "MEDIUM", 270)
        //   else pdf.addImage(blobURL, "JPEG", 5, 5, 205, 295)
        //   let x = pdf.output('blob')
        //   //doc.save("test")
        //   await mergedPDF.add(x)
        //   URL.revokeObjectURL(blobURL)
        // }
      
    
    const PDF = await mergedPDF.saveAsBlob();
    return PDF
  }

  //-------------- End Diplomas pdf----------------------
  const getMergedPdf = async () => {
    setLoading(true)
    //test merge imgs to pdf
    const mergedPDF = new PDFMerger();

    /* -----------------Diplomas--------------- */
    let Pdf = await getDataBlobs()
    await mergedPDF.add(Pdf)
    /* ---------------------------------------- */

    const PDF = await mergedPDF.saveAsBlob();
    const url = URL.createObjectURL(PDF);//create url for this blob
    
    setMergedPdfUrl(url);
    setLoading(false)
    console.log("merged pdf", url)
    // window.open(url,"pdf")

  }

  useEffect(() => {
   
    getMergedPdf()
  }, [])

  useEffect(() => {
   
    return () => {
      URL.revokeObjectURL(mergedPdfUrl);
    };
  });

  return (

    <div className="d-flex jusitfy-content-center flex-column align-items-center " style={{ height: "inherit", width: "inherit" }}>
      {/* <Button onClick={()=>{getMergedPdf()}}> Save File</Button> */}

      {loading ?
        <div style={{ position: "relative", top: 100 }} className="container d-flex justify-content-center"><div classname="d-flex flex-column align-items-center">  <h4 className="mb-2"> Chargement du document ... </h4><div className="container d-flex justify-content-center " style={{ marginTop: 50 }}><CircularProgress size={30} /></div></div></div>
        :
        <iframe
          height={1000}
          width='100%s'
          src={`${mergedPdfUrl}`}
          title='pdf'
          id="myIframe"
        ></iframe>
        //   <PDFViewer
        //   document={{
        //     url:{mergedPdfUrl},
        //   }}
        // />

      }
    </div>
  )
}

const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps, {})(PDFViwer);