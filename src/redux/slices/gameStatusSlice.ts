import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { clearState, gameOver } from '../utilActions';
import { RootState, AppThunk } from '../store';

export interface ScoreState {
    gameStatus: number;
}

// 0: nothing
// 1: playing
// 2: game over
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
            .addCase(clearState, (state) => {
                state = initState;
                return state;
            })
    },
})

// pass this fn to useAppSelector to get the bird redux state
export const selectGameStatus = (state: RootState) => state.gameStatus;

export const { setGameStatus } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;