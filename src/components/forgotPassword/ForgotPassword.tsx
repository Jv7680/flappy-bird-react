import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import APIService, { ResponseData } from "../../services/ApiService";
import TextInputComponent from "../../utils/components/TextInputComponent";
import { REGEX_GMAIL } from "../../utils/constants/constants";
import { FunctionUtils } from '../../utils/functions/functionUtils';

interface ForgotPasswordProps {
    setTabAccountValue: Function;
};

interface ForgotPasswordData {
    gmail: string;
};

export default function ForgotPassword(props: ForgotPasswordProps) {
    const classes = useStyles();
    const { t } = useTranslation(["home", "validate"]);

    const initialForgotPassword: ForgotPasswordData = {
        gmail: "",
    };

    const validateForgotPassword = Yup.object({
        gmail: Yup.string()
            .required(t("validate:empty"))
            .min(10, t("validate:gmail.min"))
            .matches(REGEX_GMAIL, t("validate:gmail.regexNotice"))
            .max(30, t("validate:gmail.max"))
            .trim(),
    });

    const handleSubmit = async (ForgotPasswordData: ForgotPasswordData) => {
        let body = {
            toGmail: ForgotPasswordData.gmail,
            title: t("home:forgotPasswordTitle"),
            content: t("home:forgotPasswordContent"),
            warning: t("home:forgotPasswordWarning"),
        }
        let result: ResponseData<any> = await APIService.post("/api/v1/mail/send", body);

        // send success
        if (result.code === 208) {
            // props.setTabAccountValue(2);
            console.log("result", result);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialForgotPassword}
                onSubmit={(data) => {
                    console.log("data form forgot password", data);
                    let newData = FunctionUtils.trimDataObj(data);
                    console.log("new data form forgot password", newData);
                    handleSubmit(newData);
                }}
                onReset={() => { }}
                validateOnChange
                validationSchema={validateForgotPassword}
                enableReinitialize
            >
                {
                    formikProps => (
                        <>
                            <div style={{ marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: t("home:forgotPasswordNote") }}>
                            </div>
                            <TextInputComponent
                                id={"inputUserGmail"}
                                error={formikProps.errors.gmail}
                                touched={formikProps.touched.gmail}
                                value={formikProps.values.gmail}
                                label={t("home:register.gmail")}
                                onChange={formikProps.handleChange("gmail")}
                                onBlur={formikProps.handleBlur("gmail")}
                                isRequire
                            />

                            <div className={classes.btnContainer}>
                                <button type="button" className="cancelButton" onClick={() => props.setTabAccountValue(0)} color="primary">
                                    {t("home:cancel")}
                                </button>
                                <button type="submit" className="saveButton" onClick={() => formikProps.handleSubmit()} color="primary">
                                    {t("home:submit")}
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
    ForgotPassword: {
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