import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IActivitiesEnvelope, IActivity } from "../models/activity";
import { history } from "../../index";
import { store } from "../stores/store";
import { IUser, IUserFormValues } from "../models/user";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        // BAD GUID case
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        // VALIDATION ERROR CASE
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error("unauthorised");

        break;
      case 404:
        history.push("/not-found");
        toast.error("not found");
        break;
      case 500:
        toast.error("server error");
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<IActivitiesEnvelope>("/activities"),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => requests.post<void>("/activities", activity),
  update: (activity: IActivity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const Account = {
  current: () => requests.get<IUser>("/account"),
  login: (user: IUserFormValues) =>
    requests.post<IUser>("/account/login", user),
  register: (user: IUserFormValues) =>
    requests.post<IUser>("/account/register", user),
};

const agent = {
  Activities,
  Account,
};

export default agent;