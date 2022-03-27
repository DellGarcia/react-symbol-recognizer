import { useRef, useState } from 'react'
import { Save } from '../../models/Save';
import { toast } from 'react-hot-toast';
import { IoArrowUndo, IoBrushSharp} from 'react-icons/io5'
import { FiGrid, FiSave, FiSend, FiTrash } from 'react-icons/fi';
import { FloatingIconButton } from '../FloatingIconButton';
import { SaveList } from '../SaveList';
import CanvasDraw from 'react-canvas-draw';
import resizeImage from '../..//utils/resizeImage';  
import api from '../../api';
import { uid } from 'uid';

import './styles.css';

export function Canvas() {
  const canvasRef = useRef({} as CanvasDraw);
  const [saves, setSaves] = useState(Array<Save>());
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

    let res: any; 

    try {
      res = await api.post('/letter/predict', form, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
    } catch(err) {}

    toast(
      () => <p>Maybe you drew a Letter <strong>{`${res.data.prediction}`}</strong></p>,
      {duration: 4000}
    );
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
  
  function createSave() {
    const canvasSaveData = canvasRef.current.getSaveData();
    setSaves([
        ...saves, 
        {
          uid: uid(16), 
          saveString: canvasSaveData
        }
      ]);
  } 

  return (
    <main className="main">
        <div id='canvas-container'>
          <SaveList saveList={saves}/>
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
            <FloatingIconButton icon={FiTrash} onClick={() => canvasRef.current.clear()} />

            <FloatingIconButton icon={IoArrowUndo} onClick={() => canvasRef.current.undo()} />
            
            <FloatingIconButton icon={FiGrid} disabled />

            <FloatingIconButton icon={FiSave} onClick={createSave} />
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
          <FloatingIconButton icon={FiSend} className='floating-button send' onClick={submit} />
        </div>
      </main>
  )
}