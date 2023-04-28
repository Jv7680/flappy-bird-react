import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectScore } from "../redux/slices/scoreSlice";

export default function Score() {
    const scoreState = useAppSelector(selectScore);
    const dispatch = useAppDispatch();

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
    fontFamily: "FlappyBird",
    fontSize: 40,
    color: "#FFFFFF",
};