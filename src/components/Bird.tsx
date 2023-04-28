import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import birdImg from "../assets/images/bird.png";
import { selectBird, fly, fall } from "../redux/slices/birdSlice";
import { running, generate } from "../redux/slices/pipeSlice";

export default function Bird() {
    const birdState = useAppSelector(selectBird);
    const dispatch = useAppDispatch();

    // const birdStyles: any = {
    //     position: 'absolute',
    //     top: birdState.y,
    //     left: 120,
    //     width: 38,
    //     height: 26,
    //     background: `url(${birdImg})`,
    //     transform: `rotate(${birdState.r}deg)`,
    //     transition: 'transform 100ms, top 300ms',
    // };

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

            {/* <button onClick={() => dispatch(fly())}>fly</button>

            <button onClick={() => dispatch(fall())}>fall</button>

            <button onClick={() => dispatch(running())}>running</button>

            <button onClick={() => dispatch(generate())}>generate</button> */}
        </>
    )
}

const birdStyles: any = {
    position: 'absolute',
    background: `url(${birdImg})`,
    transition: 'transform 20ms ease-in, top 100ms linear',
};