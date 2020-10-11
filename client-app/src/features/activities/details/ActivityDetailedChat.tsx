import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import  {formatDistance } from 'date-fns'

const ActivityDetailedChat = () => {
  //bring in the activity store
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
  } = rootStore.activityStore;

  useEffect(() => {
    //updated
    createHubConnection(activity!.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  return (
    <Fragment> <Segment.Group>
      <Segment
        textAlign="center"
        inverted
        padded
        raised
        style={{ border: "none" , backgroundColor: "#DC493A"}}
      >
        <Header>Discussion</Header>
      </Segment>
      <Segment raised >
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(new Date(comment.createdAt), new Date())}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Add your comment"
                />
                <Button
                  content="Submit Comment"
                  labelPosition="left"
                  icon="reply"
                  // primary
                  loading={submitting}
                  color="green"
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment></Segment.Group>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
