import styles from "./Row.module.css"
import Number from "./Number"
import ScoreTiles from "../Score/ScoreTiles"

type RowProps = {
    guess: Array<string>;
    currentNumble: string
};
export default function Row({guess, currentNumble} : RowProps) {
    
    return(
        <div className={styles.completerow}>    
            <div className={styles.row}>
                {Array.from({length: 4}).map((_, i) => {
                return <Number content = {guess[i]} />
                } ) }  
            </div> 

            <ScoreTiles currentGuess={guess} currentNumble={currentNumble} />

        </div>

    )
}

