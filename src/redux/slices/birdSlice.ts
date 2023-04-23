import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { clearState, gameOver } from '../utilActions';
import { RootState, AppThunk } from '../store';

export interface BirdState {
    y: number;
    r: number;
}

const initState: BirdState = {
    y: 250,
    r: 0,
}

const birdSlice = createSlice({
    // Tên tiền số cho mỗi action
    name: 'bird',
    // Khởi tạo state, các key(và value tương ứng) ở object này sẽ được lưu vào state của redux
    initialState: initState,
    // Mỗi key là một function với chức năng thay đổi giá trị ở initial state
    // Các function này sẽ tự động tạo ra action có type tương ứng với key, ví dụ key increment sẽ được làm thành action
    // thông qua createAction("increment"), sau đó được lưu và userSlice.actions
    reducers: {
        fly: (state) => {
            state.y -= 50;
            state.r -= 30;
            return state;
        },
        fall: (state) => {
            state.y += 20;
            state.r = 0;
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
export const selectBird = (state: RootState) => state.bird;

export const { fly, fall } = birdSlice.actions;
export default birdSlice.reducer;