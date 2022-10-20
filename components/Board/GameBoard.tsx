import Row from "./Row";
import { useEffect, useState } from "react";
import styles from './GameBoard.module.css'



export default function() {
    const[guess, setGuess] = useState<Array<string>>([])
    
    // useEffect(() => {
       
    //     window.addEventListener('keydown', ({key}) => {
    //         console.log(key);
    //         if (guess.length < 4) {
    //             const isNum = /^[0-9]$/.test(key);

    //             if (isNum) {
    //                 setGuess((prev) => [...prev, key])
    //             }
    //             console.log({key, isNum})
    //         }
    //         console.log(guess)
    //     }) 
    // }, [guess.length])

    useEffect(() => {
        function handleKeyDown({key}: {key: string}) {
                
            if (guess.length < 4) {
                const isNum = /^[0-9]$/.test(key);
    
                if (isNum) {
                    setGuess((prev) => [...prev, key])
                }

                console.log({key, isNum})
            }
            console.log(guess)
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [guess.length])

    //console.log(guess)

    return(
        <div className={styles.board}>
            <Row guess={guess} />
        </div> 

    )
}