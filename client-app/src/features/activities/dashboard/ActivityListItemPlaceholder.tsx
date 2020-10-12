import React, { Fragment } from "react";
import { Segment, Button, Placeholder } from "semantic-ui-react";
const ActivityListItemPlaceholder = () => {
  return (
    <Fragment>
      <Placeholder fluid style={{ marginTop: 50 }}>
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Placeholder fluid>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>


              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
            <br/>
              <Button
                disabled
                // onClick={() => selectActivity(activity.id)}
                content="Details"
                // color="twitter"
                inverted
                style={{ backgroundColor: "#3f3d56" }}
                size="tiny"
                circular
              />
          </Segment>
          <Segment>
            <Placeholder fluid>
              <Placeholder.Image  />
            </Placeholder>
          </Segment>
          {/* <Segment clearing>
            <Button disabled color='blue' floated='right' content='View' />
          </Segment> */}
        </Segment.Group>
      </Placeholder>
    </Fragment>
  );
};
export default ActivityListItemPlaceholder;
