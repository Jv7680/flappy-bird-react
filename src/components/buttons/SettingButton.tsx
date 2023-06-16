import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

interface SettingButtonProps {
    onClick: Function,
};

export default function SettingButton(props: SettingButtonProps) {
    const { t } = useTranslation(["home", "validate"]);
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
                <button className="btn-pause" title="" onClick={handleClick}><SettingsIcon className="btn-pause" fontSize="inherit"></SettingsIcon><span style={{ fontFamily: "VT323", fontSize: 22 }}>{t('home:setting.button')}</span></button>
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        position: "absolute",
        left: 12,
        bottom: 2,
        marginTop: 12,
        border: "unset",
        backgroundColor: "unset",
        color: "#FFFFFF",
        fontFamily: 'VT323',
        zIndex: 3,

        "& button": {
            padding: "1px 0",
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
            letterSpacing: 1,
        },
        "& button:hover": {
            textDecoration: "underline",
        },
    },
});


