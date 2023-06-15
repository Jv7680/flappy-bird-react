import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { gameOver } from '../utilActions';

export interface ScoreState {
    gameStatus: number;
}

// 0: nothing
// 1: playing
// 2: game over
// 3: paused
// 4: equall with 2 but use when don't want the modal game over show
const initState: number = 0;

const gameStatusSlice = createSlice({
    name: 'gameStatus',
    initialState: initState,
    reducers: {
        setGameStatus: (state, action: PayloadAction<number>) => {
            state = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(gameOver, (state) => {
                state = initState;
                return state;
            })
        // .addCase(resetState, (state) => {
        //     state = initState;
        //     return state;
        // })
    },
})

export const selectGameStatus = (state: RootState) => state.gameStatus;

export const { setGameStatus } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;