import { useEffect } from "react";
import scoreSound from "../assets/sounds/score.mp3";
import { useAppSelector } from "../redux/hooks";
import { selectScore } from "../redux/slices/scoreSlice";
import { SettingUtils } from "../utils/settingUtils";
import { selectSetting } from "../redux/slices/settingSlice";
import { makeStyles } from "@mui/styles";

const scoreAudio = new Audio();
scoreAudio.src = scoreSound;

export default function Score() {
    const scoreState = useAppSelector(selectScore);
    const settingState = useAppSelector(selectSetting);
    const classes = useStyles();

    useEffect(() => {
        if (scoreState > 0) {
            SettingUtils.getSoundBySetting(settingState.sound) && scoreAudio.play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scoreState]);

    return (
        <>
            <div className={"score " + classes.root}>{scoreState}</div>
        </>
    )
};

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: "calc(100vw / 2)",
        top: 50,
        transform: "translateX(-50%)",
        fontFamily: "VT323",
        fontSize: 50,
        color: "#FFFFFF",
        userSelect: "none",
    }
});