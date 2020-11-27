import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import UnreadActivityItemPlaceholder from "../activities/homepage/UnreadActivityItemPlaceholder";

const MessageThreadsList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    messageRegistry,
    loadThreads,
    currentThread,
    messageThreadList,
    loadingInitial,
    loadThreadDetails,
    clearCurrentThread,
  } = rootStore.messageStore;

  const { user } = rootStore.userStore;

  useEffect(() => {
    // if (messageThreadList.length < 1) {
    loadThreads();
    // }
  }, [loadThreads, messageThreadList.keys]);

  return (
    <div>
      <Header
        size="tiny"
        style={{
          marginBottom: "10px",
        }}
      >
        Conversation List
        <Button
          positive
          size="tiny"
          content="New Message"
          inverted
          circular
          icon="plus"
          style={{
            backgroundColor: "#dc493a",
            float: "right",
            display: "inline",
            marginRight: 0,
          }}
          onClick={clearCurrentThread}
        />
      </Header>
      <br />

      {loadingInitial && (
        <Fragment>
          <UnreadActivityItemPlaceholder />
          <UnreadActivityItemPlaceholder />
          <UnreadActivityItemPlaceholder />
        </Fragment>
      )}

      <Card.Group>
        {messageThreadList.map((thread) => {
          return (
            <Card
              key={thread.id}
              style={
                (thread.id !== currentThread?.id && {
                  margin: 0,
                  backgroundColor: "aliceblue",
                  borderWidth: 1,
                  borderRadius: 0,
                  padding: 10,
                  width: "100%",
                }) || {
                  margin: 0,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 0,
                  padding: 10,
                  width: "100%",
                }
              }
              raised={thread.id === currentThread?.id}
              onClick={() => loadThreadDetails(thread.id)}
            >
              <Card.Content>
                {thread.participants
                  .filter((p) => p.appUserUserName !== user?.username)
                  .map((p) => (
                    // <Card.Header as={Link} to={`/profile/${p.appUserUserName}`}>
                    <Card.Header key={p.appUserUserName}>
                      @{p.appUserUserName}
                    </Card.Header>
                  ))}

                {/* {thread.messages.map((m) => {
                  return (
                    <Fragment>
                      <Card.Description>{m.body}</Card.Description>
                      <Card.Meta>{m.setDateTime}</Card.Meta>
                    </Fragment>
                  );
                })} */}

                <Card.Meta>
                  {thread.messages[thread.messages.length - 1].sentDateTime}
                </Card.Meta>
                <Card.Description>
                  {thread.messages[thread.messages.length - 1].body}
                </Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
};
export default observer(MessageThreadsList);
