import PauseIcon from '@mui/icons-material/Pause';
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { setGameStatus } from "../../redux/slices/gameStatusSlice";
import { store } from "../../redux/store";

export default function PauseButton() {
    const classes = useStyles();

    useEffect(() => {
        document.querySelector(".btn-pause path")?.classList.add("btn-pause");
    }, []);

    const handlePause = (event: any) => {
        event.target.blur();
        store.dispatch(setGameStatus(3));
    };

    return (
        <>
            <div className={classes.root} >
                <button className="btn-pause" title="" onClick={handlePause}><PauseIcon className="btn-pause" fontSize="inherit"></PauseIcon></button>
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        position: "absolute",
        top: 8,
        left: "calc(100vw - 48px)",
        border: "unset",
        backgroundColor: "unset",
        color: "#FFFFFF",
        fontFamily: 'VT323',
        zIndex: 3,

        "& button": {
            "-webkit-tap-highlight-color": "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            width: 40,
            height: 26,
            cursor: "pointer",
            color: "#FFFFFF",
            backgroundColor: "#E6611E",
            borderRadius: 4,
            border: "3px solid #FFFFFF",
        },
        "& button:active": {
            borderStyle: "inset",
            backgroundColor: "#E37435",
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
