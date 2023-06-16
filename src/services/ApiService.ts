import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "../utils/constants/constants";
import { LocalStorage } from "./storageService";
import { toast } from "react-toastify";
import { store } from "../redux/store";
import { setIsLoading } from "../redux/slices/isLoadingSlice";
import { resetState } from "../redux/utilActions";
import { resetUser } from "../redux/slices/userSlice";
import { i18TFunc } from "../utils/components/GlobalHistory";
import { successStatusMsgVI } from "../locales/vi/successStatusMsg";
import { successStatusMsgEN } from "../locales/en/successStatusMsg";
import { errorStatusMsgVI } from "../locales/vi/errorStatusMsg";
import { errorStatusMsgEN } from "../locales/en/errorStatusMsg";

export interface ResponseData<T> {
  status: number;
  code: number;
  message: string;
  data: T;
};

const handleRequestInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
  // set token header
  config.headers.authorization = LocalStorage.getToken() || "";
  return config;
};

const handleErrorRequestInterceptor = async (error: any) => {
  console.log("request interceptors error", error);
  return error;
};

const handleResponeInterceptor = async (response: AxiosResponse<any, any>) => {
  console.log("data interceptors respone", response);
  console.log(`Call API ${response.config.url} success`);

  const data: ResponseData<any> = response.data;

  // login success
  if (data.code === 202) {
    LocalStorage.setToken(data.data.accessToken);
    LocalStorage.setRefreshToken(data.data.refreshToken);
  }

  if (![203, 204, 207, 209, 210].find(element => element === data.code)) {
    let userSetting = JSON.parse(LocalStorage.getUserSetting() || "");
    if (userSetting?.language === "vi") {
      toast.success(successStatusMsgVI[(data.code as keyof typeof successStatusMsgVI)]);
    }
    else if (userSetting?.language === "en") {
      toast.success(successStatusMsgEN[(data.code as keyof typeof successStatusMsgEN)]);
    }
  }

  return response;
};

const handleErrorResponeInterceptor = async (error: any) => {
  console.log("error interceoptor", error);
  console.log("error response interceoptor", error.response);

  // cannot connect to server
  if (error && !error.response) {
    return toast.error(i18TFunc("alert:errorServer"));
  }

  // api not exist
  if (error && error.response.status === 404) {
    return;
  }

  const data: ResponseData<any> = error.response.data;

  // access token expired -> refresh
  if (data.code === 413) {
    let body = {
      refreshToken: LocalStorage.getRefreshToken(),
    }
    let result: ResponseData<any> = await APIService.post("/api/v1/auth/refreshToken", body);
    if (result.code === 203) {
      LocalStorage.setToken(result.data.accessToken);
      // call again API error
      return await axiosInstance(error.config);
    }
    else {
      return { data: result };
    }
  }

  // refresh/access token illligal, refresh token expired -> logout
  if (data.code === 410 || data.code === 411 || data.code === 414) {
    LocalStorage.clear();
    store.dispatch(resetState());
    store.dispatch(resetUser());
    // toast.success(i18n.t("home:logoutSuccess"));
    toast.error(i18TFunc("alert:sessionTimeout"));
    return error.response;
  }

  // cannot find user(maybe deleted from database)
  if (data.code === 412) {
    LocalStorage.clear();
    store.dispatch(resetState());
    store.dispatch(resetUser());
    return error.response;
  }

  if (![403, 406, 407, 408, 409, 410, 411, 412, 413, 414, 417, 422, 424, 425].find(element => element === data.code)) {
    let userSetting = JSON.parse(LocalStorage.getUserSetting() || "");
    if (userSetting?.language === "vi") {
      toast.error(errorStatusMsgVI[(data.code as keyof typeof errorStatusMsgVI)]);
    }
    else if (userSetting?.language === "en") {
      toast.error(errorStatusMsgEN[(data.code as keyof typeof errorStatusMsgEN)]);
    }
  }

  return error.response;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json"
  }
});
// request interceptor
axiosInstance.interceptors.request.use(handleRequestInterceptor, handleErrorRequestInterceptor);
// response interceptor
axiosInstance.interceptors.response.use(handleResponeInterceptor, handleErrorResponeInterceptor);

// support function
const handleCallAPI = async (axiosMethod: Function, url: string, body: any = undefined) => {
  try {
    store.dispatch(setIsLoading(true));
    if (!body) {
      let result = (await axiosMethod(url)).data;
      return result;
    }
    else {
      let result = (await axiosMethod(url, body)).data;
      return result;
    }
  }
  catch (error) {
    console.log("error in handleCallAPI", error);
  }
  finally {
    store.dispatch(setIsLoading(false));
  }
};

const APIService = {
  get: async (url: string) => await handleCallAPI(axiosInstance.get, url),
  post: async (url: string, body: any) => await handleCallAPI(axiosInstance.post, url, body),
  put: async (url: string, body: any) => await handleCallAPI(axiosInstance.put, url, body),
  patch: async (url: string, body: any) => await handleCallAPI(axiosInstance.patch, url, body),
  delete: async (url: string, body: any) => await handleCallAPI(axiosInstance.delete, url, body),
};

export default APIService;