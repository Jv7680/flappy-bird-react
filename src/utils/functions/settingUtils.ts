import birdImg from "../../assets/images/bird.png";
import birdBlueImg from "../../assets/images/bird_blue.png";
import birdPinkImg from "../../assets/images/bird_pink.png";
import birdGreyImg from "../../assets/images/bird_grey.png";
import bgImg from "../../assets/images/bg.png";
import bgNightImg from "../../assets/images/bg_night.png";
import fgImg from "../../assets/images/fg.png";
import fgNightImg from "../../assets/images/fg_night.png";
import * as settingTypes from "../constants/types";

const getSoundBySetting = (soundSetting: number) => {
    return soundSetting === settingTypes.generalSetting.sound.ON;
};

const getThemeImgBySetting = (themeSetting: number) => {
    const dayTheme = [bgImg, fgImg];
    const nightTheme = [bgNightImg, fgNightImg];

    let result;
    switch (themeSetting) {
        case settingTypes.generalSetting.theme.DAY:
            result = dayTheme;
            break;
        case settingTypes.generalSetting.theme.NIGHT:
            result = nightTheme;
            break;
        default:
            result = dayTheme;
    }

    return result;
};

const getBirdImgBySetting = (birdTypeSetting: number) => {
    let result;
    switch (birdTypeSetting) {
        case settingTypes.generalSetting.birdType.YELLOW:
            result = birdImg;
            break;
        case settingTypes.generalSetting.birdType.GREY:
            result = birdGreyImg;
            break;
        case settingTypes.generalSetting.birdType.PINK:
            result = birdPinkImg;
            break;
        case settingTypes.generalSetting.birdType.BLUE:
            result = birdBlueImg;
            break;
        default:
            result = birdImg;
    }

    return result;
};

export const SettingUtils = {
    getSoundBySetting,
    getThemeImgBySetting,
    getBirdImgBySetting,
};