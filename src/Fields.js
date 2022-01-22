import React, { useRef, useState, useEffect } from 'react';

function Fields() {
  const [text1, setText1]= useState('')
  const [text2, setText2]= useState('')
  const [text3, setText3]= useState('')

  return (
    <div style={{height: '100%', width: '100%', backgroundColor: '#000000'}}>
      <div style={{color: '#C4C4C4', fontSize: 20, textAlign: 'center', padding: 15}}>Last Step</div>
      <div style={{fontSize: '3vw', color: '#C4C4C4', textAlign: 'center', marginTop: 30}}>Print all letters (a, Z) and symbols (/, -) as seen on the ID card </div>
      <button id="button" style={{textAlign: 'center', color: 'black', fontSize: '2vh', height: '6.5vh', width: '95vw', backgroundColor: '#424242', borderRadius: '1vh', position: 'absolute', marginLeft: '2.5vw', marginRight: '2.5vw', bottom: 10,  borderColor: '#1E1E1E'}}>Confirm</button>
      <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <input placeholder='Full Name' autoComplete="off" value={text1} onChange={(e) => setText1(e.target.value)} style={{borderWidth: '.2vh', height: '6vh', color: '#C4C4C4', background: '#000000', borderRadius: '1.25vh', borderColor: '#C4C4C4', width: '92vw', fontSize: '1.5vh', marginTop: '3vh', paddingLeft: 10}} type="text" name="name" />
        <input placeholder='DOB' autoComplete="off" value={text2} onChange={(e) => setText2(e.target.value)} style={{borderWidth: '.2vh', height: '6vh', color: '#C4C4C4', background: '#000000', borderRadius: '1.25vh', borderColor: '#C4C4C4', width: '92vw', fontSize: '1.5vh', marginTop: '3vh', paddingLeft: 10}} type="text" name="name1" />
        <input placeholder='License No.' autoComplete="off" value={text3} onChange={(e) => setText3(e.target.value)} style={{borderWidth: '.2vh', height: '6vh', color: '#C4C4C4', background: '#000000', borderRadius: '1.25vh', borderColor: '#C4C4C4', width: '92vw', fontSize: '1.5vh', marginTop: '3vh', paddingLeft: 10}} type="text" name="name2" />
      </div>
    </div>
  );
}
export default Fields;