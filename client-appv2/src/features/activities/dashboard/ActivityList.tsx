import React, { Fragment } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { format } from "date-fns";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          {/* <div className='zigZagBorder'> */}
          <Segment
            basic
            className='zigZagBorder'
            style={{
              backgroundColor: "aliceblue",
              paddingBottom: "60px",
              marginBottom: "33px",
            }}>
            <Label
              style={{ backgroundColor: "#5162FA", color: "white" }}
              ribbon={true}
              size='large'>
              {/* {format(
                new Date(
                  parseInt(group.split("-")[0]),
                  parseInt(group.split("-")[1]) - 1,
                  parseInt(group.split("-")[2])
                ),
                "eeee do MMMM"
              )}
              {" , " +
                formatDistance(
                  new Date(
                    parseInt(group.split("-")[0]),
                    parseInt(group.split("-")[1]) - 1,
                    parseInt(group.split("-")[2]),
                    0,
                    0,
                    0,
                    0
                  ),
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    0,
                    0,
                    0,
                    0
                  ),
                  { addSuffix: true }
                )
                  .replace("less than a minute ago", "today!")
                  .replace("1 day ago", "yesterday")} */}
              {format(new Date(group), "eeee do MMMM")}
            </Label>

            {new Date(group).getDate() === new Date().getDate() && (
              <Header
                size='huge'
                textAlign='center'
                style={{ color: "#5162FA" }}>
                Today!
              </Header>
            )}

            {new Date(group).getDate() === new Date().getDate() + 1 &&
              new Date(group).getHours() !== new Date().getHours() && (
                <Header size='huge' textAlign='center'>
                  Tomorrow!
                </Header>
              )}

            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Segment>
          {/* </div> */}
        </Fragment>
      ))}
    </>
  );
});
