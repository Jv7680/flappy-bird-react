import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectScore } from "../redux/slices/scoreSlice";
import scoreSound from "../assets/sounds/score.mp3";

const scoreAudio = new Audio();
scoreAudio.src = scoreSound;

export default function Score() {
    const scoreState = useAppSelector(selectScore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (scoreState > 0) {
            scoreAudio.play();
        }
    }, [scoreState]);

    return (
        <>
            <div className="score" style={scoreStyles}>{scoreState}</div>
        </>
    )
}

const scoreStyles: any = {
    position: 'absolute',
    left: "calc(100vw / 2)",
    top: 50,
    transform: "translateX(-50%)",
    fontFamily: "VT323",
    fontSize: 40,
    color: "#FFFFFF",
};