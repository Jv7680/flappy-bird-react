import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LocalStorage } from '../../services/storageService';

const stringUserSetting = LocalStorage.getUserSetting();

interface settingState {
    sound: number;
    theme: number;
    birdType: number;
};

const initState: settingState = stringUserSetting ? JSON.parse(stringUserSetting) : {
    sound: 1,
    theme: 1,
    birdType: 1,
};

!stringUserSetting && LocalStorage.setUserSetting(JSON.stringify(initState));

const settingSlice = createSlice({
    name: 'setting',
    initialState: initState,
    reducers: {
        setSoundSetting: (state, action: PayloadAction<number>) => {
            state.sound = action.payload;
            return state;
        },
        setThemeSetting: (state, action: PayloadAction<number>) => {
            state.theme = action.payload;
            return state;
        },
        setBirdTypeSetting: (state, action: PayloadAction<number>) => {
            state.birdType = action.payload;
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

export const selectSetting = (state: RootState) => state.setting;

export const { setSoundSetting, setThemeSetting, setBirdTypeSetting } = settingSlice.actions;
export default settingSlice.reducer;