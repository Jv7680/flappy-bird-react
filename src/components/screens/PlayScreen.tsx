import { useEffect } from "react";
import flySound from "../../assets/sounds/fly.mp3";
import hitSound from "../../assets/sounds/hit.mp3";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fall, fly, setBirdY } from "../../redux/slices/birdSlice";
import { selectGameStatus, setGameStatus } from "../../redux/slices/gameStatusSlice";
import { generate } from "../../redux/slices/pipeSlice";
import { setScore } from "../../redux/slices/scoreSlice";
import { store } from "../../redux/store";
import { resetState } from "../../redux/utilActions";
import Background from "../Background";
import Bird from "../Bird";
import Foregound from "../Foreground";
import GameOverModal from "../GameOverModal";
import Pipe from "../Pipe";
import Score from "../Score";

let intervalGeneratePipes: any;
let xT: number = 0;
let xP: number = 0;
const flyAudio = new Audio();
flyAudio.src = flySound;
const hitAudio = new Audio();
hitAudio.src = hitSound;

export default function PlayScreen() {
    const gameStatusState = useAppSelector(selectGameStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        startGame(dispatch);
        document.addEventListener('keypress', handleKeyPress);

        let playScreen = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
        playScreen.addEventListener('click', handleClick);

        playScreen.addEventListener('mousedown', handleMouseDown);
        playScreen.addEventListener('mouseup', handleMouseUp);

        // for mobile device
        playScreen.addEventListener('touchstart', handleMouseDown);
        playScreen.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            playScreen.removeEventListener('click', handleClick);

            playScreen.removeEventListener('mousedown', handleMouseDown);
            playScreen.removeEventListener('mouseup', handleMouseUp);

            playScreen.removeEventListener('touchstart', handleMouseDown);
            playScreen.removeEventListener('touchend', handleMouseUp);

            // stop the game loop
            whenGameOver(dispatch, false);
        };
    }, []);

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
};

const startGame = (dispatch: Function) => {
    xT = 0;
    xP = 0;

    // playing
    store.dispatch(setGameStatus(1));

    lockKeyboard(false);

    intervalGeneratePipes = setInterval(() => {
        dispatch(generate());
    }, 600);

    birdFallLoop();

    translateLoop();
};

const translateLoop = () => {
    // 2: Easy, 5: Hard (only true when FPS is 60)
    // let different = Math.round(store.getState().fps / 30);
    let different = +(120 / store.getState().fps).toFixed(4);
    xT -= different;
    xP += different;
    let playScreen = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
    let translate = document.getElementsByClassName("playScreen__translate")[0] as HTMLDivElement;

    if (store.getState().gameStatus === 2) {
        return;
    }

    if (playScreen && translate) {
        translate.style.transform = `translateX(${xT}px)`;
        playScreen.style.width = `calc(200vw + ${xP}px)`;
    }

    checkGameOver(store.dispatch, xT);

    requestAnimationFrame(translateLoop);
};

// const generatePipesLoop = () => {
//     store.dispatch(generate());

//     if (store.getState().gameStatus === 2) {
//         return;
//     }

//     requestAnimationFrame(generatePipesLoop);
// };

const birdFallLoop = () => {
    // let newFall = Math.round(store.getState().fps / 30);
    let newFall = +(120 / store.getState().fps).toFixed(4);

    if (store.getState().gameStatus === 2) {
        return;
    }

    store.dispatch(fall(newFall));
    // console.log("rơi", newFall);

    requestAnimationFrame(birdFallLoop);
};

// check game over
const checkGameOver = (dispatch: any, left: number) => {
    let { bird: birdState, pipe: pipeState, score: scoreState } = store.getState();
    let checkPlusScore: boolean = true;


    const pipeNearBird = pipeState.pipes.find((item) => {
        if (item.x + left >= birdState.x - pipeState.width - birdState.width) {
            return true;
        }
        return false;
    });

    // console.log("pipeNearBird", pipeNearBird);

    // check collide with pipe
    if (pipeNearBird) {
        // check collide with pipe by X
        if (
            // (pipeNearBird.x + left === birdState.x)
            (pipeNearBird.x + left <= birdState.x + (+(120 / store.getState().fps).toFixed(4)) && pipeNearBird.x + left >= birdState.x)
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
    let foregroundHeight = document.getElementsByClassName("foreground")[0] as HTMLDivElement;
    if (birdState.y + birdState.height >= Math.ceil(window.innerHeight - foregroundHeight.offsetHeight)) {
        dispatch(setBirdY(Math.ceil(window.innerHeight - foregroundHeight.offsetHeight) - birdState.height));

        checkPlusScore = whenGameOver(dispatch);
        console.log("foreground");
    }

    // get index of pipeNearBird
    const indexPassed = pipeState.pipes.findIndex((item) => {
        if (item.x === pipeNearBird?.x) {
            return true;
        }
        return false;
    });

    if (checkPlusScore && indexPassed !== -1) {
        dispatch(setScore(indexPassed));
    }
};

const whenGameOver = (dispatch: any, playHitAudio: boolean = true): boolean => {
    lockKeyboard(true);

    clearInterval(intervalGeneratePipes);
    clearTimeout(timeoutMouseDown);
    clearInterval(intervalMouseDown);

    // dispatch(resetState());
    dispatch(setGameStatus(2));

    if (playHitAudio) {
        hitAudio.play();
    }
    else {
        // reset when this component unmount
        dispatch(resetState());
    }

    return false;
}

let flyDispatchCount: number = 0;
let isMouseUp: boolean = false;
const makeBirdFly = (isMouseDown: boolean = false) => {
    // let flyTo = +(360 / store.getState().fps).toFixed(4);

    const makeFly = () => {
        flyDispatchCount++;
        let frameUsed = +((store.getState().fps) * 9 / 60).toFixed(4);

        if (flyDispatchCount > frameUsed || store.getState().gameStatus === 2) {
            flyDispatchCount = 0;
            return;
        }

        // fly up 36px with 60FPS, so each frame is 4px for 9 frame
        let newFall = +(120 / store.getState().fps).toFixed(4);
        let flyEachFrame = +(240 / store.getState().fps).toFixed(4);
        let flyTo = +(newFall + flyEachFrame).toFixed(4);

        store.dispatch(fly(flyTo));
        flyAudio.play();

        requestAnimationFrame(makeFly);
    };

    const makeFlyWhenMouseDown = () => {
        if (isMouseUp || store.getState().gameStatus === 2) {
            return;
        }

        // fly up 36px
        let newFall = +(120 / store.getState().fps).toFixed(4);
        let flyEachFrame = +(240 / store.getState().fps).toFixed(4);
        let flyTo = +(newFall + flyEachFrame).toFixed(4);

        store.dispatch(fly(flyTo));
        flyAudio.play();

        requestAnimationFrame(makeFlyWhenMouseDown);
    };

    if (isMouseDown) {
        makeFlyWhenMouseDown();
    }
    else {
        makeFly();
    }
};

const lockKeyboard = (isLocked: boolean): void => {
    if (isLocked) {
        document.removeEventListener('keypress', handleKeyPress);
    }
    else {
        document.addEventListener('keypress', handleKeyPress);
    }
}

const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
        makeBirdFly();
    }
};

const handleClick = (event: MouseEvent) => {
    makeBirdFly();
};

let intervalMouseDown: any;
let timeoutMouseDown: any;
const handleMouseDown = (event: any) => {
    // affter a custom seccond, run fly
    timeoutMouseDown = setTimeout(() => {
        isMouseUp = false;
        makeBirdFly(true);
    }, 300);
};

const handleMouseUp = (event: any) => {
    clearTimeout(timeoutMouseDown);
    isMouseUp = true;
};