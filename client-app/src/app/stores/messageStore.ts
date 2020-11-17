import {
  observable,
  action,
  computed,
  runInAction,
  reaction,
  toJS,
} from "mobx";
import { RootStore } from "./rootStore";
import "mobx-react-lite/batchingForReactDom";
import { history } from "../..";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import agent from "../api/agent";
import { IMessage, IThread } from "../models/message";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export default class MessageStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable messageThreadList: IThread[] = [];
  @observable messageRegistry = new Map();
  @observable submitting = false;
  @observable loadingInitial = false;
  @observable currentThread: IThread | null = null;
  @observable previousThread: IThread | null = null;
  @observable loadingCurrentThread = false;
  @observable connected = false;

  @action loadThreads = async () => {
    runInAction(() => {
      this.loadingInitial = true;
    });
    try {
      let threads: IThread[] = await agent.Messages.list();
      if (threads.length > 0) {
        runInAction("loading messages", () => {
          while (this.messageThreadList.length !== 0) {
            this.messageThreadList.pop();
          }
          threads.forEach((thread) => {
            this.messageRegistry.set(thread.id, thread);
            this.messageThreadList.push(thread);
          });
          this.loadingInitial = false;
          if (this.currentThread) {
            this.loadThreadDetails(this.currentThread.id);
          }
        });
      }
      return threads;
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadThreadDetails = async (id: string) => {
    // if (this.currentThread?.id === id) {
    //   return this.currentThread;
    // }
    this.loadingCurrentThread = true;
    try {
      let thread: IThread = await agent.Messages.details(id);
      if (thread !== null) {
        runInAction("loading thread messages", () => {
          //make a copy of the previous thread to  use in stop hub connection
          this.previousThread = this.currentThread;
          this.currentThread = thread;
          this.loadingCurrentThread = false;
        });
      }
      return thread;
    } catch (error) {
      runInAction(() => {
        this.loadingCurrentThread = false;
        console.log(error);
      });
    }
  };

  //only loaded on the message details page, or else this is null
  @observable.ref hubConnection: HubConnection | null = null;

  @action startHubConnection = () => {
    //configure the hubconnection
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    if (this.hubConnection?.state === "Disconnected") {
      //start the connection
      this.hubConnection
        .start()
        .then(() => console.log(this.hubConnection?.state))
        .catch((error) =>
          console.log("Error establishing connection: ", error)
        );
    }

    //configure the hubconnection what to do when it recieves a comment
    //"RecieveComment" is in the ChatHub.cs
    this.hubConnection.on("RecieveMessage", (message: IMessage) => {
      //add the comment to the comments array inside the activity object
      console.log(message);
      // message.threadId  = this.currentThread!.id;
      runInAction(() => {
        this.currentThread!.messages.push(message);
        this.messageThreadList.forEach((t) => {
          if (t.id === this.currentThread!.id) {
            t.messages.push(message);
          }
        });
      });
    });

    this.hubConnection.on("RecieveThread", (thread: IThread) => {
      //add the comment to the comments array inside the activity object
      console.log('thread recieved!!');

      console.log(thread);
      // message.threadId  = this.currentThread!.id;
      runInAction(() => {
        this.messageThreadList!.push(thread);
      });
    });

    this.hubConnection.on("RecieveError", (error: any) => {
      //add the comment to the comments array inside the activity object
      console.log('error recieved!!');
      toast.error('error recieved!!')

      console.log(error);
      toast.error('Ran into an issue, please refresh the page.')
    });

    this.hubConnection.on("Send", (message: string) => {
      //TODO:uncomment if you want to get toasts
      toast.info(message);
    });
  };

  @action stopHubConnection = () => {
    if (this.hubConnection?.state === "Connected") {
      this.hubConnection!.stop()
        .then(() => console.log("Connection stopped"))
        .catch((err) => console.log("error", err));
    }
  };

  @action removeFromHubConnection = (id: string) => {
    if (this.hubConnection?.state === "Connected") {
      this.hubConnection!.invoke("RemoveFromGroup", id)
        .then(() => console.log("Removed from group", id))
        .catch((err) => console.log("Error removing from group", err));
    }
  };

  @action addToHubConnection = (id: string) => {
    if (this.hubConnection?.state === "Connected") {
      console.log("Attempting to join group");
      if (this.hubConnection!.state === "Connected")
        this.hubConnection
          ?.invoke("AddToGroup", id)
          .then(() => console.log("Added to group", id))
          .catch((err) => console.log("Error adding to group", err));
    }
  };

  //to match the create comment command , the property in values should match
  @action addMessage = async (values: any) => {
    console.log("logging values:");
    console.log(values);
    values.ThreadId = this.currentThread!.id;
    values.sentDateTime = new Date();
    values.messageId = uuid().toString();
    values.threadId = this.currentThread?.id;
    try {
      //this SendComment must match directly with the
      await this.hubConnection!.invoke("SendMessage", values);
    } catch (error) {
      console.log(error);
      toast.warning("An error occured while sending the message. Please refresh the page");
    }
  };

  @action addThread = async (values: any) => {
    console.log("logging values for addThread:");
    console.log(values);
    values.ThreadId = uuid().toString();
    values.sentDateTime = new Date();
    values.messageId = uuid().toString();
    values.Id = values.ThreadId;
    if (String(values.To).startsWith("@")) {
      values.To = String(values.To).substring(1);
    }
    try {
      //this SendComment must match directly with the
      this.addToHubConnection(values.Id);
      await this.hubConnection!.invoke("SendThread", values);
    } catch (error) {
      console.log(error);
      toast.info("An error occured while creating a conversation. Please refresh the page");
      toast.info(error);
    }
  };

  @action clearCurrentThread = () => {
    this.currentThread = null;
  };
}
