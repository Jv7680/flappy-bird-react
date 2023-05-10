import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetState, clearState } from '../utilActions';
import { RootState, AppThunk } from '../store';
import { store } from '../store';

export interface BirdState {
    x: number;
    y: number;
    r: number;
    width: number;
    height: number;
}

const initState: BirdState = {
    x: 120,
    y: Math.ceil(window.innerHeight * 0.8 / 2),
    r: 0,
    width: 38,
    height: 26,
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
            state.y -= 46;//50
            state.r = -30;

            return state;
        },
        fall: (state, action: PayloadAction<number>) => {
            state.y += action.payload;//20
            let newRotate = state.r + 0.5;
            if (newRotate < 0) {
                state.r = newRotate;
            }
            else {
                state.r = 0;
            }

            return state;
        },
        setBirdY: (state, action: PayloadAction<number>) => {
            state.y = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(gameOver, (state) => {
            //     state = initState;
            //     // return { ...state, y: window.innerHeight, r: 90 };
            //     return state;
            // })
            .addCase(resetState, (state) => {
                state = initState;
                return state;
            })
    },
})

// pass this fn to useAppSelector to get the bird redux state
export const selectBird = (state: RootState) => state.bird;

export const { fly, fall, setBirdY } = birdSlice.actions;
export default birdSlice.reducer;