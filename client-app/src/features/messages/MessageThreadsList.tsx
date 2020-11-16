import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header } from "semantic-ui-react";
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
  } = rootStore.messageStore;

  const { user } = rootStore.userStore;

  useEffect(() => {
    // if (messageThreadList.length < 1) {
      loadThreads();
    // }
  }, [loadThreads, messageThreadList]);

  return (
    <div>
      <Header disabled size="tiny">
        Conversations
      </Header>
      <Button
        positive
        size="tiny"
        content="New Message"
        inverted
        circular
        icon="plus"
        style={{
          marginBottom: "20px",
          width: "100%",
          backgroundColor: "#dc493a",
        }}
      />

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
                  margin: 5,
                  backgroundColor: "aliceblue",
                  borderWidth: 1,
                  borderRadius: 30,
                  padding: 10,
                  width: "100%",
                }) || {
                  margin: 5,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 30,
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
