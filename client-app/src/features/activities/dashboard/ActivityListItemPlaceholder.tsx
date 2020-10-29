import React, { Fragment } from "react";
import { Segment, Button, Placeholder } from "semantic-ui-react";
const ActivityListItemPlaceholder = () => {
  return (
    <Fragment>
      <Placeholder fluid>
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
