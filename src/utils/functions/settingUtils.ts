import birdImg from "../../assets/images/bird.png";
import birdBlueImg from "../../assets/images/bird_blue.png";
import birdPinkImg from "../../assets/images/bird_pink.png";
import birdGreyImg from "../../assets/images/bird_grey.png";
import bgImg from "../../assets/images/bg.png";
import bgNightImg from "../../assets/images/bg_night.png";
import fgImg from "../../assets/images/fg.png";
import fgNightImg from "../../assets/images/fg_night.png";

const getSoundBySetting = (soundSetting: number) => {
    if (soundSetting === 1) {
        return true;
    }
    else {
        return false;
    }
};

const getThemeImgBySetting = (themeSetting: number) => {
    if (themeSetting === 1) {
        return [bgImg, fgImg];
    }
    else {
        return [bgNightImg, fgNightImg];
    }
};

const getBirdImgBySetting = (birdTypeSetting: number) => {
    if (birdTypeSetting === 1) {
        return birdImg;
    }
    else if (birdTypeSetting === 2) {
        return birdGreyImg;
    }
    else if (birdTypeSetting === 3) {
        return birdPinkImg;
    }
    else {
        return birdBlueImg;
    }
};

export const SettingUtils = {
    getSoundBySetting,
    getThemeImgBySetting,
    getBirdImgBySetting,
};