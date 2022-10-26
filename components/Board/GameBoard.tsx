import Row from "./Row";
import { useCallback, useEffect, useState, Dispatch, SetStateAction} from "react";
import styles from './GameBoard.module.css'
import Keyboard from "./Keyboard/Keyboard"
import Link from "next/link"
import Statistics from '../Statistics'
import { CurrencyBitcoin } from "@mui/icons-material";

type GameBoardProps = {
    correctNumble: string;
    submittedGuesses: string[][];
    setSubmittedGuesses: React.Dispatch<React.SetStateAction<string[][]>>;
    guess: string[];
    setGuess: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function GameBoard({ correctNumble,
                                    submittedGuesses,
                                    setSubmittedGuesses,
                                    guess,
                                    setGuess}: GameBoardProps) {

    const[gameOver, setGameOver] = useState(false)

    const totalGuessMax = 10;
    const currNumOfGuesses = submittedGuesses.length;

    const handleKeyInput = useCallback((key: string) => {
        const isNum = /^[0-9]$/.test(key);
        const isBackspace = key === 'Backspace';
        const isSubmit = key === 'Enter';

        //key is backspace
        if (isBackspace) {
            setGuess((prev: string[]) => {
                const temp = [...prev];
                temp.pop();
                return temp;
            })
        }
        //display key pressed
        else if (isNum && guess.length < 4) {
            setGuess((prev: any) => [...prev, key])
        }
        //display guess after submittes; reset guess so move on to next guess
        else if (isSubmit && guess.length === 4 && currNumOfGuesses < 10) {
           
            setSubmittedGuesses((prev: string[][]) => [...prev, guess])
            setGuess([])
            console.log("submitted")
        }
    }, [guess.length])

    const isCorrect = currNumOfGuesses > 0 && submittedGuesses[currNumOfGuesses - 1].join('') === correctNumble;

    useEffect(() => {
        console.log("called")
        function handleKeyDown({ key }: { key: string }) {
            window.onkeydown = (ev: KeyboardEvent):any => {
                if(ev.key === 'Enter'){
                    ev.preventDefault()
                }
            }
            handleKeyInput(key)
        }
        window.addEventListener('keydown', handleKeyDown);

        if(isCorrect) {
            setTimeout(() => setGameOver(true), 2000)
            window.removeEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [guess.length, guess, handleKeyInput])

    useEffect(() => {
        if(currNumOfGuesses == 10) {
            setTimeout(() => setGameOver(true), 2000)
        }
    }, [currNumOfGuesses])

    return (
        <div className={styles.mainBoard}>
            <div className={styles.boardContainer}>
                <div className={styles.board}>
                    <div>
                        {Array.from({ length: currNumOfGuesses }).map((_, i) => {
                            return <Row guess={submittedGuesses[i]} key={i} currentNumble={correctNumble} tryIndex={i + 1} />
                        })}
                    </div>

                    <div className={styles.currentGuess}>
                        {(!isCorrect && currNumOfGuesses < 10) && <Row guess={guess} currentNumble="" tryIndex={currNumOfGuesses + 1} />}
                    </div>

                    <div>
                        {Array.from({ length: totalGuessMax - currNumOfGuesses - (isCorrect ? 0 : 1) }).map((_, i) => {
                            return <Row guess={[]} currentNumble="" key={i} tryIndex={currNumOfGuesses + (isCorrect ? 0 : 1) + i + 1} />
                        })}
                    </div>
                </div>
            </div>

            <Keyboard keyPressHandler={handleKeyInput} />

            <Statistics isCorrect={isCorrect} 
                        currNumOfGuesses={currNumOfGuesses} 
                        correctNumble={correctNumble} 
                        show ={gameOver}
                        setShow={setGameOver}/>
        </div>


    )
}

