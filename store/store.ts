import { configureStore } from "@reduxjs/toolkit"
import gameSliceReducer from "./game-slice"
import userSliceReducer from "./user-slice"

const store = configureStore({
    reducer: {
        game: gameSliceReducer,
        user: userSliceReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;