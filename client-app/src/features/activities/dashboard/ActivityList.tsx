import React, { useContext, Fragment, useState, useEffect } from "react";
import { Icon, Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format, formatDistance } from "date-fns";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { activitiesByDate, page, totalPages } = rootStore.activityStore;

  const [morePages, setMorePages] = useState(true);

  useEffect(() => {
    if (page === totalPages - 1) {
      setMorePages(false);
    }
    if (totalPages === 0) {
      setMorePages(false);
    }
    console.log("page count", page);
    console.log("totalPages count", totalPages);
  }, [page, totalPages]);

  return (
    // <div style={{ height: "90vh", overflow: "auto" }}>
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Segment key={group} style={{ backgroundColor: "aliceblue" }}>
          {/* "2020-11-29T01:00:00", */}
          <Label color="red" ribbon={true} size="large">
            {format(
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
                .replace("1 day ago", "yesterday")}
          </Label>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Segment>
      ))}
      {morePages && (
        <Label>
          <Icon name="angle down" />
          <Label.Detail>Please scroll down to load more</Label.Detail>
        </Label>
      )}
      {!morePages && (
        <Label>
          <Icon name="angle down" />
          <Label.Detail>You are at the end of the list</Label.Detail>
        </Label>
      )}
      {/* </div> */}
    </Fragment>
  );
};

export default observer(ActivityList);
