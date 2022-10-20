import React, { useState } from 'react';
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import styles from './HowToPlay.module.css';


export default function HowToPlay() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
        <button className={styles.button} onClick={handleShow}>
           <HelpOutlineRoundedIcon sx={{ color: "black" }} />
        </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to Play</Modal.Title>
        </Modal.Header>
        <Modal.Body className='test'>Woohoo, you're reading this text in a modal!</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}