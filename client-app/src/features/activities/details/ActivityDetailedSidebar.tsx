import React, { Fragment } from "react";
import {
  Segment,
  List,
  Item,
  Label,
  Image,
  Button,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAttendee } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { history } from "../../../../src/index";

interface IProps {
  attendees: IAttendee[];
}

const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  
  return (
    <Fragment>
        <Header id='funkyHeader'> Guest List </Header>
      <Segment.Group style={{borderRadius:'30px'}}>
        {/* <Segment
          raised
          textAlign="center"
          style={{ border: "none", backgroundColor: "#3f3d56" }}
          attached="top"
          inverted
        >
          {attendees.length} {attendees.length === 1 ? "person" : "people"}{" "}
          attending
        </Segment> */}
        <Segment raised attached style={{borderRadius:'30px'}}>
          <List relaxed divided>
            {attendees.map((attendee) => (
              <Item key={attendee.username} style={{ position: "relative" }}>
                {attendee.isHost && (
                  <Label
                    style={{
                      position: "absolute",
                      backgroundColor: "#DC493A",
                      color: "white",
                      zIndex: "10",
                    }}
                    // color="red"
                    ribbon
                  >
                    Host
                  </Label>
                )}
                <Image
                  size="tiny"
                  src={attendee.image || "/assets/user.png"}
                  circular
                  floated="left"
                />
                <br />
                <br />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.username}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                  {attendee.following && (
                    <Item.Extra style={{ color: "orange" }}>
                      Following
                    </Item.Extra>
                  )}
                </Item.Content>
              </Item>
            ))}
          </List>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default observer(ActivityDetailedSidebar);
