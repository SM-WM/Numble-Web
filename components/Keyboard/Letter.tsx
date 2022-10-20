import styles from "./Letter.module.css";


interface LetterProps{
    content: string;
    dataState: string;
    index: number;
}

const Letter: React.FC<LetterProps> = (props) => {
    return(
        <div className={`${styles.letter}`}>
            2
        </div>
    )
}

export default Letter;