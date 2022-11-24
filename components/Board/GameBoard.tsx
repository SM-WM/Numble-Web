import Row from "./Row";
import { useCallback, useEffect} from "react";
import styles from './GameBoard.module.css'
import Keyboard from "./Keyboard/Keyboard"
import Statistics from '../Statistics/Statistics'
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { gameActions } from "../../store/game-slice";
import StopWatch from "./StopWatch";

type GameBoardProps = {
    setSubmittedGuesses: React.Dispatch<React.SetStateAction<string[][]>>;
    setGuess: React.Dispatch<React.SetStateAction<string[]>>;
   
}

interface IGameBoardProps {
    user : any
   
}

//export default function Number({content}: NumberProps)

export default function GameBoard({user}: IGameBoardProps){

    const [currentNumble, maxNumberOfGuesses, guess, submittedGuesses, gameOver, isCorrect] = useAppSelector(
        ({game: {currNumble, maxNumberOfGuesses, guess, submittedGuesses, gameOver, isCorrect}}) => {
            return [currNumble, maxNumberOfGuesses, guess, submittedGuesses, gameOver, isCorrect];
        }
    );


  
    const currNumOfGuesses = submittedGuesses.length;
    
    const dispatch = useAppDispatch();

    const handleKeyInput = useCallback((key: string) => {
        const isNum = /^[0-9]$/.test(key);
        const isBackspace = key === 'Backspace';
        const isSubmit = key === 'Enter';

        //key is backspace
        if (isBackspace) {
            dispatch(gameActions.backSpaceHandler());
        }
        //display key pressed
        else if (isNum) {
            dispatch(gameActions.addToGuess(key));
        }
        //display guess after submittes; reset guess so move on to next guess
        else if (isSubmit) {
           dispatch(gameActions.addToSubmittedGuesses(guess));
        }
    }, [dispatch, gameOver])

    useEffect(() => {
        if(gameOver){
            setTimeout(() => {
                dispatch(gameActions.showStat())
            }, 2000)

        }
    },[gameOver])

    useEffect(() => {
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
            window.removeEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [guess.length, guess, handleKeyInput, currentNumble])

   

    return (
        <div className={styles.mainBoard}>
            <StopWatch />

            <div className={styles.board}>
                <div>
                    {Array.from({ length: currNumOfGuesses }).map((_, i) => {
                        return <Row guess={submittedGuesses[i]} key={i} currentNumble={currentNumble} tryIndex={i + 1} />
                    })}
                </div>

                <div className={styles.currentGuess}>
                    {(!isCorrect && currNumOfGuesses < 10) && <Row guess={guess} currentNumble="" tryIndex={currNumOfGuesses + 1} />}
                </div>

                <div>
                    {Array.from({ length: maxNumberOfGuesses - currNumOfGuesses - (isCorrect ? 0 : 1) }).map((_, i) => {
                        return <Row guess={[]} currentNumble="" key={i} tryIndex={currNumOfGuesses + (isCorrect ? 0 : 1) + i + 1} />
                    })}
                </div>
            </div>

            <Keyboard keyPressHandler={handleKeyInput} />

            <Statistics user={user}/>

        </div>


    )
}



