import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import birdReducer from './slices/birdSlice';
import pipeReducer from './slices/pipeSlice';
import scoreReducer from './slices/scoreSlice';
import gameStatusReducer from './slices/gameStatusSlice';

export const store = configureStore({
    reducer: {
        bird: birdReducer,
        pipe: pipeReducer,
        score: scoreReducer,
        gameStatus: gameStatusReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

// get the redux state structure
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
