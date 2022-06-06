import { formatDistance } from "date-fns";
import { Formik, Form, Field, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import SimpleWebRTC from "../../../app/webrtc/SimpleWebRtc";
import Avatar from "boring-avatars";

interface Props {
  activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        basic
        // inverted
        // color='teal'
        style={{
          // border: "none",
          // backgroundColor: "#dc493a"
          backgroundColor: "aliceblue",
        }}>
        <Header size='tiny' style={{ color: "grey" }}>
          Discussion
        </Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={Yup.object({
            body: Yup.string().required(),
          })}>
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className='ui form' typeof='' data-lpignore='true'>
              <Field name='body'>
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                      rows={2}
                      typeof='text'
                      {...props.field}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          return;
                        }
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          e.stopPropagation(); //to deal with last pass capturing enter key
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              {comment.image && (
                <Comment.Avatar
                  src={comment.image || "/assets/user.png"}
                  className='chatAvatar'
                />
              )}
              {!comment.image && (
                <span
                  style={{
                    float: "left",
                    marginBottom: "3%",
                    paddingRight: "10px",
                  }}>
                  <NavLink to={`/profiles/${comment.username}`}>
                    <Avatar
                      size={25}
                      name={comment.username}
                      variant='beam'
                      colors={[
                        "#D8C395",
                        "#F77825",
                        "#F5F03A",
                        "#F1EFA5",
                        "#60BB99A",
                      ]}
                    />
                  </NavLink>
                </span>
              )}
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    {comment.createdAt &&
                      formatDistance(
                        new Date(comment.createdAt),
                        new Date()
                      )}{" "}
                    ago
                  </div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
      {/* <Segment>
        <SimpleWebRTC />
      </Segment> */}
    </>
  );
});
