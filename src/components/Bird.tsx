import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import birdImg from "../assets/images/bird.png";
import { selectBird, fly, fall } from "../redux/slices/birdSlice";

export default function Bird() {
    const birdState = useAppSelector(selectBird);
    const dispatch = useAppDispatch();

    return (
        <>
            <div
                className="bird"
                style={{
                    width: birdState.width,
                    height: birdState.height,
                    left: birdState.x - birdState.width,
                    top: birdState.y,
                    transform: `rotate(${birdState.r}deg)`,
                    ...birdStyles,
                }}
            >
            </div>
        </>
    )
}

const birdStyles: any = {
    position: 'absolute',
    background: `url(${birdImg})`,
    // transition: 'transform 20ms ease-in, top 100ms linear',
};