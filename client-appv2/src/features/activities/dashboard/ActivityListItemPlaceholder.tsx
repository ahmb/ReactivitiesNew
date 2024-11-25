import { Fragment } from "react";
import { Segment, Button, Placeholder } from "semantic-ui-react";

export default function ActivityListItemPlaceholder() {
  return (
    <Fragment>
      {/* <Placeholder fluid style={{ marginTop: 25 }}> */}
      <Segment.Group>
        <Segment>
          <Placeholder fluid>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>

            <Placeholder.Image
              style={{ minHeight: "200px", borderRadius: "20px" }}
            />
            <Placeholder.Header image></Placeholder.Header>
            {/* <Grid.Row>
                <Grid.Column width={16}>
                  <Placeholder.Header />
                </Grid.Column>
              </Grid.Row> */}

            {/* <Grid.Row>
                  <Grid.Column width={16}> */}
            {/* </Grid.Column>
                </Grid.Row>
                <Grid.Row> */}
            {/* <Grid.Row>
              <Grid.Column width={8}>
                <Placeholder.Image />
              </Grid.Column>
              <Grid.Column width={8}>Hi</Grid.Column>
            </Grid.Row> */}

            {/* </Grid.Row> */}

            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line length='medium' />
              <Placeholder.Line length='medium' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>

        <Segment clearing>
          <Button
            circular
            disabled
            floated='right'
            content='View'
            style={{
              margin: "10px",
              boxShadow: "#404cb8 1px 3px 0px 0px",
              backgroundColor: "#5162FA",
              color: "white",
            }}
          />
        </Segment>
      </Segment.Group>
      {/* </Placeholder> */}
    </Fragment>
  );
}
