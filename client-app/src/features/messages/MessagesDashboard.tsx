import { cleanup } from "@testing-library/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import MessageThreadDetail from "./MessageThreadDetail";
import MessageThreadsList from "./MessageThreadsList";

const MessagesDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        startHubConnection,
        stopHubConnection
    } = rootStore.messageStore;

    useEffect(() => {
        startHubConnection();
        return () => {
            stopHubConnection();
        }
    }, [startHubConnection,stopHubConnection])
    
  return (
    <Grid columns={16} >
      <Grid.Column width={5} style={{height:'100vh', overflow:'auto'}}>
        <MessageThreadsList />
      </Grid.Column>
      <Grid.Column width={11}>
        <MessageThreadDetail displayHeight={'50vh'}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MessagesDashboard);
