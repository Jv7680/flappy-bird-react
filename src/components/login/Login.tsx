import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import TextInputComponent from "../../utils/components/TextInputComponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { REGEX_USER_NAME, REGEX_PASSWORD } from "../../utils/constants/constants";

interface LoginProps {
    setTabAccountValue: Function;
};

interface LoginData {
    userName: string;
    password: string;
};

const initialLogin: LoginData = {
    userName: "",
    password: "",
};

export default function Login(props: LoginProps) {
    const classes = useStyles();
    const { t } = useTranslation(["home", "validate"]);
    const [showPass, setShowPass] = useState(false);

    const validateLogin = Yup.object({
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
    });

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Formik
                initialValues={initialLogin}
                onSubmit={(data) => {
                    console.log("data form login", data);
                }}
                validateOnChange
                validationSchema={validateLogin}
            >
                {
                    formikPros => (
                        <>
                            <TextInputComponent
                                id={"inputUserName"}
                                error={formikPros.errors.userName}
                                touched={formikPros.touched.userName}
                                value={formikPros.values.userName}
                                label={t("home:login.userName")}
                                onChange={formikPros.handleChange("userName")}
                                onBlur={formikPros.handleBlur("userName")}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserPassword"}
                                error={formikPros.errors.password}
                                touched={formikPros.touched.password}
                                value={formikPros.values.password}
                                label={t("home:login.password")}
                                onChange={formikPros.handleChange("password")}
                                onBlur={formikPros.handleBlur("password")}
                                rightIcon={showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                type={showPass ? "text" : "password"}
                                onRightIcon={() => {
                                    setShowPass(!showPass);
                                }}
                                isRequire
                            />
                            <div className={classes.register}>
                                <span onClick={() => { props.setTabAccountValue(1) }}>{t("home:register.title")}</span>
                            </div>
                            <div className={classes.forgotPassword}>
                                {/* <span>Quên mật khẩu?</span> */}
                                <span>{t("home:forgotPassword")}</span>
                            </div>
                            <div className={classes.btnContainer}>
                                <button type="submit" className="loginButton" onClick={() => formikPros.handleSubmit()} color="primary">
                                    {t("home:login.title")}
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
            "-webkit-tap-highlight-color": "transparent",
            cursor: "pointer",
            userSelect: "none",
        },
        "& span:hover": {
            textDecoration: "underline",
        }
    },
});