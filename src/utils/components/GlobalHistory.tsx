import { useNavigate, NavigateFunction } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// use this function to navigate outside a react component
export let customizedNavigate: NavigateFunction;

export let i18TFunc: any;
export let i18Obj: any;

export default function GlobalHistory() {
    customizedNavigate = useNavigate();
    i18TFunc = useTranslation().t;
    i18Obj = useTranslation().i18n;

    return null;
};