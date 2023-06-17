import { useEffect } from "react";
import scoreSound from "../assets/sounds/score.mp3";
import newBestScoreSound from "../assets/sounds/newBestScore.mp3";
import { useAppSelector } from "../redux/hooks";
import { selectScore } from "../redux/slices/scoreSlice";
import { SettingUtils } from "../utils/functions/settingUtils";
import { FunctionUtils } from "../utils/functions/functionUtils";
import { selectSetting } from "../redux/slices/settingSlice";
import { makeStyles } from "@mui/styles";
import { selectUser } from "../redux/slices/userSlice";

const scoreAudio = new Audio();
scoreAudio.src = scoreSound;

const newBestScoreAudio = new Audio();
newBestScoreAudio.src = newBestScoreSound;
let countPlayNewBestScoreAudio: number = 0;

export default function Score() {
    const scoreState = useAppSelector(selectScore);
    const settingState = useAppSelector(selectSetting);
    const userState = useAppSelector(selectUser);
    const classes = useStyles();

    useEffect(() => {
        if (scoreState > 0) {
            SettingUtils.getSoundBySetting(settingState.sound) && scoreAudio.play();
        }

        if (userState.fullName.length > 0 && countPlayNewBestScoreAudio === 0 && userState.bestScore > 0 && scoreState === userState.bestScore + 1) {
            SettingUtils.getSoundBySetting(settingState.sound) && newBestScoreAudio.play();
            FunctionUtils.runConfetti();
            countPlayNewBestScoreAudio++;
        }

        if (scoreState === 0) {
            countPlayNewBestScoreAudio = 0;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scoreState]);

    useEffect(() => {
        return () => {
            countPlayNewBestScoreAudio = 0;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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