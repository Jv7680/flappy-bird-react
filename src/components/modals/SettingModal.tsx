import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectSetting, setBirdTypeSetting, setLanguageSetting, setSoundSetting, setThemeSetting } from '../../redux/slices/settingSlice';
import { resetUser, selectUser } from '../../redux/slices/userSlice';
import { LocalStorage } from '../../services/storageService';
import { SettingUtils } from '../../utils/functions/settingUtils';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import ChangePassword from '../changePassword/ChangePassword';
import Login from '../login/Login';
import Profile from '../profile/Profile';
import Register from '../register/Register';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import { resetState } from '../../redux/utilActions';
import { toast } from 'react-toastify';
import * as settingTypes from "../../utils/constants/types";

interface SettingModalProps {
    isOpen: boolean;
    handleClose: Function;
};

export let handleSetTabValue: any;

export default function SettingModal(props: SettingModalProps) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation(["home"]);
    const settingState = useAppSelector(selectSetting);
    const userState = useAppSelector(selectUser);
    const [tabValue, setTabValue] = useState<number>(settingTypes.setting.GENERAL);
    const [tabAccountValue, setTabAccountValue] = useState<number>(settingTypes.accountSetting.LOGIN);

    handleSetTabValue = setTabValue;

    useEffect(() => {
        LocalStorage.setUserSetting(JSON.stringify(settingState));
    }, [settingState]);

    useEffect(() => {
        userState.accountType === settingTypes.accountType.NORMAL && setTabAccountValue(settingTypes.accountSetting.PROFILE);
        userState.accountType === settingTypes.accountType.GOOGLE && setTabAccountValue(settingTypes.accountSetting.GOOGLE_LOGOUT);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    const handleChangeSoundSetting = (event: any) => {
        dispatch(setSoundSetting(+event.target.value));
    };

    const handleChangeThemeSetting = (event: any) => {
        dispatch(setThemeSetting(+event.target.value));
    };

    const handleChangeBirdTypeSetting = (event: any) => {
        dispatch(setBirdTypeSetting(+event.target.id));
    };

    const handleChangeLanguageSetting = (event: any) => {
        dispatch(setLanguageSetting(event.target.value));
        i18n.changeLanguage(event.target.value);
    };

    const handleCloseModal = () => {
        setTabValue(settingTypes.setting.GENERAL);
        !LocalStorage.getToken() && setTabAccountValue(settingTypes.accountSetting.LOGIN);
        userState.accountType === settingTypes.accountType.NORMAL && setTabAccountValue(settingTypes.accountSetting.PROFILE);
        userState.accountType === settingTypes.accountType.GOOGLE && setTabAccountValue(settingTypes.accountSetting.GOOGLE_LOGOUT);
        props.handleClose();
    };

    const handleLogout = () => {
        LocalStorage.clear();
        dispatch(resetState());
        dispatch(resetUser());
        setTabAccountValue(settingTypes.accountSetting.LOGIN);
        toast.success(t("home:logoutSuccess"));
    };

    return (
        <>
            <Modal
                open={props.isOpen}
                disableAutoFocus
                onClose={() => { handleCloseModal() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus
                disableRestoreFocus
            >
                <Box sx={style}>
                    <div className={classes.root}>
                        <div className="title">
                            {t('home:setting.title')}
                        </div>
                        <div className="close">
                            <button title="" onClick={() => handleCloseModal()}><CloseIcon fontSize="inherit"></CloseIcon></button>
                        </div>
                        <div className="content">
                            <Tabs
                                onChange={(event, newValue) => { setTabValue(newValue); }}
                                value={tabValue}
                                aria-label="Tabs where selection follows focus"
                                selectionFollowsFocus
                            >
                                <Tab label={t('home:setting.general')} />
                                <Tab label={t('home:setting.account')} />
                            </Tabs>
                            {
                                tabValue === settingTypes.setting.GENERAL &&
                                <>
                                    <Breadcrumb
                                        listBreadcrumb={[t('home:breadcrumb.generalSetting')]}
                                    />

                                    <span>{t('home:setting.sound')}</span>
                                    <div>
                                        <FormGroup style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            <FormControlLabel value={1} control={<Checkbox checked={settingState.sound === settingTypes.generalSetting.sound.ON} onChange={handleChangeSoundSetting} />} label={t('home:setting.sound on')} />
                                            <FormControlLabel value={2} control={<Checkbox checked={settingState.sound === settingTypes.generalSetting.sound.OFF} onChange={handleChangeSoundSetting} />} label={t('home:setting.sound off')} />
                                        </FormGroup>
                                    </div>
                                    <span>{t('home:setting.theme')}</span>
                                    <div>
                                        <FormGroup style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            <FormControlLabel value={1} control={<Checkbox checked={settingState.theme === settingTypes.generalSetting.theme.DAY} onChange={handleChangeThemeSetting} />} label={t('home:setting.theme light')} />
                                            <FormControlLabel value={2} control={<Checkbox checked={settingState.theme === settingTypes.generalSetting.theme.NIGHT} onChange={handleChangeThemeSetting} />} label={t('home:setting.theme dark')} />
                                        </FormGroup>
                                    </div>
                                    <span>{t('home:setting.language')}</span>
                                    <div>
                                        <FormGroup style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            <FormControlLabel value={"vi"} control={<Checkbox checked={settingState.language === settingTypes.generalSetting.language.VIETNAMESE} onChange={handleChangeLanguageSetting} />} label="Tiếng Việt" />
                                            <FormControlLabel value={"en"} control={<Checkbox checked={settingState.language === settingTypes.generalSetting.language.ENGLISH} onChange={handleChangeLanguageSetting} />} label="English" />
                                        </FormGroup>
                                    </div>
                                    <span>{t('home:setting.bird type')}</span>
                                    <div className="birdTypeContainer">
                                        <img className={settingState.birdType === settingTypes.generalSetting.birdType.YELLOW ? "active" : ""} id="1" src={SettingUtils.getBirdImgBySetting(settingTypes.generalSetting.birdType.YELLOW)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                        <img className={settingState.birdType === settingTypes.generalSetting.birdType.GREY ? "active" : ""} id="2" src={SettingUtils.getBirdImgBySetting(settingTypes.generalSetting.birdType.GREY)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                        <img className={settingState.birdType === settingTypes.generalSetting.birdType.PINK ? "active" : ""} id="3" src={SettingUtils.getBirdImgBySetting(settingTypes.generalSetting.birdType.PINK)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                        <img className={settingState.birdType === settingTypes.generalSetting.birdType.BLUE ? "active" : ""} id="4" src={SettingUtils.getBirdImgBySetting(settingTypes.generalSetting.birdType.BLUE)} alt="notFound" width={38} height={26} onClick={handleChangeBirdTypeSetting} />
                                    </div>
                                </>
                            }
                            {
                                tabValue === settingTypes.setting.ACCOUNT &&
                                <>
                                    {
                                        tabAccountValue === settingTypes.accountSetting.LOGIN &&
                                        <>
                                            <Breadcrumb
                                                listBreadcrumb={[t('home:breadcrumb.accountSetting'), t('home:breadcrumb.login')]}
                                            />
                                            <Login setTabAccountValue={setTabAccountValue} />
                                        </>
                                    }
                                    {
                                        tabAccountValue === settingTypes.accountSetting.REGISTER &&
                                        <>
                                            <Breadcrumb
                                                listBreadcrumb={[t('home:breadcrumb.accountSetting'), t('home:breadcrumb.register')]}
                                            />
                                            <Register setTabAccountValue={setTabAccountValue} />
                                        </>
                                    }
                                    {
                                        tabAccountValue === settingTypes.accountSetting.PROFILE &&
                                        <>
                                            <Breadcrumb
                                                listBreadcrumb={[t('home:breadcrumb.accountSetting'), t('home:breadcrumb.manage')]}
                                            />
                                            <Profile setTabAccountValue={setTabAccountValue} />
                                        </>
                                    }
                                    {
                                        tabAccountValue === settingTypes.accountSetting.CHANGE_PASSWORD &&
                                        <>
                                            <Breadcrumb
                                                listBreadcrumb={[t('home:breadcrumb.accountSetting'), t('home:breadcrumb.changePassword')]}
                                            />
                                            <ChangePassword setTabAccountValue={setTabAccountValue} />
                                        </>
                                    }
                                    {
                                        tabAccountValue === settingTypes.accountSetting.FORGOT_PASSWORD &&
                                        <>
                                            <Breadcrumb
                                                listBreadcrumb={[t('home:breadcrumb.accountSetting'), t('home:breadcrumb.forgotPassword')]}
                                            />
                                            <ForgotPassword setTabAccountValue={setTabAccountValue} />
                                        </>
                                    }
                                    {
                                        tabAccountValue === settingTypes.accountSetting.GOOGLE_LOGOUT &&
                                        <>
                                            <Breadcrumb
                                                listBreadcrumb={[t('home:breadcrumb.accountSetting'), t('home:breadcrumb.manage')]}
                                            />
                                            <div className={classes.btnGoogle} onClick={(event) => { handleLogout() }}>
                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                                                <span>{t("home:logout")}</span>
                                            </div>
                                        </>
                                    }
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    maxHeight: "80%",
    overflow: "auto",
    bgcolor: 'transparent',
    border: 'unset',
    borderRadius: "4px",
    boxShadow: 24,
    padding: 0,
    '@media (max-width: 450px)': {
        width: 300,
    },
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
                marginBottom: 8,
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
            },
            "& .birdTypeContainer": {
                display: "flex",
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
    btnGoogle: {
        position: "relative",
        height: 36,
        backgroundColor: "#FFFFFF",
        padding: "0 4px 0 4px",
        borderRadius: 4,
        color: "black",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: "none",
        cursor: "pointer",
        transition: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        "&:hover": {
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
        },

        "& svg": {
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            width: 24,
        },
    },
});