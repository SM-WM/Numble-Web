import styles from "./Row.module.css"
import Number from "./Number"
import ScoreTiles from "../Score/ScoreTiles"

type RowProps = {
    guess: Array<string>;
    currentNumble: string;
    tryIndex: number;
};
export default function Row({guess, currentNumble, tryIndex} : RowProps) {
    
    return(
        <div className={styles.completerow}>    
            <div className={styles.tryIdx}>{tryIndex}</div>
            <div className={styles.row}>
                {Array.from({length: 4}).map((_, i) => {
                return <Number content = {guess[i]} key={i} />
                } ) }  
            </div> 

            <ScoreTiles currentGuess={guess} currentNumble={currentNumble} />

        </div>

    )
}

