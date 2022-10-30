import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from './StopWatch.module.css';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions } from "../../store/game-slice";
import { userActions, GameHistory } from "../../store/user-slice";

export default function StopWatch(){
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    const [currentNumble, submittedGuesses, gameOver, isCorrect] = useAppSelector(
        ({game: {currNumble, submittedGuesses, gameOver, isCorrect}}) => {
            return [currNumble, submittedGuesses, gameOver, isCorrect];
        }
    );
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        let interval:any = null;
    
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((time) => time + 100);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    useEffect(() => {
        if (submittedGuesses.length === 1){
            setIsActive(true);
            setIsPaused(false);
        }

    },[submittedGuesses])

    useEffect(() => {
        if (gameOver){
            setIsPaused(!isPaused);
            dispatch(gameActions.setTime(time));
        }

    },[gameOver])

    useEffect(() => {
        setIsActive(false);
        setTime(0);
    },[currentNumble])

    return(
        <div className={styles.timer}>
            <span> {("0" + Math.floor((time / 60000) % 60)).slice(-2)} : </span>
            <span> { (" 0" + Math.floor((time / 1000) % 60)).slice(-2)} : </span>
            <span> { (" 0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
    )
  
}
