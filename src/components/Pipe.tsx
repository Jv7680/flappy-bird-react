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
                    pipeState.pipes.map((topHeight, index) => (
                        <div className="pipeWrap" key={index} style={pipeWrapStyles}>
                            <div className="pipeWrap__north" style={{
                                ...pipeNorthStyles,
                                left: pipeState.x + index * 200,
                                height: topHeight,
                            }}></div>
                            <div className="pipeWrap__south" style={{
                                ...pipeSouthStyles,
                                top: topHeight + 100,
                                left: pipeState.x + index * 200,
                                height: 512 - topHeight - 100,
                            }}></div>
                        </div>
                    ))
                }
            </div> 
        </>
    )
}

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
    width: 52,
    background: `url(${pipeNorthImg})`,
    backgroundPosition: 'bottom',
    transition: 'left 300ms linear',
};

const pipeSouthStyles: any = {
    position: 'absolute',
    width: 52,
    background: `url(${pipeSouthImg})`,
    transition: 'left 300ms linear',
};