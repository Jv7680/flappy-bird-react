import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIService, { ResponseData } from '../../services/ApiService';
import { RootState } from '../store';

const initState: any[] = [];

export const getRankList = createAsyncThunk(
    "rankList/get",
    async () => {
        let result: ResponseData<any> = await APIService.get("/api/v1/user/rankList");
        if (result.code !== 209) {
            return Promise.reject(result.code);
        }
        return result;
    }
);

const rankListSlice = createSlice({
    name: 'rankList',
    initialState: initState,
    reducers: {
        setRankList: (state, action: PayloadAction<any[]>) => {
            state = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRankList.pending, (state) => {
                // state.isError = false;
                // state.isLoading = true;                                                                                                                                                                                                                                                         
            })
            .addCase(getRankList.fulfilled, (state, action) => {
                state = action.payload.data;
                return state;
            })
            .addCase(getRankList.rejected, (state) => {
                // state.isError = true;
                // state.isLoading = false;
            })
    },
})

export const selectRankList = (state: RootState) => state.rankList;

export const { setRankList } = rankListSlice.actions;
export default rankListSlice.reducer;