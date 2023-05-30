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
import GameOverModal from "../modals/GameOverModal";
import GamePauseModal from "../modals/GamePauseModal";
import PauseButton from "../buttons/PauseButton";
import Pipe from "../Pipe";
import Score from "../Score";
import { SettingUtils } from "../../utils/functions/settingUtils";
import { FunctionUtils } from "../../utils/functions/functionUtils";

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
        document.addEventListener("visibilitychange", handleVisibilitychange);
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);

        let playScreen = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
        playScreen.addEventListener('click', handleClick);

        playScreen.addEventListener('mousedown', handleMouseDown);
        playScreen.addEventListener('mouseup', handleMouseUp);

        // for mobile device
        playScreen.addEventListener('touchstart', handleMouseDown);
        playScreen.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilitychange);
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('keyup', handleKeyUp);

            playScreen.removeEventListener('click', handleClick);

            playScreen.removeEventListener('mousedown', handleMouseDown);
            playScreen.removeEventListener('mouseup', handleMouseUp);

            playScreen.removeEventListener('touchstart', handleMouseDown);
            playScreen.removeEventListener('touchend', handleMouseUp);

            // stop the game loop
            whenGameOver(dispatch, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // remove context menu in browser when hold click on background and foreground
    useEffect(() => {
        let background = document.getElementsByClassName("background")[0] as HTMLDivElement;
        background.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };

        let foreground = document.getElementsByClassName("foreground")[0] as HTMLDivElement;
        foreground.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <PauseButton />
            {gameStatusState === 2 && <GameOverModal isOpen={true} restart={startGame}></GameOverModal>}
            {gameStatusState === 3 && <GamePauseModal isOpen={true} restart={startGame} restartWhenGamePause={restartWhenGamePause} continue={pauseGame}></GamePauseModal>}
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

const pauseGame = (pause: boolean) => {
    if (pause) {
        store.dispatch(setGameStatus(3));
    }
    else {
        store.dispatch(setGameStatus(1));
    }
};

const startGame = (dispatch: Function) => {
    xT = 0;
    xP = 0;

    // playing
    store.dispatch(setGameStatus(1));

    lockKeyboard(false);

    intervalGeneratePipes = setInterval(() => {
        // not generate when the game paused
        if (store.getState().gameStatus !== 3) {
            dispatch(generate());
        }
    }, 600);

    birdFallLoop();

    translateLoop();
};

const translateLoop = () => {
    if (store.getState().gameStatus === 2 || store.getState().gameStatus === 4) {
        return;
    }

    if (store.getState().gameStatus !== 3) {
        // 2: Easy, 5: Hard (only true when FPS is 60)
        let different = +(120 / store.getState().fps).toFixed(4);
        xT -= different;
        xP += different;
        let playScreen = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
        let translate = document.getElementsByClassName("playScreen__translate")[0] as HTMLDivElement;

        if (playScreen && translate) {
            translate.style.transform = `translateX(${xT}px)`;
            playScreen.style.width = `calc(200vw + ${xP}px)`;
        }

        checkGameOver(store.dispatch, xT);
    }

    FunctionUtils.requestAnimationFrame(translateLoop);
};

const birdFallLoop = () => {
    // let newFall = Math.round(store.getState().fps / 30);
    let newFall = +(120 / store.getState().fps).toFixed(4);

    if (store.getState().gameStatus === 2 || store.getState().gameStatus === 4) {
        return;
    }

    if (store.getState().gameStatus !== 3) {
        store.dispatch(fall(newFall));
    }

    FunctionUtils.requestAnimationFrame(birdFallLoop);
};

// check game over
const checkGameOver = (dispatch: any, left: number) => {
    let { bird: birdState, pipe: pipeState } = store.getState();
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
    let playScreenHeight = document.getElementsByClassName("playScreen")[0] as HTMLDivElement;
    let foregroundHeight = document.getElementsByClassName("foreground")[0] as HTMLDivElement;
    if (birdState.y + birdState.height >= Math.ceil(playScreenHeight.offsetHeight - foregroundHeight.offsetHeight)) {
        dispatch(setBirdY(Math.ceil(playScreenHeight.offsetHeight - foregroundHeight.offsetHeight) - birdState.height));

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

    // game over
    dispatch(setGameStatus(2));

    if (playHitAudio) {
        SettingUtils.getSoundBySetting(store.getState().setting.sound) && hitAudio.play();
    }
    else {
        // reset when this component unmount
        dispatch(resetState());
    }

    return false;
};

const restartWhenGamePause = () => {
    lockKeyboard(true);

    clearInterval(intervalGeneratePipes);
    clearTimeout(timeoutMouseDown);
    clearInterval(intervalMouseDown);

    // game over
    store.dispatch(setGameStatus(4));
};

let flyDispatchCount: number = 0;
let isMouseUp: boolean = false;
const makeBirdFly = (isMouseDown: boolean = false) => {
    // let flyTo = +(360 / store.getState().fps).toFixed(4);

    const makeFly = () => {
        flyDispatchCount++;
        let frameUsed = +((store.getState().fps) * 9 / 60).toFixed(4);

        if (flyDispatchCount > frameUsed || store.getState().gameStatus === 2 || store.getState().gameStatus === 4) {
            flyDispatchCount = 0;
            return;
        }

        if (store.getState().gameStatus !== 3) {
            // fly up 36px with 60FPS, so each frame is 4px for 9 frame
            let newFall = +(120 / store.getState().fps).toFixed(4);
            let flyEachFrame = +(240 / store.getState().fps).toFixed(4);
            let flyTo = +(newFall + flyEachFrame).toFixed(4);

            store.dispatch(fly(flyTo));
            SettingUtils.getSoundBySetting(store.getState().setting.sound) && flyAudio.play();
        }

        FunctionUtils.requestAnimationFrame(makeFly);
    };

    const makeFlyWhenMouseDown = () => {
        if (isMouseUp || store.getState().gameStatus === 2 || store.getState().gameStatus === 4) {
            return;
        }

        if (store.getState().gameStatus !== 3) {
            // fly up 36px
            let newFall = +(120 / store.getState().fps).toFixed(4);
            let flyEachFrame = +(240 / store.getState().fps).toFixed(4);
            let flyTo = +(newFall + flyEachFrame).toFixed(4);

            store.dispatch(fly(flyTo));
            SettingUtils.getSoundBySetting(store.getState().setting.sound) && flyAudio.play();
        }

        FunctionUtils.requestAnimationFrame(makeFlyWhenMouseDown);
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

const handleVisibilitychange = (event: any) => {
    if (document.visibilityState === "hidden") {
        pauseGame(true)
    } else if (document.visibilityState === "visible") {
        console.log("user back");
    }
};

const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
        makeBirdFly();
    }

    if (event.code === "KeyR") {
        pauseGame(false);
    }
};

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
        pauseGame(true)
    }
};

let clickTime: number;
const handleClick = (event: any) => {
    // prevent click when user used mousedown event
    if (performance.now() - clickTime > 300) {
        return;
    }

    if (Array.from(event.target.classList).find(item => item === "btn-pause")) {
        return;
    }

    makeBirdFly();
};

let intervalMouseDown: any;
let timeoutMouseDown: any;
const handleMouseDown = (event: any) => {
    clickTime = performance.now();
    if (Array.from(event.target.classList).find(item => item === "btn-pause")) {
        return;
    }

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