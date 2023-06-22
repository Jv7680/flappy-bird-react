import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from 'react-i18next';
import { selectRankList } from '../../redux/slices/rankListSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/hooks';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface RankingModalProps {
    isOpen: boolean;
    handleClose: Function;
}

let userRank: number = 0;
export default function RankingModal(props: RankingModalProps) {
    const { t } = useTranslation(["home"]);
    const rankListState = useAppSelector(selectRankList);
    const userState = useAppSelector(selectUser);
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
                            {t('home:leaderboard.title')}
                        </div>
                        <div className="close">
                            <button title="" onClick={() => props.handleClose()}><CloseIcon fontSize="inherit"></CloseIcon></button>
                        </div>
                        <div className="content">
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead style={{ backgroundColor: "#D2AA4F", }}>
                                    <tr>
                                        <th style={{ width: "20%", borderRight: "2px solid #dbda96" }}>{t('home:rankModal.rank')}</th>
                                        <th style={{ textAlign: "left", paddingLeft: 20 }}>{t('home:rankModal.name')}</th>
                                        <th style={{ width: "20%", borderLeft: "2px solid #dbda96" }}>{t('home:rankModal.score')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rankListState.length > 0 &&
                                        <>
                                            {
                                                rankListState.map((item, index) => {
                                                    userState.fullName === item.fullName && (userRank = index + 1)
                                                    return (
                                                        <tr
                                                            key={index}
                                                            style={{ height: 32, borderBottom: index === rankListState.length - 1 ? "unset" : "1px solid #D2AA4F", backgroundColor: userState.fullName === item.fullName ? "#d9bc79" : "unset" }}
                                                        >
                                                            <td style={{ textAlign: "center" }}>
                                                                <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    {index + 1 === 1 && <EmojiEventsIcon fontSize="inherit" htmlColor="#F7B934" />}
                                                                    {index + 1 === 2 && <EmojiEventsIcon fontSize="inherit" htmlColor="#A5A5A5" />}
                                                                    {index + 1 === 3 && <EmojiEventsIcon fontSize="inherit" htmlColor="#FA9366" />}
                                                                    {index + 1}
                                                                </span>
                                                            </td>
                                                            <td style={{ textAlign: "left", paddingLeft: 20 }}>{item.fullName}</td>
                                                            <td style={{ textAlign: "center" }}>{item.bestScore}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </>
                                    }
                                </tbody>
                            </table>

                        </div>
                        {
                            userState.fullName.length > 0 &&
                            <>
                                <div style={{ height: 23, width: "100%" }}></div>
                                <div className="userRank">
                                    {t('home:rankModal.currentRank') + " " + userRank}
                                </div>
                            </>
                        }
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
    width: 300,
    bgcolor: 'transparent',
    border: 'unset',
    boxShadow: 24,
    padding: 0,
    maxHeight: '80%',
    overflow: 'auto',
    '@media (max-width: 450px)': {
        width: 300,
    },
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
            margin: "40px 0 0 0",
            paddingBottom: 4,
            width: "100%",
            height: 300,
            overflow: "auto",
        },
        "& .userRank": {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: '4px 4px 4px 4px',
            boxSizing: 'border-box',
            backgroundColor: '#d9bc79',
        },
    },
});