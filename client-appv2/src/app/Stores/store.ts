import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);

// react hook to allow us to use the context that has been created in create context
export function useStore() {
  return useContext(StoreContext);
}
