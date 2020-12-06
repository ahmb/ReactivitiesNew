import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";
import { toast } from "react-toastify";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.getUser();
  }
  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      console.log(user);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      let errorDetails = JSON.stringify(error.data.errors).replace('"','').replace('{','').replace('}','').replace('[','').replace(']','');
      toast.error('Error occured during login. Please validate your input data.');
      toast.error(errorDetails);
      throw error;
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      console.log("RETURNED USER:");
      console.log(user);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      runInAction(() => {
        this.user = user;
      });
      history.push("/activities");
    } catch (error) {
      let errorDetails = JSON.stringify(error.data.errors).replace('"','').replace('{','').replace('}','').replace('[','').replace(']','');
      toast.error('Error occured during registration. Please validate your input data.');
      toast.error(errorDetails);
      console.log("REGISTER ERROR:");
      console.log(errorDetails);
      console.log(error);
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();

      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
