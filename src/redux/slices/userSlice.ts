import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIService, { ResponseData } from '../../services/ApiService';
import { RootState } from '../store';

export interface UserState {
    userName: string;
    fullName: string;
    gmail: string;
    bestScore: number;
    setting: {};
    accountType: number;
}

const initState: UserState = {
    userName: "",
    fullName: "",
    gmail: "",
    bestScore: 0,
    setting: {},
    accountType: 0,
};

export const getUserDetail = createAsyncThunk(
    "user/getDetail",
    async () => {
        let result: ResponseData<any> = await APIService.get("/api/v1/user/detail");
        if (result.code !== 204) {
            return Promise.reject(result.code);
        }
        return result;
    }
);

export const updateUserBestScore = createAsyncThunk(
    "user/updateBestScore",
    async (userBestScore: number) => {
        let body = {
            userBestScore: userBestScore,
        };
        let result: ResponseData<any> = await APIService.patch("/api/v1/user/updateUserBestScore", body);
        if (result.code !== 207) {
            return Promise.reject(result.code);
        }
        return result;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
            return state;
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
            return state;
        },
        setGmail: (state, action: PayloadAction<string>) => {
            state.gmail = action.payload;
            return state;
        },
        setBestScore: (state, action: PayloadAction<number>) => {
            state.bestScore = action.payload;
            return state;
        },
        resetUser: (state) => {
            state = initState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetail.pending, (state) => {
                // state.isError = false;
                // state.isLoading = true;                                                                                                                                                                                                                                                         
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state = action.payload.data;
                return state;
            })
            .addCase(getUserDetail.rejected, (state) => {
                // state.isError = true;
                // state.isLoading = false;
            })
        // .addCase(updateUserBestScore.pending, (state) => {
        //     // state.isError = false;
        //     // state.isLoading = true;                                                                                                                                                                                                                                                         
        // })
        // .addCase(updateUserBestScore.fulfilled, (state, action) => {
        //     state = action.payload.data;
        //     return state;
        // })
        // .addCase(updateUserBestScore.rejected, (state) => {
        //     // state.isError = true;
        //     // state.isLoading = false;
        // })
        // .addCase(resetState, (state) => {
        //     state = initState;
        //     return state;
        // })
    },
})

export const selectUser = (state: RootState) => state.user;

export const { setUserName, setFullName, setGmail, setBestScore, resetUser } = userSlice.actions;
export default userSlice.reducer;