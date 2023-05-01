import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fly, fall, setBirdY, BirdState, selectBird } from "../../redux/slices/birdSlice";
import { generate, PipeState, PipesElement, selectPipe } from "../../redux/slices/pipeSlice";
import { plusScore, setScore, selectScore } from "../../redux/slices/scoreSlice";
import { setGameStatus, selectGameStatus } from "../../redux/slices/gameStatusSlice";
import { gameOver } from "../../redux/utilActions";
import Bird from "../Bird";
import Background from "../Background";
import Foregound from "../Foreground";
import Pipe from "../Pipe";
import GameOverModal from "../GameOverModal";
import Score from "../Score";
import { store } from "../../redux/store";

let intervalGeneratePipes: any;
let intervalFall: any;
let intervalLoop: any;

export default function PlayScreen() {
    const gameStatusState = useAppSelector(selectGameStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        startGame(dispatch);
        document.addEventListener('keypress', handleKeyPress);

        let playScreen = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
        playScreen.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            playScreen.removeEventListener('click', handleClick);
        };
    }, []);

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.code === "Space" || event.code === "Enter") {
            dispatch(fly());
        }
    };

    const handleClick = (event: MouseEvent) => {
        // if (event.code === "Space" || event.code === "Enter") {
        dispatch(fly());
        // }
    };

    return (
        <div className="playScreen" style={playScreenStyles}>
            <div className="playScreen__translate" style={playScreenTranslateStyles}>
                <Background></Background>
                <Pipe></Pipe>
                <Foregound></Foregound>
            </div>
            <Bird></Bird>
            <Score></Score>
            {gameStatusState === 2 && <GameOverModal isOpen={true} restart={startGame}></GameOverModal>}
        </div>
    )
}

const playScreenStyles: any = {
    position: 'relative',
    width: "200vw",
    height: "100vh",
};

const playScreenTranslateStyles: any = {
    position: 'relative',
    width: "100%",
    height: "100%",
    left: 0,
    // transition: 'left 50ms linear',
};

// start the game
const startGame = (dispatch: any) => {
    let xT = 0;
    let xP = 0;
    let different = 10;
    let playScreen = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
    let translate = document.getElementsByClassName("playScreen__translate")[0] as HTMLDivElement;
    let bird = document.getElementsByClassName("bird")[0] as HTMLDivElement;

    translate.style.transition = 'left 100ms linear';
    bird.style.transition = 'transform 20ms ease-in, top 100ms linear';

    intervalGeneratePipes = setInterval(() => {
        dispatch(generate());
    }, 500);

    intervalFall = setInterval(() => {
        dispatch(fall());
    }, 100);

    intervalLoop = setInterval(() => {
        xT -= different;
        xP += different;
        translate.style.left = `${xT}px`;
        playScreen.style.width = `calc(200vw + ${xP}px)`;
        checkGameOver(dispatch, xT);
    }, 50);
};

// check game over
const checkGameOver = (dispatch: any, left: number) => {
    let { bird: birdState, pipe: pipeState, score: scoreState } = store.getState();
    let checkPlusScore: boolean = true;


    const pipeNearBird = pipeState.pipes.find((item) => {
        if (item.x + left >= birdState.x - pipeState.width - birdState.width) {
            return true;
        }
    });

    // console.log("pipeNearBird", pipeNearBird);

    // check collide with pipe
    if (pipeNearBird) {
        // check collide with pipe by X
        if (
            (pipeNearBird.x + left === birdState.x)
            &&
            (birdState.y <= pipeNearBird.topPipeHeight || birdState.y + birdState.height >= pipeNearBird.topPipeHeight + pipeState.gap)
        ) {
            console.log("check X");
            checkPlusScore = whenGameOver(dispatch);
        }
        // check collide with pipe by Y
        else if (
            (pipeNearBird.x + left < birdState.x && pipeNearBird.x + left >= birdState.x - pipeState.width - birdState.width / 2)
        ) {
            if (birdState.y <= pipeNearBird.topPipeHeight) {
                console.log("check Ytop");
                dispatch(setBirdY(pipeNearBird.topPipeHeight));

                checkPlusScore = whenGameOver(dispatch);
            }
            else if (birdState.y + birdState.height >= pipeNearBird.topPipeHeight + pipeState.gap) {
                console.log("check Ybottom");
                dispatch(setBirdY(pipeNearBird.topPipeHeight + pipeState.gap - birdState.height));

                checkPlusScore = whenGameOver(dispatch);
            }
        }
    }

    // check collide with foreground
    if (birdState.y + birdState.height >= Math.ceil(window.innerHeight * 0.8)) {
        dispatch(setBirdY(Math.ceil(window.innerHeight * 0.8) - birdState.height));

        checkPlusScore = whenGameOver(dispatch);
        console.log("foreground");
    }

    // get index of pipeNearBird
    const indexPassed = pipeState.pipes.findIndex((item) => {
        if (item.x === pipeNearBird?.x) {
            return true;
        }
    });

    if (checkPlusScore && indexPassed != -1) {
        dispatch(setScore(indexPassed));
    }
};

const whenGameOver = (dispatch: any): boolean => {
    // document.onkeydown = function (e) {
    //     return false;
    // }
    clearInterval(intervalGeneratePipes);
    clearInterval(intervalFall);
    clearInterval(intervalLoop);

    dispatch(gameOver());
    dispatch(setGameStatus(2));

    return false;
}