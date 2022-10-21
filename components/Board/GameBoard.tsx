import Row from "./Row";
import { useEffect, useState } from "react";
import styles from './GameBoard.module.css'

type GameBoardProps = {
    correctNumble: string;
}

export default function GameBoard({correctNumble}: GameBoardProps) {
    const[submittedGuesses, setSubmittedGuesses] = useState<Array<Array<string>>>([])
    const[guess, setGuess] = useState<Array<string>>([])

    const totalGuessMax = 10;
    const currNumOfGuesses = submittedGuesses.length;
    
    useEffect(() => {
        function handleKeyDown({key}: {key: string}) {
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
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [guess.length, guess])

    const isCorrect = currNumOfGuesses > 0 && submittedGuesses[currNumOfGuesses - 1].join('') === correctNumble;

    return(
        
        <div className={styles.board}>
            <div>
                {Array.from({length: currNumOfGuesses}).map((_, i) => {
                return <Row guess={submittedGuesses[i]} currentNumble={correctNumble} />
                })}
            </div>

            <div className={styles.currentGuess}>
                {(!isCorrect && currNumOfGuesses < 10) &&  <Row guess={guess} currentNumble="" /> }
                {/* return <Row guess={guess} />   */}
            </div>
           
            <div>
                {Array.from({length: totalGuessMax - currNumOfGuesses - (isCorrect ? 0 : 1)}).map((_, i) => {
                return <Row guess = {[]} currentNumble="" />
                })}
            </div>
            <div>{correctNumble}</div>
            <div>{isCorrect ? "1" : "0"}</div>
            
        </div> 

    )
}

function generateNumble(){
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const shuffledDigits = digits.sort(() => 0.5 - Math.random());
    
    // Get sub-array of first n elements after shuffled
   return shuffledDigits.slice(0, 4);
    
}