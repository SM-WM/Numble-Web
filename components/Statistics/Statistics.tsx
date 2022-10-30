import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./Statistics.module.css"
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { gameActions } from "../../store/game-slice";
import StatTile from "./StatTile";
import { userActions, GameHistory } from "../../store/user-slice";
import Chart from "./Chart"



export default function Statistics(){
    
    const [maxNumberOfGuesses, currentNumble, submittedGuesses, isCorrect, showStat, gameOver, time] = useAppSelector(
        ({game: {maxNumberOfGuesses, currNumble, submittedGuesses, isCorrect, showStat, gameOver, time }}) => {
            return [maxNumberOfGuesses, currNumble,submittedGuesses, isCorrect, showStat, gameOver, time];
        }
    );
    const [numOfGames, gameList, winRate, streak, maxStreak] = useAppSelector(
        ({user: {numOfGames, gameList, winRate, streak, maxStreak}}) => {
            return [numOfGames, gameList, winRate, streak, maxStreak];
        }
    );
    const dispatch = useAppDispatch();
    const currNumOfGuesses = submittedGuesses.length;
    const handleClose = () => {
        dispatch(gameActions.closeStat());
    }
    const thisScore = () => {
        let goodTime = 30 * 600//thirty minutes
        let exactScore = ((maxNumberOfGuesses*10/currNumOfGuesses) + (goodTime/time))*10;
        return isCorrect ? exactScore : exactScore/4;
    }

    useEffect(() => {
        if (gameOver){
            const thisGame: GameHistory = {
                numOfGuess: currNumOfGuesses,
                didWin: isCorrect,
                totalTime: time,
                score: thisScore()
            }
            dispatch(userActions.updateGame(gameOver))
            dispatch(userActions.addGame(thisGame))
            dispatch(userActions.setWinRate())
            dispatch(userActions.setStreak(isCorrect))
            if (isCorrect) {
                dispatch(userActions.setPerformanceArray(currNumOfGuesses))}
        }

    },[time])

    return(
        <div>
        <Modal show={showStat} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div className={styles.title}>Statistics</div>
        </Modal.Header>
        <Modal.Body  >
            <div className={styles.tileWrapper}>
                <StatTile label="Played" value={numOfGames} />
                <StatTile label={gameOver? "Current XP" : "Previous XP"}  value={(numOfGames > 0)? Math.trunc(gameList[numOfGames-1].score): 0} />
                <StatTile label="Time" 
                    value={(numOfGames > 0)? Math.trunc(gameList[numOfGames-1].totalTime): 0} />
                    
                <StatTile label="Win %" value={Math.trunc(winRate)} />
                <StatTile label="Streak" value={streak} />
                <StatTile label="Max Streak" value={maxStreak} />
            </div>

                {isCorrect && gameOver && (
                    <div className={styles.mainBody}>
                        <p>You Win!</p>
                        <p className={styles.solution}>{currentNumble}</p>
                        <p>You found the Numble in {currNumOfGuesses} guesses
                        </p>
                    </div>

                )}

                {!isCorrect && gameOver && (
                    <div className={styles.mainBody}>
                        <p>You Lose!</p>
                        <p className={styles.solution}>{currentNumble}</p>
                        <p>Better Luck next time</p>
                    </div>

                )} 

                <Chart />
        </Modal.Body>
      </Modal>
        </div>

    )
}