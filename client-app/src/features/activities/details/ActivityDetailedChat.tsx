import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment, List, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { reaction } from "mobx";
import { act } from "@testing-library/react";
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

const ActivityDetailedChat: React.FC<IProps> = ({ displayHeight }) => {
  //bring in the activity store
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
    onlineUsers,
  } = rootStore.activityStore;
  var { comments } = activity!;

  useEffect(() => {
    //updated
    createHubConnection(activity!.id);
    var objDiv = document.getElementById("commentGroup");
    if (objDiv) {
      objDiv.animate({ top: objDiv.scrollHeight }, 500);
      // objDiv.scrollTop = objDiv.scrollHeight;
      // objDiv.scrollTop = objDiv.scrollHeight;
    }
    //FIXME:the component gets mounted and prints out null, but then when the value is updated
    // console.log("ON DETAILED CHAT COMP MOUNT");
    // console.log(onlineUsers[activity?.id!]);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  useEffect(() => {
    //updated
    var objDiv = document.getElementById("commentGroup");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    return () => {};
  }, [activity!.comments.keys()]);

  return (
    <Fragment>
      <Header id='funkyHeader'> Group Chat </Header>
      <Segment.Group raised  style={{borderRadius:'30px'}}>
        <Segment style={{borderRadius:'30px 30px 0 0', backgroundColor:"aliceblue", border:"none"}}>
          <Header as="h5" disabled style={{}}>
            online:
          </Header>
          <List horizontal>
            {onlineUsers[activity?.id!] !== undefined &&
              onlineUsers[activity?.id!] !== null &&
              Array.from(onlineUsers[activity?.id!]).map((i) => {
                return <List.Item key={i}> <span><Icon name='circle' color='green'/></span>{i} </List.Item>;
              })}
          </List>
          {/* 
          {Array.from(onlineUsers[activity?.id!]).length > 0 &&
            Array.from(onlineUsers[activity?.id!]).forEach((i) => {
              return <p>{i}</p>;
            })} */}
        </Segment>

        <Segment style={{border:"none"}}>
          <div
            id="commentGroup"
            style={{ maxHeight: displayHeight, overflow: "auto" }}
          >
            <Comment.Group>
              {activity && activity.comments.length == 0 && (
                <Header disabled as="a4">
                  Start the conversation
                </Header>
              )}

              {activity &&
                activity.comments &&
                activity.comments.map((comment) => (
                  <Comment key={comment.id}>
                    <Comment.Avatar
                      src={comment.image || "/assets/user.png"}
                      className="commentAvatar"
                    />
                    <Comment.Content>
                      <Comment.Author
                        as={Link}
                        to={`/profile/${comment.username}`}
                      >
                        {comment.displayName}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>
                          {formatDistance(
                            new Date(comment.createdAt),
                            new Date()
                          )} ago
                        </div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.body}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))}
            </Comment.Group>
          </div>
        </Segment>
        <Segment style={{borderRadius:'0 0 30px 30px', backgroundColor:"aliceblue", border:"none"}}>
          <FinalForm
            onSubmit={addComment}
            validate={validate}
            render={({ handleSubmit, submitting, form, invalid, pristine }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Please type your message here.."
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
      </Segment.Group>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
