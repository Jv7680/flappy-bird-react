import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

interface SettingButtonProps {
    onClick: Function,
};

export default function SettingButton(props: SettingButtonProps) {
    const classes = useStyles();

    useEffect(() => {
        document.querySelector(".btn-pause path")?.classList.add("btn-pause");
    }, []);

    const handleClick = (event: any) => {
        event.target.blur();
        props.onClick();
    };

    return (
        <>
            <div className={classes.root} >
                <button className="btn-pause" title="" onClick={handleClick}><SettingsIcon className="btn-pause" fontSize="inherit"></SettingsIcon> <span style={{ fontFamily: "VT323", fontSize: 20 }}>Cài đặt</span></button>
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        position: "absolute",
        top: 8,
        right: 8,
        border: "unset",
        backgroundColor: "unset",
        color: "#FFFFFF",
        fontFamily: 'VT323',
        zIndex: 3,

        "& button": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            height: 26,
            cursor: "pointer",
            color: "#FFFFFF",
            backgroundColor: "transparent",
            borderRadius: 4,
            border: "unset",
            outline: "none",
        },
        "& button:hover": {
            // color: "#e76a23",

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


