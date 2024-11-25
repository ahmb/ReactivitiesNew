import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { store } from "./store";
import { router } from "../router/routes";

export default class UserStore {
  user: IUser | null = null;
  fbAccessToken: string | null = null;
  fbLoading = false;
  refrehTokenTimeout: any;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: IUserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      router.navigate("/");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: IUserFormValues) => {
    try {
      await agent.Account.register(creds);
      router.navigate(`/account/registerSuccess?email=${creds.email}`);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  setImage = (image: string) => {
    if (this.user) {
      this.user.image = image;
    }
  };
  setDisplayName = (name: string) => {
    if (this.user) this.user.displayName = name;
  };

  getFacebookLoginStatus = async () => {
    try {
      while (!window.FB) continue;
      window.FB.getLoginStatus((response) => {
        //when not connected the status is "unknown"
        if (response.status === "connected") {
          this.fbAccessToken = response.authResponse.accessToken;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  facebookLogin = () => {
    this.fbLoading = true;
    const apiLogin = (accessToken: string) => {
      agent.Account.fbLogin(accessToken)
        .then((user) => {
          store.commonStore.setToken(user.token);
          this.startRefreshTokenTimer(user);
          runInAction(() => {
            this.user = user;
            this.fbLoading = false;
          });
          router.navigate("/");
        })
        .catch((error) => {
          console.log(error);
          runInAction(() => (this.fbLoading = false));
        });
    };
    if (this.fbAccessToken) {
      apiLogin(this.fbAccessToken);
    } else {
      window.FB.login(
        (response) => {
          apiLogin(response.authResponse.accessToken);
        },
        { scope: "public_profile,email" }
      );
    }
  };

  refreshToken = async () => {
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => {
        store.commonStore.setToken(user.token);
        this.user = user;
        this.startRefreshTokenTimer(user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  private startRefreshTokenTimer(user: IUser) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000; //30 second before token expires
    this.refrehTokenTimeout = setTimeout(this.refreshToken, timeout); //refresh the token in the background
  }

  private stopRefreshTokenTimer(user: IUser) {
    clearTimeout(this.refrehTokenTimeout);
  }
}
