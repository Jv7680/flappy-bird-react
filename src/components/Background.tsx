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
    width: "100%",
    height: 512,
    background: `url(${bgImg})`,
    overflow: 'hidden',
};