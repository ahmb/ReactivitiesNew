import React, { Fragment } from "react";
import { Segment, Button, Placeholder, Grid } from "semantic-ui-react";
const ActivityListItemPlaceholder = () => {
  return (
    <Fragment>
      <Placeholder fluid>
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Grid>
              <Grid.Column width={12}>
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
            </Grid.Column>
            
            <Grid.Column width={4}>
            <Placeholder fluid>
              <Placeholder.Image  />
            </Placeholder>
              </Grid.Column>

            </Grid>
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
