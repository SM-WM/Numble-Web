import Row from "./Row";
import { useEffect, useState } from "react";
import styles from './GameBoard.module.css'



export default function() {
    const[submittedGuesses, setSubmittedGuesses] = useState<Array<Array<string>>>([]);
    const[guess, setGuess] = useState<Array<string>>([])

    const totalGuessMax = 10;
    
    useEffect(() => {
        function handleKeyDown({key}: {key: string}) {
            const isNum = /^[0-9]$/.test(key);
            const isBackspace = key === 'Backspace';
            const isSubmit = key === 'Enter';

            if (isBackspace) {
                setGuess((prev) => {
                    const temp = [...prev];
                    temp.pop();
                    return temp;
                })
            }
            else if (isNum && guess.length < 4) {
                setGuess((prev) => [...prev, key])

                //console.log({key, isNum})
            }
            else if(isSubmit && guess.length === 4 && submittedGuesses.length < 10){
                setSubmittedGuesses((prev) => [...prev, guess])
                setGuess([])
                console.log("submitted guess")
            }

            //console.log(submittedGuesses)1
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [guess.length, guess])

    //console.log(submittedGuesses)

    return(
        
        <div className={styles.board}>
            {Array.from({length: submittedGuesses.length}).map((_, i) => {
                return <Row guess={submittedGuesses[i]} />
            })}

            {submittedGuesses.length<10?  <Row guess={guess} /> : console.log("done")  }
                {/* return <Row guess={guess} />   */}
           


            {Array.from({length: totalGuessMax - submittedGuesses.length - 1}).map((_, i) => {
                return <Row guess = {[]} />
            })}
            
        </div> 

    )
}