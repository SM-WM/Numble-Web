import { createSlice } from "@reduxjs/toolkit"

export interface GameState {
    currNumble: string;
    numberOfDigits: number,
    maxNumberOfGuesses: number;
    guess: string[];
    submittedGuesses: string[][];
    gameOver: boolean;
    showStat:boolean;
    isCorrect:boolean;
    time:number;
}

function generateNumble(){
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const shuffledDigits = digits.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    return shuffledDigits.slice(0, 4).join('');
}

const initialState: GameState = {
    currNumble: generateNumble(),
    numberOfDigits: 4,
    maxNumberOfGuesses: 10,
    guess: [],
    submittedGuesses: [],
    gameOver: false,
    isCorrect: false,
    showStat:false,
    time:0
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        resetGame(state) {
            state.gameOver=false;
            state.isCorrect=false;
            state.showStat=false;
            state.submittedGuesses=[];
            state.guess=[];
            state.currNumble= generateNumble();
        },
        backSpaceHandler(state) {
            state.guess = state.guess.slice(0,-1);
        },
        addToGuess(state, action) {

            if(state.guess.length < state.numberOfDigits){
                state.guess += action.payload;
            }
        },
        addToSubmittedGuesses(state, action) {
            console.log(state.currNumble)
            if(state.guess.length === 4 && state.submittedGuesses.length < 10){

                state.submittedGuesses.push(state.guess);

                if(state.submittedGuesses.length>1){
                    state.isCorrect = state.guess.toString() === state.currNumble;
                }
                
                if(state.isCorrect || state.submittedGuesses.length === 10) {
                    state.gameOver = true;
                }
                state.guess = [];
            }
        },
        closeStat(state) {
            if(state.showStat){
                state.showStat = false;
            }
        },
        showStat(state) {
            state.showStat = true;
        },
        setGameOver(state) {
            state.gameOver = true;
        },
        setTime(state, action) {
            state.time = action.payload;
        }
    }
})

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;