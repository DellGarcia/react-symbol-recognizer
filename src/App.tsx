import { useRef, useState } from 'react'
import FormData from 'form-data';
import CanvasDraw from 'react-canvas-draw';
import resizeImage from './utils/resizeImage';  
import api from './api';

import './App.css'
import { FiCornerDownLeft, FiGrid, FiTrash } from 'react-icons/fi';
import { IoArrowUndo} from 'react-icons/io5'

function App() {
  const canvasRef = useRef({} as CanvasDraw);
  const [showGrid, setShowGrid] = useState(true);

  async function submit() {
    //@ts-ignore
    const image64 = canvasRef.current.getDataURL();

    // const blob = await fetch(image64).then(res => res.blob())

    // const resizedImage = await resizeImage(blob);

    const form = new FormData();
    form.append('image', image64);

    try {
      const res = await api.post('/letter/predict', form, {
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
    <>
      <main className="App">
        <div id='canvas-container'>
          <CanvasDraw 
            ref={canvasRef}
            className='drawer' 
            canvasWidth={700} 
            canvasHeight={500}
            backgroundColor='#fff'
            brushColor='#000'
            brushRadius={12}
            hideGrid={showGrid}
          />
          <span className='floating-controls'>
            <button className='floating-button' onClick={canvasRef.current.clear}>
              <FiTrash />
            </button>

            <button className='floating-button' onClick={canvasRef.current.undo}>
              <IoArrowUndo />
            </button>

            {/* <button className='floating-button' disabled>
              <FiGrid />
            </button> */}
          </span>
        </div>
        <div className='controls'>
          <button onClick={submit}>submit</button>
        </div>
      </main>
    </>
  )
}

export default App
