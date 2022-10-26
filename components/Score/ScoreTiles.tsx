import { style } from "@mui/system";
import { useEffect, useState } from "react";
import styles from "./ScoreTiles.module.css"

type ScoreTilesProps = {
    currentNumble: string;
    currentGuess: Array<string>;
}

export default function ScoreTiles ({currentNumble , currentGuess}: ScoreTilesProps) {
 let misplaced = 0
 let wrong = 0
 let correct = 0

 

  for(let i = 0; i<currentNumble.length; i++){
        if (currentNumble.charAt(i) === currentGuess[i]) {
            correct += 1
        }
        else if (currentNumble.includes(currentGuess[i])){
            misplaced += 1
        }
        else{
            wrong += 1
        }
    }

    let scoreArray = ["none", "none","none","none"]
    if(currentGuess.length > 0){
        for(let i = 0; i< correct; i++){ 
            scoreArray[i] = "correct"
        }
        for(let i = correct; i < currentNumble.length ;i++ ) {
            scoreArray[i] = "misplaced"
        }
        for(let i = correct + misplaced; i < currentNumble.length; i++) {
            scoreArray[i] = "wrong"
        }
    }

  
    return(
        <div className={styles.score}>
            <div className={styles.scoreRow}>
                <span className={`${styles.tile} 
                                  ${(scoreArray[0]==="correct") ? styles.correctChar : ''}
                                  ${(scoreArray[0]==="misplaced") ? styles.misplacedChar : ''}
                                  ${(scoreArray[0]==="wrong") ? styles.wrongChar : ''}`}> </span>
                <span className={`${styles.tile} 
                                  ${(scoreArray[1]==="correct") ? styles.correctChar : ''}
                                  ${(scoreArray[1]==="misplaced") ? styles.misplacedChar : ''}
                                  ${(scoreArray[1]==="wrong") ? styles.wrongChar : ''}`}> </span>
                <span className={`${styles.tile} 
                                  ${(scoreArray[2]==="correct") ? styles.correctChar : ''}
                                  ${(scoreArray[2]==="misplaced") ? styles.misplacedChar : ''}
                                  ${(scoreArray[2]==="wrong") ? styles.wrongChar : ''}`}> </span>
                <span className={`${styles.tile} 
                                  ${(scoreArray[3]==="correct") ? styles.correctChar : ''}
                                  ${(scoreArray[3]==="misplaced") ? styles.misplacedChar : ''}
                                  ${(scoreArray[3]==="wrong") ? styles.wrongChar : ''}`}> </span>
            </div>
        </div>
    )
}
