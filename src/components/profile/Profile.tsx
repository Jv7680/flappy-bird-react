import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserDetail, resetUser, selectUser } from "../../redux/slices/userSlice";
import { resetState } from "../../redux/utilActions";
import APIService, { ResponseData } from "../../services/ApiService";
import { LocalStorage } from "../../services/storageService";
import TextInputComponent from "../../utils/components/TextInputComponent";
import { REGEX_FULL_NAME, REGEX_GMAIL, REGEX_USER_NAME } from "../../utils/constants/constants";
import { FunctionUtils } from '../../utils/functions/functionUtils';

interface ProfileProps {
    setTabAccountValue: Function;
};

interface ProfileData {
    userName: string;
    fullName: string;
    gmail: string;
};


export default function Profile(props: ProfileProps) {
    const classes = useStyles();
    const { t } = useTranslation(["home", "validate"]);
    const [isInputDisable, setIsInputDisable] = useState<boolean>(true);
    const userState = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const initialProfile: ProfileData = {
        userName: userState.userName,
        fullName: userState.fullName,
        gmail: userState.gmail,
    };

    const validateProfile = Yup.object({
        userName: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:userName.min"))
            .matches(REGEX_USER_NAME, t("validate:userName.regexNotice"))
            .max(10, t("validate:userName.max"))
            .trim(),
        fullName: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:fullName.min"))
            .matches(REGEX_FULL_NAME, t("validate:fullName.regexNotice"))
            .max(20, t("validate:fullName.max"))
            .trim(),
        gmail: Yup.string()
            .min(10, t("validate:gmail.min"))
            .matches(REGEX_GMAIL, t("validate:gmail.regexNotice"))
            .max(30, t("validate:gmail.max"))
            .trim(),
    });

    const handleSave = async (profileData: ProfileData) => {
        let body = {
            fullName: profileData.fullName,
            gmail: profileData.gmail,
        }
        let result: ResponseData<any> = await APIService.patch("/api/v1/user/updateUserDetail", body);

        // save success, get new profile
        if (result.code === 205) {
            let result = await dispatch(getUserDetail());
            console.log("result", result);
        }
    };

    const handleLogout = () => {
        LocalStorage.clear();
        dispatch(resetState());
        dispatch(resetUser());
        props.setTabAccountValue(0);
        toast.success(t("home:logoutSuccess"));
    };

    return (
        <>
            {/* <Divider sx={{ marginBottom: "16px" }}>Profile</Divider> */}
            <Formik
                initialValues={initialProfile}
                onSubmit={(data) => {
                    console.log("data form profile", data);
                    let newData = FunctionUtils.trimDataObj(data);
                    console.log("new data form profile", newData);
                    handleSave(newData);
                }}
                onReset={() => { setIsInputDisable(true) }}
                validateOnChange
                validationSchema={validateProfile}
                enableReinitialize
            >
                {
                    formikProps => (
                        <>
                            <TextInputComponent
                                id={"inputUserName"}
                                error={formikProps.errors.userName}
                                touched={formikProps.touched.userName}
                                value={formikProps.values.userName}
                                label={t("home:register.userName")}
                                onChange={formikProps.handleChange("userName")}
                                onBlur={formikProps.handleBlur("userName")}
                                isRequire
                                disabled
                            />
                            <TextInputComponent
                                id={"inputUserFullName"}
                                error={formikProps.errors.fullName}
                                touched={formikProps.touched.fullName}
                                value={formikProps.values.fullName}
                                label={t("home:register.fullName")}
                                onChange={formikProps.handleChange("fullName")}
                                onBlur={formikProps.handleBlur("fullName")}
                                isRequire
                                disabled={isInputDisable}
                            />
                            <TextInputComponent
                                id={"inputUserGmail"}
                                error={formikProps.errors.gmail}
                                touched={formikProps.touched.gmail}
                                value={formikProps.values.gmail}
                                label={t("home:register.gmail")}
                                onChange={formikProps.handleChange("gmail")}
                                onBlur={formikProps.handleBlur("gmail")}
                                disabled={isInputDisable}
                            />
                            <div className={classes.changePassword}>
                                <span onClick={() => handleLogout()}>{t("home:logout")}</span>
                            </div>
                            <div className={classes.changePassword}>
                                <span onClick={() => { props.setTabAccountValue(3) }}>{t("home:changePassword.title")}</span>
                            </div>
                            <div className={classes.btnContainer}>
                                {
                                    isInputDisable ?
                                        <button type="button" className="editButton" onClick={() => setIsInputDisable(false)} color="primary">
                                            {t("home:edit")}
                                        </button>
                                        :
                                        <>
                                            <button type="button" className="cancelButton" onClick={() => formikProps.resetForm()} color="primary">
                                                {t("home:cancel")}
                                            </button>
                                            <button type="submit" className="saveButton" onClick={() => formikProps.handleSubmit()} color="primary">
                                                {t("home:save")}
                                            </button>
                                        </>
                                }
                            </div>
                        </>
                    )
                }
            </Formik>
        </>
    )
};

const useStyles = makeStyles({
    btnContainer: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& button": {
            fontFamily: "VT323",
            lineHeight: 1.2,
            fontSize: 20,
            backgroundColor: "#D2AA4F",
            color: "#523747",
            borderRadius: 4,
            cursor: "pointer",
            width: "100%",
        },

        "& .editButton": {

        },
        "& .editButton:hover": {

        },

        "& .saveButton": {
            width: "40%",
        },

        "& .cancelButton": {
            width: "40%",
            backgroundColor: '#d2aa4f63',
            border: 'unset',
        },
        "& .cancelButton:hover": {
            backgroundColor: '#D2AA4F',
        },
    },
    register: {
        marginBottom: 4,
        textAlign: "right",

        "& span": {
            "-webkit-tap-highlight-color": "transparent",
            cursor: "pointer",
            userSelect: "none",
        },
        "& span:hover": {
            textDecoration: "underline",
        }
    },
    changePassword: {
        marginBottom: 14,
        textAlign: "right",

        "& span": {
            cursor: "pointer",
            userSelect: "none",
        },
        "& span:hover": {
            textDecoration: "underline",
        }
    },
});