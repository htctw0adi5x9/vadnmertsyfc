import React, { useRef, useState, useEffect } from 'react';
import { useUserMedia } from './useUserMedia';
import blink from './blink'
import './App.css';
import faceid from './images/faceid.png'

// const CAPTURE_OPTIONS = {
//     audio: false,
//     video: { facingMode: "user" },
// };

function BlinkDet() {
  const videoRef = useRef();
  //const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [faces, setFaces] = useState('Center Face in Box and Blink')
  const [counter, setCounter] = useState(0)

  // if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
  //   videoRef.current.srcObject = mediaStream;
  // }

  function handleCanPlay() {
    videoRef.current.play()
  }

  function handleCapture() {
    const width = window.innerWidth
    const height = window.innerHeight
    let video = videoRef.current
    const dataURI = video.toDataURL('image/jpeg')
    img2 = new Image()
    img2.src = dataURI
  }

  var raf
  const init = async () => {
    if(counter == 0){
      await blink.loadModel();
      await blink.setUpCamera(videoRef.current)
    }

    const predict = async () => {
      let result = await blink.getBlinkPrediction()

      if(result){
        if(result.longBlink){
          const incrementCounter = () => setCounter(counter + 1)
          incrementCounter()
          handleCapture()
          setFaces('Complete')
          //send to next page
        }
      }
      raf = requestAnimationFrame(predict);
    };
    predict();
  };

  init();

  return (
    <div style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
      <div style={{color: 'white', fontSize: 20, textAlign: 'center', padding: 15}}>{faces}</div>
      <video id='video' style={{position: 'fixed', height: '100%', width: '100%', objectFit: 'cover'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      <div id='container'>
        <img id='scan' style={{height: '80vw', width: '80vw', opacity: .15}} src={faceid} alt="Logo" />
      </div>
    </div>
  );
}
export default BlinkDet;