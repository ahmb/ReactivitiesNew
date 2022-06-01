import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon, Container, Button } from "semantic-ui-react";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { onClickUrl } from "../../../app/common/util/helpers";
import { Activity, ActivityDetails } from "../../../app/models/activity";

interface Props {
  activity: ActivityDetails;
}

export default observer(function ActivityDetailedInfo({ activity }: Props) {
  return (
    <>
      <Segment.Group>
        <Segment attached='top'>
          <Grid verticalAlign='middle'>
            <Grid.Column width={16}>
              <p
                // className='altFontColor'
                style={{
                  color: "grey",
                  textAlign: "center",
                  fontSize: "small",
                  marginBottom: "20px",
                }}>
                Details
              </p>
              <Container
                style={{
                  fontSize: "18px",
                  // padding: "5%",
                  // paddingBottom: "2%",
                }}>
                {activity.description}
                {activity.tag.length > 0 && (
                  // <Segment attached style={{ backgroundColor: "aliceblue" }}>
                  <Grid
                    verticalAlign='middle'
                    style={{
                      marginTop: "5%",
                      // paddingBottom: "0px",
                      // marginBottom: "0px",
                    }}>
                    <Grid.Row
                      // textAlign='left'
                      verticalAlign='middle'
                      style={
                        {
                          // marginTop: "10px",
                          // paddingBottom: "5px",
                          // marginBottom: "1%",
                          // paddingLeft: "15px",
                        }
                      }>
                      {activity.categories.map((c) => (
                        <Grid.Column
                          key={c.name}
                          width={5}
                          // textAlign='center'
                          // style={{ paddingLeft: "0px" }}
                        >
                          <p id='listCategories'>
                            {categoryOptions.filter(
                              (co) => co.value === c.name
                            )[0].icon +
                              " " +
                              categoryOptions.filter(
                                (co) => co.value === c.name
                              )[0].text +
                              "  "}
                          </p>
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                    <Grid.Row
                      style={
                        {
                          // paddingTop: "0px",
                          // paddingBottom: "0px",
                          // paddingLeft: "15px",
                          // marginBottom: "10px",
                        }
                      }>
                      {activity.tag.map((t) => (
                        // <Grid.Column width={5} textAlign='center'>
                        <p
                          id='listTags'
                          style={{ paddingLeft: "2%" }}
                          key={t.name}>
                          <span className='fontColor'>#</span>
                          {t.name}
                        </p>
                        // </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                  // </Segment>
                )}
              </Container>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
      {/* <Segment attached style={{ backgroundColor: "aliceblue" }}> */}

      {/* </Segment> */}

      {activity.attendees && (
        <>
          <Grid verticalAlign='middle' textAlign='center'>
            <Grid.Column width={8}>
              <Button
                // floated='right'
                circular
                content='Download Calendar Invite'
                style={{
                  backgroundColor: "#b0b0b0",
                  color: "white",
                  boxShadow: "grey 1px 3px 0px 0px",
                }}
                icon='calendar check'
                disabled={true}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              //TODO: update with correct url depending on env
              <Button
                icon='external alternate'
                content='Open Chatroom'
                // floated='right'
                circular
                style={{
                  backgroundColor: "#5162FA",
                  color: "white",
                  boxShadow: "#404cb8 1px 3px 0px 0px",
                }}
                onClick={onClickUrl(
                  `http://localhost:8080/?name=${activity.id}&user=ahmad&pass=${activity.chatPassword}`
                  // `http://localhost:5000/chatroom/index.html?name=${activity.id}&user=ahmad&pass=${activity.chatPassword}`
                )}
              />
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  );
});
