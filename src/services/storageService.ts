const getUserId = () => {
    return +(localStorage.getItem("userID") || 0);
}

const setUserId = (userId: number) => {
    localStorage.setItem("userID", userId as unknown as string);
}

const getUserSetting = () => {
    return localStorage.getItem("userSetting");
}

const setUserSetting = (userSetting: string) => {
    localStorage.setItem("userSetting", userSetting);
}

export const LocalStorage = {
    getUserId,
    setUserId,
    getUserSetting,
    setUserSetting,
};