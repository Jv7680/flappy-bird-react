import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { store } from "../../redux/store";
import HOME_VI from "../../locales/vi/home.json";
import HOME_EN from "../../locales/en/home.json";
import PLAY_VI from "../../locales/vi/play.json";
import PLAY_EN from "../../locales/en/play.json";
import VALIDATE_VI from "../../locales/vi/validate.json";
import VALIDATE_EN from "../../locales/en/validate.json";

export type Locales = "vi" | "en";

export const resources = {
    vi: {
        home: HOME_VI,
        play: PLAY_VI,
        validate: VALIDATE_VI
    },
    en: {
        home: HOME_EN,
        play: PLAY_EN,
        validate: VALIDATE_EN
    },
};

export const defaultNS = "home";

const languageState = store.getState().setting.language || "en";

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: languageState,
        fallbackLng: "en",
        ns: ["home", "play", "validate"],
        defaultNS,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;