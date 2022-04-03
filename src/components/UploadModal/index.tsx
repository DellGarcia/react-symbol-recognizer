import React, { useContext, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Button, Modal } from 'react-bootstrap';
import { SaveContext } from '../../contexts/saveContext';
import { Save } from '../../models/Save';

import './styles.css';

type UploadModalProps = {
  show: boolean;
  setShow: Function,
  canvasRef: React.MutableRefObject<CanvasDraw>;
}

export const UploadModal:React.FC<UploadModalProps> = ({
  show,
  setShow,
  canvasRef
}) => {
  const { saves } = useContext(SaveContext);
  const handleClose = () => setShow(false);
  const handleUpload = (save: Save) => {
    canvasRef.current.loadSaveData(save.saveString);
    handleClose();
  };

  useEffect(() => {
    {console.log(saves)}
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className='save-modal-header'>
        <Modal.Title>Choose a save to Load</Modal.Title>
      </Modal.Header>
      <Modal.Body className='save-modal-body'>
        {
          saves.length > 0 ?
            <select className='save-list'>
              {saves.map(save => {
                <option className='save-item' value={save.name}/>
              })}
            </select>
          :
            <p>Create a save an see it here</p>
        }
      </Modal.Body>
      <Modal.Footer className='save-modal-footer'>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={() => handleUpload(save)}>
          Load
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}