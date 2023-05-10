import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createStyles, makeStyles } from "@mui/styles";
import { Modal, Box } from "@mui/material";
import Background from "../Background";
import Foregound from "../Foreground";
import RankingModal from "../RankingModal";
import GuideModal from "../GuideModal";
import bgImg from "../../assets/images/bg.png";
import birdImg from "../../assets/images/bird.png";
import logoImg from "../../assets/images/logo.png";
import { useAppDispatch } from "../../redux/hooks";
import { clearState } from "../../redux/utilActions";
import { setGameStatus } from "../../redux/slices/gameStatusSlice";

export default function HomeScreen() {
    const [openRanking, setOpenRanking] = useState<boolean>(false);
    const [openGuide, setOpenGuide] = useState<boolean>(false);
    const navigateTo = useNavigate();
    const dispatch = useAppDispatch();

    const classes = useStyles();

    // useEffect(() => {
    //     dispatch(clearState());
    //     dispatch(setGameStatus(2));
    // }, []);

    const handleCloseRankingModal = () => {
        setOpenRanking(false);
    };

    const handleCloseGuideModal = () => {
        setOpenGuide(false);
    };

    return (
        <>
            <RankingModal isOpen={openRanking} handleClose={handleCloseRankingModal} />
            <GuideModal isOpen={openGuide} handleClose={handleCloseGuideModal} />
            <div className={classes.root}>
                <div className="homeScreen__translate">
                    <Background></Background>
                    <Foregound></Foregound>
                </div>
                <Box sx={style}>
                    <div className="content">
                        <div className="content__logo"></div>
                        <div className="content__bird"></div>
                    </div>
                    <div className="btn">
                        <button className="btn__play" onClick={() => { navigateTo("/play") }}>VÀO GAME</button>
                        <button className="btn__rank" onClick={() => { setOpenRanking(true) }}>BẢNG XẾP HẠNG</button>
                        <button className="btn__guide" onClick={() => { setOpenGuide(true) }}>HƯỚNG DẪN</button>
                    </div>
                </Box>
            </div>
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: 200,
    bgcolor: 'transparent',
    border: 'unset',
    // boxShadow: 24,
    padding: 0,
};

const useStyles = makeStyles({
    "@keyframes contentEffect": {
        "0%": {
            transform: "translateY(0)"
        },
        "25%": {
            transform: "translateY(-5%)"
        },
        "50%": {
            transform: "translateY(0)"
        },
        "75%": {
            transform: "translateY(5%)"
        },
        "100%": {
            transform: "translateY(0)"
        }
    },
    "@keyframes translateEffect": {
        "0%": {
            transform: "translateX(0)"
        },
        "100%": {
            transform: "translateX(-50%)"
        }
    },
    root: {
        width: "100vw",
        height: "100vh",
        // background: `url(${bgImg})`,
        // backgroundSize: "contain",
        // backgroundRepeat: "repeat-x",

        "& .homeScreen__translate": {
            width: 10000,
            height: "100%",
            animation: "$translateEffect 30s infinite linear",
        },
        "& .MuiBox-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: 4,
            userSelect: "none",

            "& .btn": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",

            },
            "& .btn button": {
                fontFamily: "VT323",
                fontSize: 22,
                border: "3px solid #FFFFFF",
                borderRadius: 6,
                backgroundColor: "#E06119",
                color: "#FFFFFF",
                height: 50,
                width: 140,
                lineHeight: 0,
                margin: "6px 0",
                cursor: "pointer",
            },
            "& .btn button:active": {
                backgroundColor: "#E37435",
                borderStyle: "inset",
            },
        },
        "& .content": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "$contentEffect 1.5s infinite linear",
        },
        "& .content__logo": {
            width: 325,
            height: 125,
            background: `url(${logoImg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        },
        "& .content__bird": {
            width: 38,
            height: 26,
            marginLeft: 6,
            background: `url(${birdImg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        },
    },
});