import React, { useRef, useState, useEffect } from 'react';
import { useUserMedia } from './useUserMedia';
import styled, { css, keyframes } from 'styled-components';
import "./App.css";
import downsize from './downsize'

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" },
};

function App({ onCapture, onClear }) {
  const Canvas = styled.canvas`
  `;

  const canvasRef = useRef();
  const videoRef = useRef();
  const box = document.querySelector('.box')
  const w = window.innerWidth
  const h = window.innerHeight
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [hasImage, setHasImage] = useState(false)

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  function handleCapture() {
    const aR = w / h
    const width = w / 4
    const height = (h / aR) / 4
    let video = videoRef.current
    let canvas = canvasRef.current
    let ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    var cnvs = downsize.downScaleImage(video, 0.25)
    ctx.drawImage(video, 0, 0, width, height);
    const dataURI = video.toDataURL('image/jpeg')
    const img1 = new Image()
    img1.src = dataURI
  }

  useEffect(() => {
    var button = document.getElementById('button')
    button.addEventListener('click', function(event) {
      setHasImage(true)
    })
  })

  useEffect(() => {
    var button = document.getElementById('button')
    button.addEventListener('click', function(event) {
      handleCapture()
    })
  })

  /*function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onClear();
  }*/

  const handleNext = () => {
    //send to next screen
  }

  useEffect(() => {
    console.log('width:' + videoRef.width)
  })
 
  return (
    <div style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
      <div style={{color: 'white', fontSize: 20, textAlign: 'center', padding: 15}}>License Photo</div>
      <video style={{position: 'fixed', height: '100%', width: '100%', objectFit: 'cover'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      <div>
        <button id="button" style={{textAlign: 'center', color: 'white', fontSize: 20, height: '50px', width: '95vw', backgroundColor: '#000000', borderRadius: 5, position: 'absolute', marginLeft: '2.5vw', marginRight: '2.5vw', bottom: 10,  borderColor: 'black'}}>{hasImage ? 'Recapture' : 'Capture'}</button>
        <div style={{position: 'absolute', height: '40px', borderRadius: 5, right: '2.5vw', bottom: 63, display: 'flex', flexDirection: 'row'}}>
          <div onClick={handleNext} style={{textAlign: 'center', color: 'white', marginTop: '6px', fontSize: 14, marginLeft: 40}}>{hasImage ? 'Next' : null}</div>
        </div>
        <div style={{position: 'absolute', bottom: 70, left: '2.5vw'}}>
          <Canvas
            ref={canvasRef}
            width={w / 4}
            height={h / 4}
          />
        </div>
      </div>
      <div className='container'>
        <div className='box' style={{borderColor: 'white', height: '56.57vw', width: '90vw', borderRadius: 5}}></div>
      </div>
    </div>
  );
}
export default App;
