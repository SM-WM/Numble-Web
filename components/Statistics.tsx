import styles from "./Statistics.module.css"
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

type StatisticsProps = {
    isCorrect: boolean;
    currNumOfGuesses: number;
    correctNumble: String;
    show:boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Statistics({isCorrect, currNumOfGuesses, correctNumble,
     show, setShow
    }: StatisticsProps){

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>{isCorrect? "You Win": "You Lose"}</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
                {isCorrect && (
                    <div>
                        <p>The correct Numble is: </p>
                        <p className={styles.solution}>{correctNumble}</p>
                        <p>You found the Numble in {currNumOfGuesses} guesses</p>
                    </div>

                )}

                {!isCorrect && (
                    <div>
                        <p>The correct Numble is: </p>
                        <p className={styles.solution}>{correctNumble}</p>
                        <p>Better Luck next time</p>
                    </div>

                )} 


        </Modal.Body>
      </Modal>
        </div>

    )
}