import { ChangeEventHandler, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import FormData from 'form-data';
import CanvasDraw from 'react-canvas-draw';
import resizeImage from './utils/resizeImage';  
import api from './api';

import { FiGrid, FiSend, FiTrash } from 'react-icons/fi';
import { IoArrowUndo, IoBrushOutline, IoBrushSharp} from 'react-icons/io5'

import './App.css'

function App() {
  const canvasRef = useRef({} as CanvasDraw);
  const [showGrid, setShowGrid] = useState(true);
  const [brushRadius, setBrushRadius] = useState(12);
  const [brushColor, setBrushColor] = useState('#000'); 

  async function submit() {
    //@ts-ignore
    const image64 = canvasRef.current.getDataURL("image/jpeg", null, "#FFF");

    const resultImage = await resizeImage(
      await fetch(image64).then(res => res.blob())
    );

    const form = new FormData();
    form.append('image', resultImage);

    let data: any; 

    try {
      const res = await api.post('/letter/predict', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      data = res.data;
      console.log(data)
    } catch(err) {
      console.log(err);
      return;
    }

    toast(
      () => (
        <p>
          Maybe you drew a Letter <strong>{`${data.prediction}`}</strong>
        </p>
      ),
      {
        duration: 4000,
      }
    );
  }

  function clear() {
    canvasRef.current.clear();
  }

  function undo() {
    canvasRef.current.undo();
  }

  function handleUpdateBrushSize(e: any) {
    const value = Number(e.target.value);

    if(value > 20)  
      setBrushRadius(20);
    else if(value < 1) 
      setBrushRadius(1);
    else
      setBrushRadius(value);
  }
  
  return (
    <>
      <header>
        Symbol Recognizer
      </header>
      <main className="App">
        <div id='canvas-container'>
          <CanvasDraw 
            ref={canvasRef}
            className='drawer' 
            canvasWidth={700} 
            canvasHeight={500}
            backgroundColor='#fff'
            brushColor={brushColor}
            brushRadius={brushRadius}
            hideGrid={true}
          />
          <span className='floating-controls'>
            <button className='floating-button' onClick={clear}>
              <FiTrash />
            </button>

            <button className='floating-button' onClick={undo}>
              <IoArrowUndo />
            </button>

            <button className='floating-button' disabled>
              <FiGrid />
            </button>
          </span>
        </div>
        <div className='floor-controls'>
          <div className='brush-controls'>
            <IoBrushSharp color='#000'/>
            <input 
              type='color'  
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
            />
            <input 
              type='number' 
              min={0} 
              max={20} 
              value={brushRadius} 
              onChange={handleUpdateBrushSize}
            />
          </div>
          <button className='floating-button send' onClick={submit}>
            <FiSend />
          </button>
        </div>

        <Toaster
          toastOptions={{
            style: {
              background: '#553772',
              color: '#FFF',
              fontFamily: 'Poppins',
              marginBottom: '20px',
              padding: '10px',
              lineHeight: '30px'
            },
          }}
          position="bottom-center"
          reverseOrder={false}
        />
      </main>
    </>
  )
}

export default App
