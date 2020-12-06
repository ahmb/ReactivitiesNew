import React, { Fragment } from "react";
import {
  Segment,
  Button,
  Placeholder,
  Card,
  Image,
  PlaceholderLine,
  PlaceholderHeader,
} from "semantic-ui-react";
const MessageThreadsListPlaceholder = () => {
  return (
    <Fragment>
      <Card.Group>
        <Card
          style={{
            margin: 0,
            backgroundColor: "white",
            borderWidth: 1,
            borderRadius: 0,
            padding: 10,
            width: "100%",
          }}
        >
          <Card.Content>
            <Fragment>
              <Image
                src={"/assets/user.png"}
                // style={{ minHeight: 100, objectFit: "cover" }}
                size="mini"
                floated="right"
                circular
                id="messageThreadsListDisplayPic"
              />

              <Card.Header>
                <Placeholder className="messageThreadListPlaceholder">
                  <PlaceholderHeader />
                </Placeholder>
              </Card.Header>
              <Card.Meta>
                {" "}
                <Placeholder>
                  <PlaceholderLine />
                </Placeholder>
              </Card.Meta>
              <Card.Meta>
                {" "}
                <Placeholder>
                  <PlaceholderLine />
                </Placeholder>
              </Card.Meta>

              <Card.Description>
                <Placeholder>
                  <PlaceholderLine />
                  <PlaceholderLine />
                </Placeholder>
              </Card.Description>
              {/* 
              <Placeholder.Header image>
                <Placeholder.Line style={{backgroundColor:'aliceblue'}}/>
              </Placeholder.Header> */}
            </Fragment>
          </Card.Content>
        </Card>

        {/* <Segment clearing>
            <Button disabled color='blue' floated='right' content='View' />
          </Segment> */}
      </Card.Group>
    </Fragment>
  );
};
export default MessageThreadsListPlaceholder;
