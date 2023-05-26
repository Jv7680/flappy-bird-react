import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import TextInputComponent from "../../utils/components/TextInputComponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

const emptyInputErr = "Vui lòng không để trống trường này";
const validateRegister = Yup.object({
    userName: Yup.string()
        .required(emptyInputErr)
        .min(6, "Tối thiểu 6 ký tự")
        .max(10, "Tối đa 10 ký tự")
        .trim(),
    password: Yup.string()
        .required(emptyInputErr)
        .min(6, "Tối thiểu 6 ký tự")
        .max(10, "Tối đa 10 ký tự")
        .trim(),
    fullName: Yup.string()
        .required(emptyInputErr)
        .min(6, "Tối thiểu 6 ký tự")
        .max(10, "Tối đa 10 ký tự")
        .trim(),
    gmail: Yup.string()
        .min(6, "Tối thiểu 6 ký tự")
        .max(10, "Tối đa 10 ký tự")
        .trim(),
});

export default function Register(props: RegisterProps) {
    const classes = useStyles();
    const [showPass, setShowPass] = useState(false);

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
                                label={"Tên đăng nhập"}
                                onChange={formikPros.handleChange("userName")}
                                onBlur={formikPros.handleBlur("userName")}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserPassword"}
                                error={formikPros.errors.password}
                                touched={formikPros.touched.password}
                                value={formikPros.values.password}
                                label={"Mật khẩu"}
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
                                label={"Họ và tên"}
                                onChange={formikPros.handleChange("fullName")}
                                onBlur={formikPros.handleBlur("fullName")}
                                isRequire
                            />
                            <TextInputComponent
                                id={"inputUserGmail"}
                                error={formikPros.errors.gmail}
                                touched={formikPros.touched.gmail}
                                value={formikPros.values.gmail}
                                label={"Gmail"}
                                onChange={formikPros.handleChange("gmail")}
                                onBlur={formikPros.handleBlur("gmail")}
                            />
                            <div className={classes.forgotPassword}>
                                <span onClick={() => { props.setTabAccountValue(0) }}>Đã có tài khoản? Đăng nhập</span>
                            </div>
                            <div className={classes.btnContainer}>
                                <button type="submit" className="loginButton" onClick={() => formikPros.handleSubmit()} color="primary">
                                    Xác nhận
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