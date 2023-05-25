import { makeStyles } from "@mui/styles";
import { useAppSelector } from "../redux/hooks";
import { selectSetting } from "../redux/slices/settingSlice";
import { SettingUtils } from "../utils/settingUtils";

export default function Background() {
    const settingState = useAppSelector(selectSetting);
    const classes = useStyles();
    return (
        <>
            <div className={"background " + classes.root} style={{ background: `url(${SettingUtils.getThemeImgBySetting(settingState.theme)[0]})` }}></div>
        </>
    )
};

const useStyles = makeStyles({
    root: {
        position: 'relative',
        height: "100%",
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        overflow: 'hidden',
    }
});