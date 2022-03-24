import { useRef, useState } from 'react'
import axios from 'axios';
import FormData from 'form-data';
import CanvasDraw from 'react-canvas-draw';
import resizeImage from './utils/resizeImage';

import './App.css'

function App() {
  const canvasRef = useRef({} as CanvasDraw);
  const width = 700;
  const height = 700;

  function clearCanvas() {
    canvasRef.current.clear();
  }

  async function submit() {
    //@ts-ignore
    const image64 = canvasRef.current.getDataURL();

    const blob = await fetch(image64).then(res => res.blob())

    const resizedImage = await resizeImage(blob);

    const form = new FormData();
    form.append('image', resizedImage);

    try {
      const res = await axios.post('https://char-recognizer-nodejs-api.herokuapp.com/api/letter/predict', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res);
    } catch(err) {
      console.log(err);
    }

    // var uri = URL.createObjectURL(resizedImage);
    
    const fr = new FileReader();
    //@ts-ignore
    fr.readAsDataURL(blob);

    fr.onload = (e) => {
      console.log(e.target?.result)
    }
  }

  return (
    <div className="App">
      <CanvasDraw 
        className='drawer' 
        canvasWidth={width} 
        canvasHeight={height}
        hideGrid={true}
        ref={canvasRef}
        backgroundColor='#fff'
        brushColor='#000'
        brushRadius={18}
      />
      <div className='controls'>
        <button onClick={clearCanvas}>clear</button>
        <button onClick={submit}>submit</button>
      </div>
    </div>
  )
}

export default App
