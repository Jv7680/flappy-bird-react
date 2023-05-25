
import { makeStyles } from "@mui/styles";
import { useAppSelector } from "../redux/hooks";
import { selectBird } from "../redux/slices/birdSlice";
import { selectSetting } from "../redux/slices/settingSlice";
import { SettingUtils } from "../utils/settingUtils";

export default function Bird() {
    const birdState = useAppSelector(selectBird);
    const settingState = useAppSelector(selectSetting);
    const classes = useStyles();

    return (
        <>
            <div
                className={"bird " + classes.root}
                style={{
                    width: birdState.width,
                    height: birdState.height,
                    left: birdState.x - birdState.width,
                    top: birdState.y,
                    transform: `rotate(${birdState.r}deg)`,
                    background: `url(${SettingUtils.getBirdImgBySetting(settingState.birdType)})`,
                }}
            >
            </div>
        </>
    )
};

const useStyles = makeStyles({
    root: {
        position: 'absolute',
    }
});