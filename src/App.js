import React, { useRef, useState, useEffect } from 'react';
import { useUserMedia } from './useUserMedia';
import blink from './blink'
import './App.css';
import faceid from './images/faceid.png'

// const CAPTURE_OPTIONS = {
//     audio: false,
//     video: { facingMode: "user" },
// };

function App() {
  const videoRef = useRef();
  //const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [faces, setFaces] = useState('Place Face in Box and Blink')
  const [counter, setCounter] = useState()

  // if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
  //   videoRef.current.srcObject = mediaStream;
  // }

  function handleCanPlay() {
    videoRef.current.play()
  }

  var raf
  const init = async () => {
    await blink.loadModel();
    await blink.setUpCamera(videoRef.current)

    const predict = async () => {
      let result = await blink.getBlinkPrediction()

      if(result){
        if(result.longBlink){
          setFaces('Complete')
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
export default App;