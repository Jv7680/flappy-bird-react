import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { clearState, gameOver } from '../utilActions';
import { RootState, AppThunk } from '../store';

export interface PipeState {
    x: number;
    pipes: number[];
}

const initState: PipeState = {
    x: 300,
    pipes: [],
}

const pipeSlice = createSlice({
    // Tên tiền số cho mỗi action
    name: 'pipe',
    // Khởi tạo state, các key(và value tương ứng) ở object này sẽ được lưu vào state của redux
    initialState: initState,
    // Mỗi key là một function với chức năng thay đổi giá trị ở initial state
    // Các function này sẽ tự động tạo ra action có type tương ứng với key, ví dụ key increment sẽ được làm thành action
    // thông qua createAction("increment"), sau đó được lưu và userSlice.actions
    reducers: {
        running: (state) => {
            if (!state.pipes.length) {
                return state;
            }
            else {
                state.x -= 10;
                return state;
            }
        },
        generate: (state) => {
            const topHeight = Math.round(Math.random() * 200) + 40
            state.pipes.push(topHeight);
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
export const selectPipe = (state: RootState) => state.pipe;

export const { running, generate } = pipeSlice.actions;
export default pipeSlice.reducer;