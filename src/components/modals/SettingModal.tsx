import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectSetting, setBirdTypeSetting, setSoundSetting, setThemeSetting } from '../../redux/slices/settingSlice';
import { LocalStorage } from '../../services/storageService';
import { SettingUtils } from '../../utils/settingUtils';

interface SettingModalProps {
    isOpen: boolean;
    handleClose: Function;
};

export default function SettingModal(props: SettingModalProps) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const settingState = useAppSelector(selectSetting);
    const [tabValue, setTabValue] = useState(0);
    useEffect(() => {
        LocalStorage.setUserSetting(JSON.stringify(settingState));
    }, [settingState]);

    const handleChangeSoundSetting = (event: any) => {
        dispatch(setSoundSetting(+event.target.value));
    };

    const handleChangeThemeSetting = (event: any) => {
        dispatch(setThemeSetting(+event.target.value));
    };

    const handleChangeBirdTypeSetting = (event: any) => {
        dispatch(setBirdTypeSetting(+event.target.id));
    };

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
                            CÀI ĐẶT
                        </div>
                        <div className="close">
                            <button title="" onClick={() => props.handleClose()}><CloseIcon fontSize="inherit"></CloseIcon></button>
                        </div>
                        <div className="content">
                            <Tabs
                                onChange={(event, newValue) => { setTabValue(newValue); }}
                                value={tabValue}
                                aria-label="Tabs where selection follows focus"
                                selectionFollowsFocus
                            >
                                <Tab label="Chung" />
                                <Tab label="Tài khoản" />
                            </Tabs>
                            {
                                tabValue === 0 &&
                                <>
                                    <span>Âm thanh</span>
                                    <div>
                                        <FormGroup style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            <FormControlLabel value={1} control={<Checkbox checked={settingState.sound === 1} onChange={handleChangeSoundSetting} />} label="Bật" />
                                            <FormControlLabel value={2} control={<Checkbox checked={settingState.sound === 2} onChange={handleChangeSoundSetting} />} label="Tắt" />
                                        </FormGroup>
                                    </div>
                                    <span>Chủ đề</span>
                                    <div>
                                        <FormGroup style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            <FormControlLabel value={1} control={<Checkbox checked={settingState.theme === 1} onChange={handleChangeThemeSetting} />} label="Ngày" />
                                            <FormControlLabel value={2} control={<Checkbox checked={settingState.theme === 2} onChange={handleChangeThemeSetting} />} label="Đêm" />
                                        </FormGroup>
                                    </div>
                                    <span>Chú chim yêu thích</span>
                                    <div className="birdTypeContainer">
                                        <img className={settingState.birdType === 1 ? "active" : ""} id="1" src={SettingUtils.getBirdImgBySetting(1)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                        <img className={settingState.birdType === 2 ? "active" : ""} id="2" src={SettingUtils.getBirdImgBySetting(2)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                        <img className={settingState.birdType === 3 ? "active" : ""} id="3" src={SettingUtils.getBirdImgBySetting(3)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                        <img className={settingState.birdType === 4 ? "active" : ""} id="4" src={SettingUtils.getBirdImgBySetting(4)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                    </div>
                                </>
                            }
                            {
                                tabValue === 1 &&
                                <>
                                    Đang cập nhật
                                </>
                            }
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
        // alignItems: "center",
        justifyContent: "center",
        color: "#523747",
        fontFamily: 'VT323',
        fontSize: 20,

        "& .MuiFormControlLabel-label": {
            fontSize: 18,
            fontFamily: 'VT323',
            userSelect: "none",
        },

        "& .MuiFormControlLabel-root": {
            minWidth: 72,
        },

        "& .MuiCheckbox-root": {
            padding: "4px 9px 8px 9px",
            color: "#937635 !important",
        },

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
            padding: "0 8px 0 8px",

            "& .MuiTabs-root": {
                minHeight: "unset",
                marginBottom: 16,
            },
            "& .MuiTabs-flexContainer button": {
                padding: "0 8px 4px 8px",
                minHeight: "unset",
                minWidth: "unset",
                fontFamily: 'VT323',
                fontSize: 20,
                color: "#523747",
                textTransform: "none",
            },
            "& .MuiTabs-flexContainer .Mui-selected": {
                color: "unset",
            },
            "& .MuiTabs-indicator": {
                backgroundColor: "#523747",
            },
            "& span": {

            },
            "& div": {
                // margin: "4px 0 16px 0",
            },
            "& .birdTypeContainer": {
                display: "flex",
                // flexDirection: "column",
                // alignItems: "center",
                justifyContent: "center",
                marginTop: 8,
            },
            "& .birdTypeContainer img": {
                borderRadius: 4,
                margin: "0 4px 0 4px",
                padding: 4,
                cursor: "pointer",
            },
            "& .birdTypeContainer img.active": {
                border: "2px solid #937635",
            },
        },
    },
});