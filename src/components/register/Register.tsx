import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import TextInputComponent from "../../utils/components/TextInputComponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from "react-i18next";
import { REGEX_USER_NAME, REGEX_PASSWORD, REGEX_FULL_NAME, REGEX_GMAIL } from "../../utils/constants/constants";

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
    const { t } = useTranslation(["home", "validate"]);
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

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Formik
                initialValues={initialRegister}
                onSubmit={(data) => {
                    console.log("data form login", data);
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