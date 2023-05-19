import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface fpsState {
    fps: number;
}

const initState: number = +(localStorage.getItem("deviceStableFPS") || "60");

const fpsSlice = createSlice({
    // Tên tiền số cho mỗi action
    name: 'fps',
    // Khởi tạo state, các key(và value tương ứng) ở object này sẽ được lưu vào state của redux
    initialState: initState,
    // Mỗi key là một function với chức năng thay đổi giá trị ở initial state
    // Các function này sẽ tự động tạo ra action có type tương ứng với key, ví dụ key increment sẽ được làm thành action
    // thông qua createAction("increment"), sau đó được lưu và userSlice.actions
    reducers: {
        setFPS: (state, action: PayloadAction<number>) => {
            state = action.payload;
            return state;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(resetState, (state) => {
    //             state = initState;
    //             return state;
    //         })
    // },
})

// pass this fn to useAppSelector to get the bird redux state
export const selectFPS = (state: RootState) => state.fps;

export const { setFPS } = fpsSlice.actions;
export default fpsSlice.reducer;