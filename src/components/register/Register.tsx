import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { getRankList } from "../../redux/slices/rankListSlice";
import { getUserDetail } from "../../redux/slices/userSlice";
import APIService, { ResponseData } from "../../services/ApiService";
import TextInputComponent from "../../utils/components/TextInputComponent";
import { REGEX_FULL_NAME, REGEX_GMAIL, REGEX_PASSWORD, REGEX_USER_NAME } from "../../utils/constants/constants";
import { FunctionUtils } from "../../utils/functions/functionUtils";

interface RegisterProps {
    setTabAccountValue: Function;
};

interface RegisterData {
    userName: string;
    password: string;
    fullName: string;
    gmail: string;
};

const initialRegister: RegisterData = {
    userName: "",
    password: "",
    fullName: "",
    gmail: "",
};

export default function Register(props: RegisterProps) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { t } = useTranslation(["home", "validate", "alert"]);
    const [showPass, setShowPass] = useState(false);

    const validateRegister = Yup.object({
        userName: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:userName.min"))
            .matches(REGEX_USER_NAME, t("validate:userName.regexNotice"))
            .max(10, t("validate:userName.max"))
            .trim(),
        password: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:password.min"))
            .matches(REGEX_PASSWORD, t("validate:password.regexNotice"))
            .max(10, t("validate:password.max"))
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

    const handleRegister = async (registerData: RegisterData) => {
        let body = {
            userName: registerData.userName,
            password: registerData.password,
            fullName: registerData.fullName,
            gmail: registerData.gmail.length > 0 ? registerData.gmail : null,
            accountType: 1,
            bestScore: 0,
            setting: { "sound": 1, "theme": 1, "mode": 1, "language": "en", "birdType": 1 },
            refreshToken: null
        }
        let result: ResponseData<any> = await APIService.post("/api/v1/auth/register", body);

        // register success, auto login
        if (result.code === 201) {
            let body = {
                userName: registerData.userName,
                password: registerData.password,
            }
            await APIService.post("/api/v1/auth/login", body).then(async () => {
                let result = await dispatch(getUserDetail());
                // console.log("result", result);
                if (result.payload) {
                    props.setTabAccountValue(2);
                    await dispatch(getRankList());
                }
            });
        }
    };

    return (
        <>
            <Formik
                initialValues={initialRegister}
                onSubmit={(data) => {
                    console.log("data form register", data);
                    let newData = FunctionUtils.trimDataObj(data);
                    console.log("new data form register", newData);
                    if (newData.gmail.length === 0) {
                        Swal.fire({
                            title: t("alert:gmailEmpty.title"),
                            text: t("alert:gmailEmpty.content"),
                            icon: "warning",
                            allowOutsideClick: false,
                            showCancelButton: true,
                            confirmButtonText: t("alert:gmailEmpty.btnConfirmText"),
                            cancelButtonText: t("alert:gmailEmpty.btnCancelText")
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                handleRegister(newData);
                            }
                        });
                    }
                    else {
                        handleRegister(newData);
                    }
                }}
                validateOnChange
                validationSchema={validateRegister}
            >
                {
                    formikPros => (
                        <>
                            <TextInputComponent
                                id={"inputUserName"}
                                error={formikPros.errors.userName}
                                touched={formikPros.touched.userName}
                                value={formikPros.values.userName}
                                label={t("home:register.userName")}
                                onChange={formikPros.handleChange("userName")}
                                onBlur={formikPros.handleBlur("userName")}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserPassword"}
                                error={formikPros.errors.password}
                                touched={formikPros.touched.password}
                                value={formikPros.values.password}
                                label={t("home:register.password")}
                                onChange={formikPros.handleChange("password")}
                                onBlur={formikPros.handleBlur("password")}
                                rightIcon={showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                type={showPass ? "text" : "password"}
                                onRightIcon={() => {
                                    setShowPass(!showPass);
                                }}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserFullName"}
                                error={formikPros.errors.fullName}
                                touched={formikPros.touched.fullName}
                                value={formikPros.values.fullName}
                                label={t("home:register.fullName")}
                                onChange={formikPros.handleChange("fullName")}
                                onBlur={formikPros.handleBlur("fullName")}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserGmail"}
                                error={formikPros.errors.gmail}
                                touched={formikPros.touched.gmail}
                                value={formikPros.values.gmail}
                                label={t("home:register.gmail")}
                                onChange={formikPros.handleChange("gmail")}
                                onBlur={formikPros.handleBlur("gmail")}
                            />
                            <div className={classes.forgotPassword}>
                                <span onClick={() => { props.setTabAccountValue(0) }}>{t("home:alreadyHaveAccount")}</span>
                            </div>
                            <div className={classes.btnContainer}>
                                <button type="submit" className="loginButton" onClick={() => formikPros.handleSubmit()} color="primary">
                                    {t("home:register.submit")}
                                </button>
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

        "& .loginButton": {
            "-webkit-tap-highlight-color": "transparent",
            fontFamily: "VT323",
            lineHeight: 1.2,
            fontSize: 20,
            backgroundColor: "#D2AA4F",
            color: "#523747",
            borderRadius: 4,
            cursor: "pointer",
            width: "100%",
        },

        "& .loginButton:hover": {

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
    forgotPassword: {
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