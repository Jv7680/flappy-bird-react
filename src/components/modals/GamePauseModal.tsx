import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectScore } from "../../redux/slices/scoreSlice";
import { resetState } from "../../redux/utilActions";
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../redux/slices/userSlice';
import { setGenerateFirstPipeAtX } from '../../redux/slices/pipeSlice';
import { setBirdY } from '../../redux/slices/birdSlice';

interface GamePauseModalProps {
    isOpen: boolean;
    restartWhenGamePause: Function;
    restart: Function;
    continue: Function;
}

export default function GamePauseModal(props: GamePauseModalProps) {
    const dispatch = useAppDispatch();
    const scoreState = useAppSelector(selectScore);
    const userState = useAppSelector(selectUser);
    const navigateTo = useNavigate();
    const { t } = useTranslation(["play"]);
    const classes = useStyles();

    const handleRestart = () => {
        props.restartWhenGamePause();

        let translate = document.getElementsByClassName("playScreen__translate")[0] as HTMLDivElement;
        translate.style.transform = `translateX(0px)`;

        dispatch(resetState());
        dispatch(setGenerateFirstPipeAtX(Math.ceil(window.innerWidth / 10) * 10 + 100));
        dispatch(setBirdY(Math.ceil(window.innerHeight * 0.8 / 3)));

        setTimeout(() => {
            props.restart(dispatch);
        }, 400);
    };

    const handleContinue = () => {
        props.continue(false);
    };

    const handleGoHome = () => {
        navigateTo("/");
        dispatch(resetState());
    };

    return (
        <>
            <Modal
                open={props.isOpen}
                disableAutoFocus
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modal}
            >
                <Box sx={style}>
                    <div className={classes.gamePause}>{t('play:gamePause')}</div>
                    <div className={classes.root}>
                        <div className="score">
                            <span>{t('play:score')} <br /> {scoreState}</span>
                            <span style={{ display: userState.fullName.length > 0 ? "unset" : "none" }}>{t('play:bestScore')} <br /> {userState.bestScore} </span>
                        </div>
                        <div className="btn">
                            <button title="" onClick={() => handleContinue()}><ArrowRightIcon fontSize="inherit"></ArrowRightIcon></button>
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
    transform: 'translateX(-50%)',
    minWidth: 200,
    bgcolor: 'transparent',
    border: 'unset',
    boxShadow: 24,
    padding: 0,
};

const useStyles = makeStyles({
    "@keyframes translateBoxEffect": {
        "0%": {
            transform: "translate(-50%, 1000px)"
        },
        "100%": {
            transform: "translate(-50%, 0)"
        }
    },
    modal: {
        "& .MuiBox-root": {
            // animation: "$translateBoxEffect 0.8s ease-out",
        },
    },
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
            fontFamily: "VT323",
            fontSize: 30,
            color: "#CBAD56",
        },

        "& .btn button": {
            "-webkit-tap-highlight-color": "transparent",
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
    gamePause: {
        position: "absolute",
        width: "100%",
        top: -60,
        left: 0,
        fontFamily: 'VT323',
        fontSize: 44,
        fontWeight: "bold",
        color: "#F28634",
        textShadow: "-1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF",
        textAlign: "center",
    },
});