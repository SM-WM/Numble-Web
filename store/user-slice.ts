import { getImageListItemBarUtilityClass } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit"
import exp from "constants";
import { create } from "domain";

export type GameHistory = {
    numOfGuess: number;
    didWin: boolean;
    totalTime: number;
    score: number
}

interface UserState {
    numOfGames: number;
    streak: number;
    maxStreak: number;
    gameList: GameHistory[];
    winRate: number;
    performanceArray: number[];
}

const initialState: UserState = {
    numOfGames:0,
    streak: 0,
    maxStreak: 0,
    gameList: [],
    winRate: 0,
    performanceArray: [0,0,0,0,0,0,0,0,0,0]
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateGame(state, action) {
            if (action.payload === true) {
                state.numOfGames++;
            }
        },
        addGame(state, action){
            state.gameList.push(action.payload)
        },
        setWinRate(state) {
            const winCount = state.gameList.filter( game => {
                if(game.didWin === true){
                    return true;
                }
                return false; 
            }).length;
            state.winRate =  (state.numOfGames > 0)? (winCount*100/state.numOfGames) : 0;
        },
        setStreak(state, action) {
            state.streak = action.payload ? (state.streak + 1) : 0;
            state.maxStreak = Math.max(state.maxStreak, state.streak)
        },
        setPerformanceArray(state, action) {
            state.performanceArray[action.payload-1]++;
        }
    }
})

export default userSlice.reducer;

export const userActions = userSlice.actions;