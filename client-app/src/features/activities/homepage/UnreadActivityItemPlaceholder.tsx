import React, { Fragment } from "react";
import {
  Segment,
  Button,
  Placeholder,
  Card,
  PlaceholderLine,
  Image,
} from "semantic-ui-react";
const UnreadActivityItemPlaceholder = () => {
  return (
    <Fragment>
      {/* <Card.Group> */}
      <Placeholder>
        <Placeholder.Line style={{ backgroundColor: "transparent" }} />
      </Placeholder>
      <Card
        style={{
          margin: 15,
          marginTop: 30,
          borderColor: "aliceblue",
          borderWidth: 1,
          borderRadius: 30,
          padding: 10,
          width: "250px",
        }}
      >
        <Card.Content>
          {/* <Placeholder style={{ borderRadius: 20, borderWidth: 1 }}> */}
            {/* 
              <Placeholder.Header image>
                <Placeholder.Line style={{backgroundColor:'aliceblue'}}/>
              </Placeholder.Header> */}

            <Card.Header>
              <PlaceholderLine />
            </Card.Header>
            <Image
              src={"/assets/user.png"}
              // style={{ minHeight: 100, objectFit: "cover" }}
              size="mini"
              floated="right"
              circular
              id="messageThreadsListDisplayPic"
            />

            <Card.Description>
              <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
              </Placeholder>
            </Card.Description>
            <Card.Content extra>
              <br />
              <Card.Meta>
                <span>
                  <Button
                    content={"Approve"}
                    basic
                    size="mini"
                    circular
                    icon="check"
                    disabled
                  />
                  <Button
                    content={"Reject"}
                    basic
                    size="mini"
                    circular
                    icon="times"
                    disabled
                  />
                </span>
              </Card.Meta>
            </Card.Content>
          {/* </Placeholder> */}
        </Card.Content>
      </Card>

      {/* <Segment clearing>
            <Button disabled color='blue' floated='right' content='View' />
          </Segment> */}
    </Fragment>
  );
};
export default UnreadActivityItemPlaceholder;
