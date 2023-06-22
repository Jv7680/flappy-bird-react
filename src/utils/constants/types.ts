// setting
export const setting = {
    GENERAL: 0,
    ACCOUNT: 1,
};

export const generalSetting = {
    sound: {
        ON: 1,
        OFF: 2,
    },
    theme: {
        DAY: 1,
        NIGHT: 2,
    },
    language: {
        VIETNAMESE: "vi",
        ENGLISH: "en",
    },
    birdType: {
        YELLOW: 1,
        GREY: 2,
        PINK: 3,
        BLUE: 4,
    },
};

export const accountSetting = {
    LOGIN: 0,
    REGISTER: 1,
    PROFILE: 2,
    CHANGE_PASSWORD: 3,
    FORGOT_PASSWORD: 4,
    GOOGLE_LOGOUT: 5,
};

export const accountType = {
    NORMAL: 1,
    GOOGLE: 2,
};

// redux state
export const gameStatusTypes = {
    NOTHING: 0,
    PLAYING: 1,
    GAME_OVER: 2,
    GAME_PAUSED: 3,
    GAME_OVER_NOT_SHOW_MODAL: 4,
};