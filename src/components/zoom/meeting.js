import React, { Fragment, useEffect } from 'react';




const Meeting = ({ payload }) => {

    useEffect(async () => {
        const { ZoomMtg } = await import('@zoomus/websdk');
        // important !!!   we have to diplay div hiden by default
        document.getElementById('zmmtg-root').style.display = 'block'
        //--------------
        ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();
        ZoomMtg.generateSDKSignature({
            meetingNumber: payload.meetingNumber,
            role: payload.role,
            sdkKey: payload.sdkKey,
            sdkSecret: payload.sdkSecret,
            success: function (signature) {
                ZoomMtg.init({
                    
                    leaveUrl: payload.leaveUrl,
                    success: function (data) {
                        ZoomMtg.join({
                            meetingNumber: payload.meetingNumber,
                            signature: signature.result,
                            sdkKey: payload.sdkKey,
                            userEmail: payload.userEmail,
                            userName: payload.userName,
                            passWord: payload.passWord,
                            tk:'',
                            success: function () {
                                console.log("----Joined----")
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            error: function (error) {
                console.log(error)
            }
        })

    }, [])


    return  (<></>)
}

export default Meeting