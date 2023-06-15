import { makeStyles } from "@mui/styles";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FPS from "./components/fps/FPS";
import Loading from "./components/loading/Loading";
import { ROUTES } from "./routes/routes";
import GlobalHistory from "./utils/components/GlobalHistory";
import APIService, { ResponseData } from "./services/ApiService";
import { useEffect } from "react";
import "./App.css";
import "./assets/fonts/VT323-Regular.ttf";
import "./assets/fonts/flappy-bird-font.ttf";
import "./configs/i18n/i18n";
import { useAppDispatch } from "./redux/hooks";
import { getRankList } from "./redux/slices/rankListSlice";
import { getUserDetail } from "./redux/slices/userSlice";
import { LocalStorage } from "./services/storageService";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

declare var google: any;

function App() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

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
        title: 'Hãy nhập tên của bạn',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showDenyButton: true,
        confirmButtonText: 'Xác nhận',
        denyButtonText: "Hủy",
        allowOutsideClick: false,
        preConfirm: async (inputData) => {
          console.log("inputData", inputData);
          let body = {
            userName: userInfor.email,
            password: "none",
            fullName: inputData,
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
        },
      }).then((result) => {
        console.log("result Swal", result);
        if (result.isConfirmed) {
          console.log("result isConfirmed");
        }
      })
    }
  };

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <ToastContainer
        position="top-right"
        autoClose={3500}
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