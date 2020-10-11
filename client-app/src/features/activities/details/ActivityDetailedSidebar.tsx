import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAttendee } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";

interface IProps {
  attendees: IAttendee[];
}

const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment
          raised
          textAlign="center"
          style={{ border: "none", backgroundColor: "#DC493A" }}
          attached="top"
          secondary
          inverted
        >
          {attendees.length} {attendees.length === 1 ? "person" : "people"}{" "}
          attending
        </Segment>
        <Segment raised attached>
          <List relaxed divided>
            {attendees.map((attendee) => (
              <Item key={attendee.username} style={{ position: "relative" }}>
                {attendee.isHost && (
                  <Label
                    style={{
                      position: "absolute",
                      backgroundColor: "#009ee6",
                      color: "white",
                    }}
                    // color="red"
                    ribbon="right"
                  >
                    Host
                  </Label>
                )}
                <Image
                  size="tiny"
                  src={attendee.image || "/assets/user.png"}
                  circular
                />
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
