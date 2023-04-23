import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fly, fall, BirdState, selectBird } from "../../redux/slices/birdSlice";
import { running, generate, PipeState, selectPipe } from "../../redux/slices/pipeSlice";
import { gameOver } from "../../redux/utilActions";
import Bird from "../Bird";
import Background from "../Background";
import Foregound from "../Foreground";
import Pipe from "../Pipe";
import { store } from "../../redux/store";

// import birdImg from "../../assets/images/bird.png";
// import bgImg from "../../assets/images/bg.png";
// import fgImg from "../../assets/images/fg.png";
// import pipeNorthImg from "../../assets/images/pipeNorth.png";
// import pipeSouthImg from "../../assets/images/pipeSouth.png";

// import flySound from "../../assets/sounds/fly.mp3";
// import scoreSound from "../../assets/sounds/score.mp3";

// function run() {
//     const cvs = document.getElementById("canvas") as HTMLCanvasElement;
//     const ctx = cvs.getContext("2d");

//     // load images

//     let bird = new Image();
//     let bg = new Image();
//     let fg = new Image();
//     let pipeNorth = new Image();
//     let pipeSouth = new Image();

//     // becareful, wrong source will get into "broken state" error
//     bird.src = birdImg;
//     bg.src = bgImg;
//     fg.src = fgImg;
//     pipeNorth.src = pipeNorthImg;
//     pipeSouth.src = pipeSouthImg;


//     // some let iables

//     // khoảng cách giữa hai cột trụ để chim lọt qua
//     let gap = 85;
//     let constant;

//     // tạo độ chim theo trục x và y, gốc tọa độ (0, 0) là vị trí trên cùng bên trái của canvas
//     let bX = 10;
//     let bY = 150;

//     // tốc độ rơi của chim
//     let gravity = 1.5;

//     let score = 0;

//     // audio files
//     let fly = new Audio();
//     let scor = new Audio();

//     fly.src = flySound;
//     scor.src = scoreSound;

//     // on key down
//     document.addEventListener("keydown", moveUp);

//     function moveUp() {
//         bY -= 25;
//         fly.play();
//     }

//     // pipe coordinates(tọa độ đường ống), mảng này dùng để xác định tọa độ ống nước trên và dưới
//     let pipe: any[] = [];

//     pipe[0] = {
//         x: cvs.width - 150,
//         y: 0
//     };

//     // window.onload = function () {
//     //     ctx!.drawImage(bg, 0, 0)
//     //     constant = pipeNorth.height + gap;

//     //     ctx!.drawImage(pipeNorth, pipe[0].x, pipe[0].y);
//     //     ctx!.drawImage(pipeSouth, pipe[0].x, pipe[0].y + constant);

//     //     ctx!.drawImage(bg, 0, 0)

//     //     ctx!.drawImage(pipeNorth, pipe[0].x - 100, pipe[0].y);
//     //     ctx!.drawImage(pipeSouth, pipe[0].x - 100, pipe[0].y + constant);

//     //     ctx!.drawImage(fg, 0, cvs.height - fg.height);
//     // };

//     // draw images
//     function draw() {
//         ctx!.drawImage(bg, 0, 0);

//         // vẽ đường ống
//         for (let i = 0; i < pipe.length; i++) {

//             constant = pipeNorth.height + gap;
//             ctx!.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
//             ctx!.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

//             // canvas width là 288
//             pipe[i].x--;

//             if (pipe[i].x == 125) {
//                 pipe.push({
//                     x: cvs.width,
//                     y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
//                 });
//             }

//             // detect collision
//             if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
//                 window.location.reload(); // reload the page
//             }

//             // cộng điểm
//             if (pipe[i].x === 5) {
//                 score++;
//                 scor.play();
//             }


//         }

//         ctx!.drawImage(fg, 0, cvs.height - fg.height);
//         ctx!.drawImage(bird, bX, bY);


//         bY += gravity;

//         ctx!.fillStyle = "#000";
//         ctx!.font = "20px Verdana";
//         ctx!.fillText("Score : " + score, 10, cvs.height - 20);

//         requestAnimationFrame(draw);
//     }

//     draw()
// }

let intervalGeneratePipes: any;
let intervalLoop: any;

export default function PlayScreen() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        startGame(dispatch);

        document.addEventListener('keypress', (event) => {
            // console.log("xxxx", event)
            if (event.code === "Space") {
                dispatch(fly());
            }
        })
    }, []);

    return (
        <div className="playScreen" style={playScreenStyles}>
            <Background></Background>
            <Bird></Bird>
            <Pipe></Pipe>
            <Foregound></Foregound>
        </div>
    )
}

const playScreenStyles: any = {
    position: 'relative',
    width: 306,
    height: 512,
};

// start the game
const startGame = (dispatch: any) => {
    intervalGeneratePipes = setInterval(() => {
        dispatch(generate());
    }, 3000);
    intervalLoop = setInterval(() => {
        dispatch(running());
        dispatch(fall());
        checkGameOver(dispatch);
    }, 300);
};

// check collide
const checkGameOver = (dispatch: any) => {
    let { bird: birdState, pipe: pipeState } = store.getState();
    const birdY = birdState.y;

    const pipesCanSee = pipeState.pipes.map((topHeight, index) => {
        return {
            x1: pipeState.x + index * 200,
            y1: topHeight,
            x2: pipeState.x + index * 200,
            y2: topHeight + 100,
        }
    })
        .filter((item) => {
            if (item.x1 > 0 && item.x1 < 288) {
                return true
            }
        });

    // check collide with foreground
    if (birdState.y > 512 - 108) {
        clearInterval(intervalGeneratePipes);
        clearInterval(intervalLoop);
        dispatch(gameOver());
    }

    // check collide with pipe
    if (pipesCanSee.length) {
        const { x1, y1, x2, y2 } = pipesCanSee[0];

        if (
            (x1 < 120 && 120 < x1 + 52 && birdY < y1) ||
            (x2 < 120 && 120 < x2 + 52 && birdY > y2)
        ) {
            clearInterval(intervalGeneratePipes);
            clearInterval(intervalLoop);
            dispatch(gameOver());
        }
    }
};