import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import APIService, { ResponseData } from "../../services/ApiService";
import TextInputComponent from "../../utils/components/TextInputComponent";
import { REGEX_PASSWORD } from "../../utils/constants/constants";
import { FunctionUtils } from '../../utils/functions/functionUtils';

interface ChangePasswordProps {
    setTabAccountValue: Function;
};

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    renewPassword: string;
};

export default function ChangePassword(props: ChangePasswordProps) {
    const classes = useStyles();
    const { t } = useTranslation(["home", "validate"]);
    const [showPass, setShowPass] = useState(false);

    const initialChangePassword: ChangePasswordData = {
        currentPassword: "",
        newPassword: "",
        renewPassword: "",
    };

    const validateChangePassword = Yup.object({
        currentPassword: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:password.min"))
            .matches(REGEX_PASSWORD, t("validate:password.regexNotice"))
            .max(10, t("validate:password.max"))
            .trim(),
        newPassword: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:password.min"))
            .matches(REGEX_PASSWORD, t("validate:password.regexNotice"))
            .max(10, t("validate:password.max"))
            .trim(),
        renewPassword: Yup.string()
            .required(t("validate:empty"))
            .min(5, t("validate:password.min"))
            .matches(REGEX_PASSWORD, t("validate:password.regexNotice"))
            .max(10, t("validate:password.max"))
            .oneOf([Yup.ref("newPassword")], t("validate:password.notMatchWithNewPassword"))
            .trim(),
    });

    const handleSave = async (changePasswordData: ChangePasswordData) => {
        let body = {
            currentPassword: changePasswordData.currentPassword,
            newPassword: changePasswordData.newPassword,
            renewPassword: changePasswordData.renewPassword,
        }
        let result: ResponseData<any> = await APIService.patch("/api/v1/user/updateUserPassword", body);

        // // save success, get new profile
        if (result.code === 206) {
            props.setTabAccountValue(2);
            console.log("result", result);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialChangePassword}
                onSubmit={(data) => {
                    console.log("data form change password", data);
                    let newData = FunctionUtils.trimDataObj(data);
                    console.log("new data form change password", newData);
                    handleSave(newData);
                }}
                onReset={() => { }}
                validateOnChange
                validationSchema={validateChangePassword}
                enableReinitialize
            >
                {
                    formikProps => (
                        <>
                            <TextInputComponent
                                id={"inputUserName"}
                                error={formikProps.errors.currentPassword}
                                touched={formikProps.touched.currentPassword}
                                value={formikProps.values.currentPassword}
                                label={t("home:changePassword.currentPassword")}
                                onChange={formikProps.handleChange("currentPassword")}
                                onBlur={formikProps.handleBlur("currentPassword")}
                                rightIcon={showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                type={showPass ? "text" : "password"}
                                onRightIcon={() => {
                                    setShowPass(!showPass);
                                }}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserFullName"}
                                error={formikProps.errors.newPassword}
                                touched={formikProps.touched.newPassword}
                                value={formikProps.values.newPassword}
                                label={t("home:changePassword.newPassword")}
                                onChange={formikProps.handleChange("newPassword")}
                                onBlur={formikProps.handleBlur("newPassword")}
                                type={showPass ? "text" : "password"}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserGmail"}
                                error={formikProps.errors.renewPassword}
                                touched={formikProps.touched.renewPassword}
                                value={formikProps.values.renewPassword}
                                label={t("home:changePassword.renewPassword")}
                                onChange={formikProps.handleChange("renewPassword")}
                                onBlur={formikProps.handleBlur("renewPassword")}
                                type={showPass ? "text" : "password"}
                                isRequire
                            />

                            <div className={classes.btnContainer}>
                                <button type="button" className="cancelButton" onClick={() => props.setTabAccountValue(2)} color="primary">
                                    {t("home:cancel")}
                                </button>
                                <button type="submit" className="saveButton" onClick={() => formikProps.handleSubmit()} color="primary">
                                    {t("home:save")}
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