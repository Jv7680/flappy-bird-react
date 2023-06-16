import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from 'react-i18next';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./App.css";
import "./assets/fonts/VT323-Regular.ttf";
import "./assets/fonts/flappy-bird-font.ttf";
import FPS from "./components/fps/FPS";
import Loading from "./components/loading/Loading";
import "./configs/i18n/i18n";
import { useAppDispatch } from "./redux/hooks";
import { getRankList } from "./redux/slices/rankListSlice";
import { getUserDetail } from "./redux/slices/userSlice";
import { ROUTES } from "./routes/routes";
import APIService, { ResponseData } from "./services/ApiService";
import { LocalStorage } from "./services/storageService";
import GlobalHistory from "./utils/components/GlobalHistory";
import TextInputComponent from "./utils/components/TextInputComponent";
import { REGEX_FULL_NAME } from "./utils/constants/constants";
import { FunctionUtils } from "./utils/functions/functionUtils";

declare var google: any;
let fullNameTouched: boolean = false;
let fullNameIsValid: boolean = false;
let fullName: string = "";

function App() {
  const { t } = useTranslation(["home", "validate", "alert"]);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const validateSwallInput = Yup.object({
    fullName: Yup.string()
      .required(t("validate:empty"))
      .min(5, t("validate:fullName.min"))
      .matches(REGEX_FULL_NAME, t("validate:fullName.regexNotice"))
      .max(20, t("validate:fullName.max"))
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
    },
    onSubmit: (data) => {
      console.log("data form swalFormInput", data);
      let newData = FunctionUtils.trimDataObj(data);
      console.log("new data form swalFormInput", newData);
    },
    validateOnChange: true,
    validationSchema: validateSwallInput
  });

  // render Swall input
  useEffect(() => {
    const inputElement = <TextInputComponent
      id={"inputUserFullName"}
      error={formik.errors.fullName}
      touched={formik.touched.fullName}
      value={formik.values.fullName}
      label={t("home:register.fullName")}
      onChange={formik.handleChange("fullName")}
      onBlur={formik.handleBlur("fullName")}
      isRequire
    />;

    fullNameTouched = formik.touched.fullName || false;
    fullNameIsValid = formik.isValid;
    fullName = formik.values.fullName;

    document.getElementById("swalFormInput") && ReactDOM.render(inputElement, document.getElementById("swalFormInput"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  useEffect(() => {
    fetchData();

    window.onload = () => {
      google.accounts.id.initialize({
        client_id: "719600623259-ub1lq10i7fgmqnv2hh84dkjbt7266sur.apps.googleusercontent.com",
        callback: handleCallBack,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    LocalStorage.getToken() && await dispatch(getUserDetail());
    await dispatch(getRankList());
    // console.log("result", result);
  };

  const handleCallBack = async (respone: any) => {
    const userInfor: any = jwtDecode(respone.credential);
    // console.log("userInfor", userInfor);

    let resultCheckUser: ResponseData<any> = await APIService.get(`/api/v1/user/checkUserExist/${userInfor.email}`);
    if (resultCheckUser.data) {
      // call login gg
      let body = {
        userName: userInfor.email,
      }
      await APIService.post("/api/v1/auth/loginGoogle", body).then(async () => {
        let result = await dispatch(getUserDetail());
        // console.log("result", result);
        if (result.payload) {
          await dispatch(getRankList());
        }
      });
    }
    else {
      // call register gg
      Swal.fire({
        title: t("alert:typeFullName.title"),
        showDenyButton: true,
        confirmButtonText: t("alert:typeFullName.btnConfirmText"),
        denyButtonText: t("alert:typeFullName.btnCancelText"),
        allowOutsideClick: false,
        html: `<form id="swalFormInput" style="padding: 10px 0 0 0;"></form>`,
        preConfirm: async () => {
          console.log("xxx", fullNameTouched, fullNameIsValid, fullName);
          if (!fullNameTouched) {
            formik.setTouched({ fullName: true });
            return false;
          }
          else if (!fullNameIsValid) {
            return false;
          }
          else {
            let body = {
              userName: userInfor.email,
              password: "none",
              fullName: fullName.trim(),
              gmail: null,
              accountType: 2,
              bestScore: 0,
              setting: { "sound": 1, "theme": 1, "mode": 1, "language": "en", "birdType": 1 },
              refreshToken: null
            }
            let result: ResponseData<any> = await APIService.post("/api/v1/auth/registerGoogle", body);
            // register success, auto login
            if (result.code !== 201) {
              // keep Swall open
              return false;
            }
            else {
              // auto login
              let body = {
                userName: userInfor.email,
              }
              await APIService.post("/api/v1/auth/loginGoogle", body).then(async () => {
                let result = await dispatch(getUserDetail());
                // console.log("result", result);
                if (result.payload) {
                  await dispatch(getRankList());
                }
              });
            }
          }
        },
      }).then((result) => {
        console.log("result Swal", result);
        if (result.isConfirmed) {
          console.log("result isConfirmed");
        }
        else {
          formik.resetForm();
        }
      });
      formik.setFieldValue("fullName", "", false);
    }
  };

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName={classes.toast}
      />
      <Loading />
      <GlobalHistory />
      <FPS />
      <Routes>
        {
          ROUTES.map((item, index) => {
            return (
              <Route
                path={item.route}
                element={item.screen}
                key={index}
              />
            );
          })
        }
      </Routes>
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  toast: {
    backgroundColor: '#DBDA97',
    border: '4px solid #D2AA4F',
    borderStyle: 'inset',
    color: '#523747',
    fontSize: 20,
    "& button": {
      color: 'inherit',
    },
    "& .Toastify__progress-bar": {
      backgroundColor: '#523747',
      height: 2,
    }
  },
});