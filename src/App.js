import React, { useRef, useState, useEffect } from 'react';
import { useUserMedia } from './useUserMedia';
import * as faceapi from 'face-api.js'
import './App.css';
import faceid from './images/faceid.png'

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "user" },
};

function App() {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [faces, setFaces] = useState('Place Face in Frame') // Happy, Neutral
  const [text, setText] = useState([])

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  const handleVideo = async () => {
    const detections = await faceapi
    .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions()
    setText(detections)
  }

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(handleVideo())
    }
    videoRef.current && loadModels()
  }, [])

  function handleCanPlay() {
    videoRef.current.play();
  }

  /*
        setTimeout(() => {
          setFaces('Look Surprised')
        }, 2000)
  */

  return (
    <div style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
      <div style={{color: 'white', fontSize: 20, textAlign: 'center', padding: 15}}>{faces}</div>
      <div style={{color: 'white', fontSize: 18}}>{'Detections:' + text}</div>
      <video id='video' style={{position: 'fixed', height: '100%', width: '100%', objectFit: 'cover'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      <div id='container'>
        <img id='scan' style={{height: '80vw', width: '80vw', opacity: .15}} src={faceid} alt="Logo" />
      </div>
    </div>
  );
}
export default App;