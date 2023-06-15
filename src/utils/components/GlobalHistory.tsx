import { useNavigate, NavigateFunction } from "react-router-dom";

// use this function to navigate outside a react component
export let customizedNavigate: NavigateFunction;

export default function GlobalHistory() {
    customizedNavigate = useNavigate();

    return null;
};