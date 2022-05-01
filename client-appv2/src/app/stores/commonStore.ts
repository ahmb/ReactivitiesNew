import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;
  isSidebarOpen = false;
  isFilterNavSticky = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setSidebarOpen = (active: boolean) => {
    this.isSidebarOpen = active;
  };

  toggleSidebar = () => {
    this.isSidebarOpen = !this.isSidebarOpen;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => (this.appLoaded = true);

  setIsFilterNavSticky = (value: boolean) => {
    this.isFilterNavSticky = value;
  };
}
