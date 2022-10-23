import Row from "./Row";
import { useCallback, useEffect, useState } from "react";
import styles from './GameBoard.module.css'
import Keyboard from "./Keyboard/Keyboard"

type GameBoardProps = {
    correctNumble: string;
}

export default function GameBoard({correctNumble}: GameBoardProps) {
    const[submittedGuesses, setSubmittedGuesses] = useState<Array<Array<string>>>([])
    const[guess, setGuess] = useState<Array<string>>([])

    const totalGuessMax = 10;
    const currNumOfGuesses = submittedGuesses.length;
    
    const handleKeyInput = useCallback((key: string) => {
        const isNum = /^[0-9]$/.test(key);
        const isBackspace = key === 'Backspace';
        const isSubmit = key === 'Enter';
        
        //key is backspace
        if (isBackspace) {
            setGuess((prev) => {
                const temp = [...prev];
                temp.pop();
                return temp;
            })
        }
        //display key pressed
        else if (isNum && guess.length < 4) {
            setGuess((prev) => [...prev, key])
        }
        //display guess after submittes; reset guess so move on to next guess
        else if(isSubmit && guess.length === 4 && currNumOfGuesses < 10){
            setSubmittedGuesses((prev) => [...prev, guess])
            setGuess([])
            console.log("submitted guess")
        }
    },[guess])

    useEffect(() => {
        function handleKeyDown({key}: {key: string}) {
            handleKeyInput(key)
            console.log(key)
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [guess.length, guess, handleKeyInput])

    const isCorrect = currNumOfGuesses > 0 && submittedGuesses[currNumOfGuesses - 1].join('') === correctNumble;
    console.log(correctNumble);
    console.log(isCorrect);

    return(
        <div>
            <div className={styles.board}>
                <div>
                    {Array.from({length: currNumOfGuesses}).map((_, i) => {
                    return <Row guess={submittedGuesses[i]} currentNumble={correctNumble} tryIndex={i+1} />
                    })}
                </div>

                <div className={styles.currentGuess}>
                    {(!isCorrect && currNumOfGuesses < 10) &&  <Row guess={guess} currentNumble="" tryIndex={currNumOfGuesses + 1}/> }
                </div>
            
                <div>
                    {Array.from({length: totalGuessMax - currNumOfGuesses - (isCorrect ? 0 : 1)}).map((_, i) => {
                    return <Row guess = {[]} currentNumble=""  tryIndex={currNumOfGuesses + (isCorrect ? 0 : 1) + i + 1} />
                    })}
                </div>
                {/* <div className={styles.Test}>{correctNumble}</div>
                <div className={styles.Test}>{isCorrect ? "1" : "0"}</div> */}
            </div> 

            <Keyboard keyPressHandler={handleKeyInput}/>
        </div>


    )
}

  