import { useState, useEffect } from "react";
import bgImg from "../assets/images/bg.png";

export default function Background() {
    return (
        <>
            <div className="background" style={bgStyles}></div>
        </>
    )
}

const bgStyles: any = {
    position: 'relative',
    // width: "100%",
    height: "100%",
    background: `url(${bgImg})`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "contain",
    overflow: 'hidden',
};