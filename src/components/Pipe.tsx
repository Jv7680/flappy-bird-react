import { useState, useEffect } from "react";
import pipeNorthImg from "../assets/images/pipeNorth.png";
import pipeSouthImg from "../assets/images/pipeSouth.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { running, generate, selectPipe } from "../redux/slices/pipeSlice";

export default function Pipe() {
    const pipeState = useAppSelector(selectPipe);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // let pipeWrap__north = document.getElementsByClassName("pipeWrap__north")[0];
        // console.log("update")
    });

    return (
        <>
            <div className="pipe" style={pipeStyles}>
                {
                    pipeState.pipes.map((item, index) => (
                        <div className="pipeWrap" key={index} style={pipeWrapStyles}>
                            <div className="pipeWrap__north" style={{
                                ...pipeNorthStyles,
                                left: item.x,
                                width: pipeState.width,
                                height: item.topPipeHeight,
                            }}></div>
                            <div className="pipeWrap__south" style={{
                                ...pipeSouthStyles,
                                top: item.topPipeHeight + pipeState.gap,
                                left: item.x,
                                width: pipeState.width,
                                // height: window.innerHeight - item.topPipeHeight - pipeState.gap,
                                height: `calc(100vh - ${item.topPipeHeight}px - ${pipeState.gap}px)`,
                            }}></div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const gap: number = 100;

const pipeStyles: any = {
    position: 'absolute',
    top: 0,
    left: 0,
};

const pipeWrapStyles: any = {
    position: 'relative',
};

const pipeNorthStyles: any = {
    position: 'absolute',
    top: 0,
    background: `url(${pipeNorthImg})`,
    backgroundPosition: 'bottom',
    // backgroundSize: 'cover',
    transition: 'left 300ms linear',
};

const pipeSouthStyles: any = {
    position: 'absolute',
    background: `url(${pipeSouthImg})`,
    // backgroundSize: 'cover',
    transition: 'left 300ms linear',
};