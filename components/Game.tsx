import { useState, Dispatch, SetStateAction } from 'react'
import GameBoard from '../components/Board/GameBoard'
import Link from "next/link"
import { Button } from '@mui/material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import styles from './Game.module.css'

export default function Game () {
    const[currNumble, setCurrNumble] = useState(generateNumble());
    const[submittedGuesses, setSubmittedGuesses] = useState<string[][]>([])
    const[guess, setGuess] = useState<string[]>([])

    function generateNumble(){
        const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const shuffledDigits = digits.sort(() => 0.5 - Math.random());
        // Get sub-array of first n elements after shuffled
        return shuffledDigits.slice(0, 4).join('');
    }

    const startNewGame = () => {
        setCurrNumble(generateNumble())
        setSubmittedGuesses([]);
        setGuess([])
        console.log("startnewgame")
    }
    console.log(currNumble)

    return(
        <div className={styles.game}>
            <GameBoard  correctNumble={currNumble} 
                        submittedGuesses={submittedGuesses}
                        setSubmittedGuesses={setSubmittedGuesses}
                        guess={guess}
                        setGuess={setGuess}
                         />
            <Button onClick={startNewGame}><RefreshOutlinedIcon sx={{color: 'black'}} /></Button>
        </div>      


    )
}


