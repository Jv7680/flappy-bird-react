import { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box } from "@mui/material";

interface RankingModalProps {
    isOpen: boolean;
    handleClose: Function;
}

export default function RankingModal(props: RankingModalProps) {
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
                            BẢNG XẾP HẠNG
                        </div>
                        <div className="close">
                            <button title="" onClick={() => props.handleClose()}><CloseIcon fontSize="inherit"></CloseIcon></button>
                        </div>
                        <div className="content">
                            <span>ĐANG CẬP NHẬT...</span>
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
        },
    },
});