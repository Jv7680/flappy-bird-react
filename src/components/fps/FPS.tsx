import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { setFPS } from "../../redux/slices/fpsSlice";
import { store } from "../../redux/store";

export default function FPS() {
    const [tempFPS, setTempFPS] = useState<number>(60);
    const classes = useStyles();

    useEffect(() => {
        checkFPS();

        setInterval(() => {
            setTempFPS(newFPS);
            localStorage.setItem("deviceStableFPS", newFPS.toString());
        }, 1000);
    }, []);

    return (
        <>
            <div className={classes.root}>
                FPS: {tempFPS === 0 ? "..." : tempFPS}
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: 0,
        right: 12,
        width: 'max-content',
        height: 30,
        border: "unset",
        backgroundColor: "unset",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "#FFFFFF",
        fontFamily: 'VT323',
        fontSize: 22,
        zIndex: 3,
    },
});

// let i: number = 0;
let newFPS: number = 60;
let previousTime: number = performance.now();
const checkFPS = (calledTime?: number) => {
    if (calledTime) {
        // i++;
        // console.log(`FPS lần ${i}`, 1000 / (calledTime - previousTime), previousTime, calledTime);
        newFPS = Math.round(1000 / (calledTime - previousTime));
        store.dispatch(setFPS(Math.round(newFPS / 10) * 10));
        previousTime = calledTime;
    }

    requestAnimationFrame(checkFPS);
};