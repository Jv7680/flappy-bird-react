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
    // Tên tiền số cho mỗi action
    name: 'gameStatus',
    // Khởi tạo state, các key(và value tương ứng) ở object này sẽ được lưu vào state của redux
    initialState: initState,
    // Mỗi key là một function với chức năng thay đổi giá trị ở initial state
    // Các function này sẽ tự động tạo ra action có type tương ứng với key, ví dụ key increment sẽ được làm thành action
    // thông qua createAction("increment"), sau đó được lưu và userSlice.actions
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

// pass this fn to useAppSelector to get the bird redux state
export const selectGameStatus = (state: RootState) => state.gameStatus;

export const { setGameStatus } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;