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
          <Modal.Title>Guess the Numble in 10 tries</Modal.Title>
        </Modal.Header>
        <Modal.Body className='test'>
          <p>Every numble is composed of 4 unique digits. Each guess will be a 4 digit number... Your solution's digits don't have to be unique. Hit the enter button to submit.</p>

          <p>After each guess, the score column will let you know:</p>

          <p>1. How many digits you got correct i.e. digit is in the numble and is placed in the right spot;</p>

          <p>2. How many digits you misplaced i.e. digit is in the numble but is placed in the wrong spot;</p>
          <p>3. How many digits you got wrong i.e. digit is not in the numble.</p>

          <p><b>The catch:</b></p>

          <p>You won't know which digits in your guess are correct, misplaced or wrong. As you'll see, getting all four digits wrong is one of the best things that can happen at the start.</p>

          <p>Happy Guessing!</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}