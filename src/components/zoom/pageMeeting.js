import React from 'react';
import Meeting from "./meeting"
import { Button } from '@mui/material';


import { connect, } from "react-redux"




const PageMeeting=({profile})=>{

    let payload={
        meetingNumber: "76722435701",
        role:1,
        sdkKey: "L1a0FdrfV42TLiNAZsOYY1jXWHFD69E42I9M",
        sdkSecret: "qmvLyq1tZdBUfkIbPtbg3nT5JO9kQgnCEyJb",
        userEmail: profile.local.email,
        userName: `Pr. `+profile.name, 
        passWord: "123456",
        leaveUrl:"https://admin.e-learning-academy.tn"
      }


return(<>
{/* <a href="http://localhost:3002/"><Button variant="elevated" >Retour</Button></a> */}
<Meeting payload={payload}/></>)
}


const mapStateToProps = (state) => {
    return {
     
      profile: state.authReducer.profile,
  
    }
  }
  
  export default connect(mapStateToProps, {})(PageMeeting);