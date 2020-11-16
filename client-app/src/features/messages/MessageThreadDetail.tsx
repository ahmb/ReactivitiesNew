import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Segment,
  Comment,
  SegmentGroup,
  Form,
  Button,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { formatDistance } from "date-fns";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import TextInput from "../../app/common/form/TextInput";
import { Link } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../app/common/form/TextAreaInput";

import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  composeValidators,
  matchesPattern,
} from "revalidate";

let emptySpace = new RegExp("[^ ]");
let carriageReturn = new RegExp("[^\\r]");
let tab = new RegExp("[^\\t]");
let lineFeed = new RegExp("[^\\n]");
let legalCharacters = new RegExp(
  String.raw`[A-Za-z0-9\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\^\_\`\~]`
);

const validate = combineValidators({
  body: composeValidators(
    // isRequired("Body"),
    matchesPattern(legalCharacters)({
      message: "Cannot send a message with illegal characters",
    }),
    matchesPattern(emptySpace)({
      message: "Cannot send an empty message",
    }),
    matchesPattern(tab)({
      message: "Cannot send an empty message",
    }),
    matchesPattern(carriageReturn)({
      message: "Cannot send an empty message",
    }),
    matchesPattern(lineFeed)({
      message: "Cannot send an empty message",
    }),
    hasLengthGreaterThan(0)({
      message: "Cannot send an empty message",
    })
  )("Body"),
});

interface IProps {
  displayHeight: string;
}

export const MessageThreadDetail: React.FC<IProps> = ({
  displayHeight = "60vh",
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    currentThread,
    loadingCurrentThread,
    loadThreadDetails,
    addToHubConnection,
    addMessage,
    removeFromHubConnection,
    previousThread,
  } = rootStore.messageStore;
  const { user } = rootStore.userStore;
  const [connected,setConnected] = useState(false);

  useEffect(() => {
    var objDiv = document.getElementById("commentGroup");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
      //FIXME:why isnt the animate working here?
      objDiv.animate({ scrolltop: objDiv.scrollHeight }, 500);
    }
  }, [currentThread?.messages.keys()]);

  useEffect(() => {
    //updated
    if (currentThread) {
      console.log(currentThread);
      if (previousThread?.id) {
        removeFromHubConnection(previousThread.id);
      }
      addToHubConnection(currentThread!.id);
      setConnected(true);
    }
    var objDiv = document.getElementById("commentGroup");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
      objDiv.animate({ scrolltop: objDiv.scrollHeight }, 500);
      // objDiv.scrollTop = objDiv.scrollHeight;
      // objDiv.scrollTop = objDiv.scrollHeight;
    }
    //FIXME:the component gets mounted and prints out null, but then when the value is updated
    // console.log("ON DETAILED CHAT COMP MOUNT");
    // console.log(onlineUsers[activity?.id!]);
    return () => {
      console.log('running use effect return now:')
    };
  }, [addToHubConnection, removeFromHubConnection, previousThread, currentThread]);

  if (loadingCurrentThread)
    return <LoadingComponent content="Loading messages.." />;

  return (
    <SegmentGroup raised>
      <Segment>
        To:{" "}
        {currentThread?.participants
          .filter((p) => p.appUserUserName !== user?.username)
          .map((p) => (
            <Link key={p.appUserUserName} to={`/profile/${p.appUserUserName}`}>
              @{p.appUserUserName}
            </Link>
          ))}
      </Segment>
      <Segment>
        <div
          id="commentGroup"
          style={{ height: displayHeight, overflow: "auto" }}
        >
          <Comment.Group>
            {currentThread &&
              currentThread?.messages.map((message) => {
                return (
                  <Comment key={message.id}>
                    <Comment.Avatar
                      src={"/assets/user.png"}
                      className="commentAvatar"
                    />
                    <Comment.Content>
                      <Comment.Author>{message.appUserUserName}</Comment.Author>
                      <Comment.Metadata>
                        {message.sentDateTime}
                      </Comment.Metadata>
                      <Comment.Text>{message.body}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                );
              })}
          </Comment.Group>
        </div>
        {!currentThread && <p>nothing in the current thread</p>}
      </Segment>
      <Segment style={{ backgroundColor: "white", border: "none" }}>
        <FinalForm
          onSubmit={addMessage}
          validate={validate}
          render={({ handleSubmit, submitting, form, invalid, pristine }) => (
            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
              <Field
                name="body"
                component={TextAreaInput}
                rows={2}
                placeholder="Please type your message here.."
                disabled = {!connected}
              />
              <Button
                content="Send"
                labelPosition="left"
                icon="comment alternate outline"
                // primary
                loading={submitting}
                // color="green"
                disabled={pristine || invalid}
                style={{ backgroundColor: "#dc493a" }}
                inverted
              />
            </Form>
          )}
        />
      </Segment>
    </SegmentGroup>
    // {formatDistance(
    //     new Date(comment.createdAt),
    //     new Date()
    //   )} ago
  );
};

export default observer(MessageThreadDetail);
