import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./Statistics.module.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions } from "../../store/game-slice";
import Link from "next/link";
import StatTile from "./StatTile";
import { userActions, GameHistory } from "../../store/user-slice";
import Chart from "./Chart";
import apiClient from "../../services/apiClient";

interface IStatisticsProps {
  user: any;
  stats: any;
  setStats: (params: any) => any;
}

export default function Statistics({
  user,
  stats,
  setStats,
}: IStatisticsProps) {
  const [form, setForm] = useState({
    played: 0,
    previous: 0,
    winpcnt: 0,
    streak: 0,
    maxStreak: 0,
    wins: 0,
  });


 
  const [maxNumberOfGuesses, currentNumble, submittedGuesses, isCorrect, showStat, gameOver, time,] = 
  useAppSelector(
    ({game: {maxNumberOfGuesses, currNumble, submittedGuesses, isCorrect, showStat, gameOver, time,},
    }) => { return [ maxNumberOfGuesses, currNumble, submittedGuesses, isCorrect, showStat, gameOver, time, ];}
  );

  const [numOfGames, gameList, winRate, streak, maxStreak] = useAppSelector(
    ({ user: { numOfGames, gameList, winRate, streak, maxStreak } }) => {
      return [numOfGames, gameList, winRate, streak, maxStreak];
    }
  );
  const dispatch = useAppDispatch();
  const currNumOfGuesses = submittedGuesses.length;
  const handleClose = () => {
    dispatch(gameActions.closeStat());
  };
  const thisScore = () => {
    let goodTime = 30 * 600; //thirty minutes
    let exactScore =
      ((maxNumberOfGuesses * 10) / currNumOfGuesses + goodTime / time) * 10;
    
    return isCorrect ? exactScore : exactScore / 4;
  };

  useEffect(() => {
    if (gameOver) {
      const thisGame: GameHistory = {
        numOfGuess: currNumOfGuesses,
        didWin: isCorrect,
        totalTime: time,
        score: thisScore(),
      };
      dispatch(userActions.updateGame(gameOver));
      dispatch(userActions.addGame(thisGame));
      dispatch(userActions.setWinRate());
      dispatch(userActions.setStreak(isCorrect));
      if (isCorrect) {
        dispatch(userActions.setPerformanceArray(currNumOfGuesses));
      }

      setForm((f: any) => ({ ...f, played: stats.played + 1 }));
      setForm((f: any) => ({...f, previous: Math.trunc(thisGame.score + stats.previous),}));
      setForm((f: any) => ({...f, streak: thisGame.didWin ? stats.streak + 1 : 0,}));
      setForm((f: any) => ({...f,
        maxstreak: Math.max(
          stats.maxstreak,
          thisGame.didWin ? stats.streak + 1 : 0
        ),
      }));
      setForm((f: any) => ({...f,
        wins: thisGame.didWin ? stats.wins + 1 : stats.wins,
      }));

      const winner = thisGame.didWin ? stats.wins + 1 : stats.wins;
      setForm((f: any) => ({...f,
        winpcnt: (winner / (stats.played + 1)) * 100,
      }));

      const updateStatistics = async () => {
        const { data, error } = await apiClient.updateStatistics({
            played: stats.played + 1,
            previous: Math.trunc(thisGame.score + stats.previous),
            streak: thisGame.didWin ? stats.streak + 1 : 0,
            maxstreak: Math.max(stats.maxstreak, thisGame.didWin ? stats.streak + 1 : 0),
            wins: thisGame.didWin ? stats.wins + 1 : stats.wins,
            winpcnt: ((thisGame.didWin ? stats.wins + 1 : stats.wins) / (stats.played + 1)) * 100,
        }, stats.user_id);    
       
        setStats(data.statistics)
      };

    stats.id ? updateStatistics() : setStats({
        played: stats.played + 1,
        previous: Math.trunc(thisGame.score + stats.previous),
        streak: thisGame.didWin ? stats.streak + 1 : 0,
        maxstreak: Math.max(stats.maxstreak, thisGame.didWin ? stats.streak + 1 : 0),
        wins: thisGame.didWin ? stats.wins + 1 : stats.wins,
        winpcnt: ((thisGame.didWin ? stats.wins + 1 : stats.wins) / (stats.played + 1)) * 100,
    })
      
    }
  }, [time]);

  return (
    <div>
      <Modal show={showStat} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div className={styles.title}>Statistics</div>
        </Modal.Header>
        {user ? null : (
          <div className={styles.login}>
            <Link href="/Login">Login</Link> {"to keep track of personal stats"}
          </div>
        )}
        <Modal.Body>
          <div className={styles.tileWrapper}>
            <StatTile label="Played" value={stats.played} />
            <StatTile label={"Total XP"} value={ stats.previous } />
            {gameOver && <StatTile label="Current XP" value={ Math.trunc(thisScore()) }/>}
            <StatTile label="Win %" value={Math.round(stats.winpcnt * 10) / 10} />
            <StatTile label="Streak" value={stats.streak} />
            <StatTile label="Max Streak" value={stats.maxstreak} />
          </div>

          {isCorrect && gameOver && (
            <div className={styles.mainBody}>
              <p>You Win!</p>
              <p className={styles.solution}>{currentNumble}</p>
              <p>You found the Numble in {currNumOfGuesses} guesses</p>
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
  );
}
