import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

// react hook to allow us to use the context that has been created in create context
export function useStore() {
  return useContext(StoreContext);
}
