import React, { Fragment, useContext } from "react";
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
import { IActivity, IAttendee } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { history } from "../../../../src/index";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  // attendees: IAttendee[];
  activity: IActivity;
}

const ActivityDetailedSidebar: React.FC<IProps> = ({ activity }) => {
  const rootStore = useContext(RootStoreContext);
  const { rejectAttendance, loading, target } = rootStore.activityStore;
  const { attendees } = activity;

  return (
    <Fragment>
      <Header id="funkyHeader"> Guest List </Header>
      <Segment.Group style={{ borderRadius: "30px" }}>
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
        <Segment raised attached style={{ borderRadius: "30px" }}>
          <List relaxed divided>
            {attendees
              .filter((a) => a.isHost || a.isApproved)
              .map((attendee) => (
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
                    { activity.isHost && !attendee.isHost &&
                      attendee.isApproved && (
                        <Item.Extra>
                          <Button
                            negative
                            content={"Remove"}
                            basic
                            size="mini"
                            circular
                            icon="times"
                            floated='right'
                            onClick={(e)=>rejectAttendance(e,activity.id,attendee.username)}
                            loading={target === activity.id+attendee.username+'reject' && loading}
                            name={activity.id+attendee.username+'reject'}
                          />
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
