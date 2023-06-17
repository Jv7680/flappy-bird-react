import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { resetState } from '../utilActions';

export interface PipesElement {
    x: number;
    topPipeHeight: number;
}

export interface PipeState {
    generateFirstPipeAtX: number;
    gap: number;
    width: number;
    pipes: PipesElement[];
}

const distanceXBetweenTwoPipes: number = 400;

const innerWidth: number = window.innerWidth;
const initState: PipeState = {
    generateFirstPipeAtX: Math.ceil(innerWidth / 10) * 10 + 100,
    gap: 160,
    width: 50,
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
        generate: (state) => {
            const newPipe: PipesElement = {
                x: initState.generateFirstPipeAtX + state.pipes.length * distanceXBetweenTwoPipes,
                // topPipeHeight: Math.round(Math.random() * 200) + 40,
                topPipeHeight: Math.random() / 1.25 * Math.ceil(window.innerHeight * 0.8 / 2) + 40,
            }
            state.pipes.push(newPipe);
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(gameOver, (state) => {
            //     state = initState;
            //     return state;
            // })
            .addCase(resetState, (state) => {
                state = initState;
                return state;
            })
    },
})

// pass this fn to useAppSelector to get the bird redux state
export const selectPipe = (state: RootState) => state.pipe;

export const { generate } = pipeSlice.actions;
export default pipeSlice.reducer;