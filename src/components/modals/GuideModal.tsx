import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import enterImg from "../../assets/images/enterIcon.png";
import mouseImg from "../../assets/images/mouseIcon.png";
import spaceImg from "../../assets/images/spaceIcon.png";

interface GuideModalProps {
    isOpen: boolean;
    handleClose: Function;
}

export default function GuideModal(props: GuideModalProps) {
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
                            HƯỚNG DẪN
                        </div>
                        <div className="close">
                            <button title="" onClick={() => props.handleClose()}><CloseIcon fontSize="inherit"></CloseIcon></button>
                        </div>
                        <div className="content">
                            <span>TRÊN MÁY TÍNH</span>
                            <div>
                                Sử dụng các hành động sau để làm chú chim bay lên.
                                <ul>
                                    <li>
                                        Enter <img src={enterImg} alt="notFound" />
                                    </li>
                                    <li>
                                        Space <img src={spaceImg} alt="notFound" />
                                    </li>
                                    <li>
                                        Click chuột <img src={mouseImg} alt="notFound" />
                                    </li>
                                </ul>
                            </div>
                            <span>TRÊN THIẾT BỊ DI ĐỘNG</span>
                            <div>
                                Tap vào màn hình để làm chú chim bay lên.
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal >
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%)',
    minWidth: 300,
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
            margin: "40px 0 4px 0",

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