import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function HomeScreen() {
    const navigateTo = useNavigate();
    return (
        <>
            <div>HOME</div>
            <button onClick={() => { navigateTo("/play") }}>Chơi</button>
        </>
    )
}