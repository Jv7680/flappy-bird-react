import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import enterImg from "../../assets/images/enterIcon.png";
import mouseImg from "../../assets/images/mouseIcon.png";
import mouseHoldImg from "../../assets/images/mouseHoldIcon.png";
import tapImg from "../../assets/images/tapScreen.png";
import tapHoldImg from "../../assets/images/tapHoldScreen.png";
import spaceImg from "../../assets/images/spaceIcon.png";
import escImg from "../../assets/images/escIcon.png";
import rImg from "../../assets/images/rIcon.png";
import { useTranslation } from 'react-i18next';

interface GuideModalProps {
    isOpen: boolean;
    handleClose: Function;
}

export default function GuideModal(props: GuideModalProps) {
    const { t } = useTranslation(["home"]);
    const classes = useStyles();

    return (
        <>
            <Modal
                open={props.isOpen}
                disableAutoFocus
                onClose={() => { props.handleClose() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={classes.root}>
                        <div className="title">
                            {t('home:guide.title')}
                        </div>
                        <div className="close">
                            <button title="" onClick={() => props.handleClose()}><CloseIcon fontSize="inherit"></CloseIcon></button>
                        </div>
                        <div className="content">
                            <span>{t('home:guide.onComputer')}</span>
                            <div>
                                {t('home:guide.actionMakeBirdFly')}
                                <ul>
                                    <li>
                                        Enter <img src={enterImg} alt="notFound" />
                                    </li>
                                    <li>
                                        Space <img src={spaceImg} alt="notFound" />
                                    </li>
                                    <li>
                                        {t('home:guide.mouseClick')} <img src={mouseImg} alt="notFound" />
                                    </li>
                                    <li>
                                        {t('home:guide.mouseHoldClick')} <img src={mouseHoldImg} alt="notFound" />
                                    </li>
                                </ul>
                                {t('home:guide.actionPausedResumeGame')}
                                <ul>
                                    <li>
                                        Escape <img src={escImg} alt="notFound" /> {t('home:guide.pauseGame')}
                                    </li>
                                    <li>
                                        R <img src={rImg} alt="notFound" style={{ width: 14 }} /> {t('home:guide.resumeGame')}
                                    </li>
                                </ul>
                            </div>
                            <span>{t('home:guide.onMobile')}</span>
                            <div>
                                <ul>
                                    <li>
                                        {t('home:guide.tapScreen')} <img src={tapImg} alt="notFound" />
                                    </li>
                                    <li>
                                        {t('home:guide.tapHoldScreen')} <img src={tapHoldImg} alt="notFound" />
                                    </li>
                                </ul>
                            </div>
                            <div>{t('home:guide.hardMode')}</div>
                        </div>
                    </div>
                </Box>
            </Modal >
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    bgcolor: 'transparent',
    border: 'unset',
    boxShadow: 24,
    padding: 0,
};

const useStyles = makeStyles({
    root: {
        position: "relative",
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
        color: "#523747",
        fontFamily: 'VT323',
        fontSize: 20,

        "& .title": {
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
        },
        "& .close": {
            position: "absolute",
            top: 0,
            right: 0,
        },
        "& .close button": {
            "-webkit-tap-highlight-color": "transparent",
            backgroundColor: "#D2AA4F",
            color: "#523747",
            outline: "none",
            borderRadius: 4,
            cursor: "pointer",
            margin: 4,
            fontSize: 16,
            padding: 4,
            lineHeight: 0,
        },
        "& .close button:active": {
            borderStyle: "inset",
        },

        "& .content": {
            margin: "40px 8px 4px 8px",

            "& span": {

            },
            "& div": {
                margin: "4px 0 16px 0",
            },
            "& ul": {
                margin: "4px 0",
            },
            "& li": {

                "& img": {
                    width: 18,
                },
            },
        },
    },
});