import { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { store } from "../../redux/store";
import { selectFPS, setFPS } from "../../redux/slices/fpsSlice";

export default function FPS() {
    const fpsState = useAppSelector(selectFPS);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    useEffect(() => {
        checkFPS();

        setInterval(() => {
            store.dispatch(setFPS(newFPS));
        }, 1000);
    }, []);

    return (
        <>
            <div className={classes.root}>
                FPS: {fpsState === 0 ? "..." : fpsState}
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        position: "fixed",
        top: 0,
        right: 0,
        width: 80,
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

        "& .title": {
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
        },
        "& .close": {
            position: "absolute",
            top: 0,
            right: 0,
        },
        "& .close button": {
            backgroundColor: "#D2AA4F",
            color: "#523747",
            outline: "none",
            borderRadius: 4,
            cursor: "pointer",
            margin: 4,
            fontSize: 16,
            padding: 4,
            lineHeight: 0,
        },
        "& .close button:active": {
            borderStyle: "inset",
        },

        "& .content": {
            margin: "40px 0 4px 0",

            "& span": {

            },
            "& div": {
                margin: "4px 0 16px 0",
            },
            "& ul": {
                margin: "4px 0",
            },
            "& li": {

                "& img": {
                    width: 18,
                },
            },
        },
    },
});

let i: number = 0;
let newFPS: number = 0;
let previousTime: number = performance.now();
const checkFPS = (calledTime?: number) => {
    if (calledTime) {
        i++;
        // console.log(`FPS lần ${i}`, 1000 / (calledTime - previousTime), previousTime, calledTime);
        newFPS = Math.round(1000 / (calledTime - previousTime));
        previousTime = calledTime;
    }

    requestAnimationFrame(checkFPS);
};