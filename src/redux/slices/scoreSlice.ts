import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { resetState } from '../utilActions';

export interface ScoreState {
    score: number;
}

const initState: number = 0;

const scoreSlice = createSlice({
    // Tên tiền số cho mỗi action
    name: 'score',
    // Khởi tạo state, các key(và value tương ứng) ở object này sẽ được lưu vào state của redux
    initialState: initState,
    // Mỗi key là một function với chức năng thay đổi giá trị ở initial state
    // Các function này sẽ tự động tạo ra action có type tương ứng với key, ví dụ key increment sẽ được làm thành action
    // thông qua createAction("increment"), sau đó được lưu và userSlice.actions
    reducers: {
        plusScore: (state) => {
            state++;
            return state;
        },
        setScore: (state, action: PayloadAction<number>) => {
            state = action.payload;
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
export const selectScore = (state: RootState) => state.score;

export const { plusScore, setScore } = scoreSlice.actions;
export default scoreSlice.reducer;