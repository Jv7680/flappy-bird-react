import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import { selectSetting } from "../../redux/slices/settingSlice";
import { SettingUtils } from "../../utils/functions/settingUtils";

import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import logoImg from "../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/slices/userSlice";
import Background from "../Background";
import Foregound from "../Foreground";
import SettingButton from "../buttons/SettingButton";
import GuideModal from "../modals/GuideModal";
import RankingModal from "../modals/RankingModal";
import SettingModal from "../modals/SettingModal";
import { handleSetTabValue } from "../modals/SettingModal";

export default function HomeScreen() {
    const settingState = useAppSelector(selectSetting);
    const [openRanking, setOpenRanking] = useState<boolean>(false);
    const [openGuide, setOpenGuide] = useState<boolean>(false);
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const userState = useAppSelector(selectUser);
    const { t } = useTranslation(["home", "alert"]);
    const navigateTo = useNavigate();
    // eslint-disable-next-line
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const handleCloseRankingModal = () => {
        setOpenRanking(false);
    };

    const handleCloseGuideModal = () => {
        setOpenGuide(false);
    };

    const handleCloseSettingModal = () => {
        setOpenSetting(false);
    };

    const handlePlay = () => {
        if (userState.fullName.length === 0) {
            Swal.fire({
                title: t("alert:playButNotLogin.title"),
                text: t("alert:playButNotLogin.content"),
                icon: "warning",
                allowOutsideClick: false,
                showDenyButton: true,
                showCloseButton: true,
                confirmButtonText: t("alert:playButNotLogin.btnConfirmText"),
                denyButtonText: t("alert:playButNotLogin.btnCancelText"),
                hideClass: {
                    backdrop: "swal2-noanimation",
                    popup: "",
                    icon: ""
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigateTo("/play");
                }
                else if (result.isDenied) {
                    setOpenSetting(true);
                    handleSetTabValue(1);
                }
            });
        }
        else {
            navigateTo("/play");
        }
    };

    return (
        <>
            <RankingModal isOpen={openRanking} handleClose={handleCloseRankingModal} />
            <GuideModal isOpen={openGuide} handleClose={handleCloseGuideModal} />
            <SettingModal isOpen={openSetting} handleClose={handleCloseSettingModal} />
            <div className={classes.userFullName}>
                {userState.fullName.length > 0 && `${t("home:hello")} ${userState.fullName} ^_^`}
            </div>
            <div className={classes.root}>
                <div className="homeScreen__translate">
                    <Background></Background>
                    <Foregound></Foregound>
                </div>
                <Box sx={style}>
                    <div className="content">
                        <div className="content__logo"></div>
                        <div className="content__bird" style={{ background: `url(${SettingUtils.getBirdImgBySetting(settingState.birdType)})`, }}></div>
                    </div>
                    <div className="btn">
                        <button className="btn__play" onClick={() => { handlePlay() }}>{t("home:play")}</button>
                        <button className="btn__rank" onClick={() => { setOpenRanking(true) }}>{t("home:leaderboard.title")}</button>
                        <button className="btn__guide" onClick={() => { setOpenGuide(true) }}>{t("home:guide.title")}</button>

                    </div>
                </Box>
            </div>
            <SettingButton onClick={() => { setOpenSetting(true) }} />
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
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

        "& .homeScreen__translate": {
            width: 100000,
            height: "100%",
            animation: "$translateEffect 300s infinite linear",
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
            "& .btn > button": {
                "-webkit-tap-highlight-color": "transparent",
                fontFamily: "VT323",
                fontSize: 22,
                border: "3px solid #FFFFFF",
                borderRadius: 6,
                backgroundColor: "#E06119",
                color: "#FFFFFF",
                height: 50,
                width: 160,
                lineHeight: 0,
                margin: "6px 0",
                cursor: "pointer",
            },
            "& .btn > button:active": {
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
            '@media (max-width: 400px)': {
                width: 230,
                height: 80,
            },
            '@media (max-width: 300px)': {
                width: 220,
                height: 80,
            },
        },
        "& .content__bird": {
            width: 38,
            height: 26,
            marginLeft: 6,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        },
    },
    userFullName: {
        position: "absolute",
        top: 8,
        left: 12,
        fontSize: '20px',
        width: 'max-content',
        color: "#ffffff",
        zIndex: 10,
    },
});