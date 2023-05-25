import { makeStyles } from "@mui/styles";
import { useAppSelector } from "../redux/hooks";
import { selectSetting } from "../redux/slices/settingSlice";
import { SettingUtils } from "../utils/settingUtils";

export default function Foregound() {
    const settingState = useAppSelector(selectSetting);
    const classes = useStyles();
    return (
        <>
            <div className={"foreground " + classes.root} style={{ background: `url(${SettingUtils.getThemeImgBySetting(settingState.theme)[1]})` }}></div>
        </>
    )
};

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: "20vh",
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
    }
});