import React, { useRef, useState, useEffect } from 'react';
import { useUserMedia } from './useUserMedia';
import * as faceapi from 'face-api.js'

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "user" },
    height: '90vh',
    width: '100vw',
};

function App() {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [faces, setFaces] = useState('Surprised') // Happy, Neutral

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then( () => {
        if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
          videoRef.current.srcObject = mediaStream;
        }
      })
    }
    videoRef.current && loadModels()
  }, [])

  function handleCanPlay() {
    videoRef.current.play();
  }

  videoRef.addEventListener('play', () => {
    setInterval(async() => {
      const detections = await faceapi.detectAllFaces(videoRef, 
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
      .withFaceExpressions()
      if(detections.expressions.surprised > .95){
        setFaces('Happy')
        if(detections.expressions.happy > .95){
          setFaces('Neutral')
          if(detections.expressions.neutral > .95){
            setFaces('Done')
          }
        }
      }
    }, 100);
  })

  return (
    <div style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
      <div style={{color: 'white', fontSize: 20, textAlign: 'center', padding: 15}}>Look {faces}</div>
      <video id='video' style={{position: 'fixed', height: '100%', width: '100%', objectFit: 'cover'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
    </div>
  );
}
export default App;