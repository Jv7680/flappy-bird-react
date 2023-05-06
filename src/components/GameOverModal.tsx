import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Grid from '@mui/material/Grid';
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setGameStatus } from "../redux/slices/gameStatusSlice";
import { selectScore } from "../redux/slices/scoreSlice";
import { clearState } from "../redux/utilActions";
import { Modal, Box } from "@mui/material";
import gameOverImg from "../assets/images/gameOver.png";

interface GameOverModalProps {
    isOpen: boolean;
    restart: Function;
}

export default function GameOverModal(props: GameOverModalProps) {
    const dispatch = useAppDispatch();
    const scoreState = useAppSelector(selectScore);
    const navigateTo = useNavigate();
    const classes = useStyles();

    const handleRestart = () => {
        let translate = document.getElementsByClassName("playScreen__translate")[0] as HTMLDivElement;
        let bird = document.getElementsByClassName("bird")[0] as HTMLDivElement;

        translate.style.transition = 'left 0ms linear';
        // translate.style.left = "0px";
        translate.style.left = "translateX(0px)";
        bird.style.transition = 'transform 20ms ease-in, top 0ms linear';
        // bird.style.transition = 'transform 0ms ease-in';

        dispatch(setGameStatus(1));
        dispatch(clearState());

        setTimeout(() => {
            props.restart(dispatch);
        }, 200);
    };

    const handleGoHome = () => {
        navigateTo("/");
        dispatch(clearState());
    };

    return (
        <>
            <Modal
                open={props.isOpen}
                disableAutoFocus
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={classes.gameOver}></div>
                    <div className={classes.root}>
                        <div className="score">
                            <span>SCORE <br /> {scoreState}</span>
                            <span>BEST <br /> {999999} </span>
                        </div>
                        <div className="btn">
                            <button title="" onClick={() => handleRestart()}><ReplayIcon fontSize="inherit"></ReplayIcon></button>
                            <button title="" onClick={() => handleGoHome()}><HomeIcon fontSize="inherit"></HomeIcon></button>
                        </div>
                    </div>
                </Box>
            </Modal >
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '26%',
    left: '50%',
    transform: 'translate(-50%)',
    minWidth: 200,
    bgcolor: 'transparent',
    border: 'unset',
    boxShadow: 24,
    padding: 0,
};

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "auto",
        padding: 4,
        border: "4px solid #D2AA4F",
        borderStyle: "inset",
        borderRadius: 6,
        backgroundColor: "#DBDA96",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        "& .score": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 4,
            userSelect: "none",
        },

        "& .score span": {
            display: "block",
            margin: "0 16px 4px",
            textAlign: "center",
            fontFamily: "FlappyBird",
            fontSize: 30,
            color: "#CBAD56",
        },

        "& .btn button": {
            backgroundColor: "#D2AA4F",
            color: "#523747",
            outline: "none",
            borderRadius: 4,
            cursor: "pointer",
            margin: 4,
            fontSize: 30,
            padding: 4,
            lineHeight: 0,
        },
        "& .btn button:active": {
            borderStyle: "inset",
        },
    },
    gameOver: {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `url(${gameOverImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        top: 0,
        left: 0,
        transform: "translateY(-56%)",
    },
});