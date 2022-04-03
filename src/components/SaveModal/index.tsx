import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CanvasDraw from 'react-canvas-draw';
import { SaveContext } from '../../contexts/saveContext';

import './styles.css';

type SaveModalProps = {
  show: boolean;
  setShow: Function;
  canvasRef: React.MutableRefObject<CanvasDraw>;
}

export const SaveModal:React.FC<SaveModalProps> = ({
  show,
  setShow,
  canvasRef
}) => {
  const { saves, createSave } = useContext(SaveContext);
  const [saveName, setSaveName] = useState('');
  const [invalidName, setInvalidName] = useState(false);

  const saveExists = () => saves.find(save => save.name === saveName);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    if(saveExists()) {
      alert('A save with this name already exists, try other name!');
      return;
    }
      
    createSave(saveName, canvasRef.current.getSaveData());
    handleClose();
  };

  useEffect(() => {
    {console.log(saves)}
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className='save-modal-header'>
        <Modal.Title>New Save</Modal.Title>
      </Modal.Header>
      <Modal.Body className='save-modal-body'>
        <label htmlFor='save-name'>Enter a name for the save:</label>
        <input 
          id={`save-name`}
          className={`${invalidName ? 'invalid': ''}`}
          type="text" 
          value={saveName}
          onChange={e => {
            setSaveName(e.target.value);
            setInvalidName((saveExists() !== undefined));
          }}
        />
      </Modal.Body>
      <Modal.Footer className='save-modal-footer'>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}