import React, { useContext, Fragment } from "react";
import { Icon, Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from "date-fns";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { activitiesByDate } = rootStore.activityStore;

  return (
    // <div style={{ height: "90vh", overflow: "auto" }}>
    <Fragment>
      <div style={{marginTop:"70px"}}/>
      {activitiesByDate.map(([group, activities]) => (
        <Segment raised key={group}>
          <Label color="red" ribbon={true}>
            {format(new Date(group), "eeee do MMMM")}
          </Label>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity}/>
            ))}
          </Item.Group>
        </Segment>
      ))}
      <Label>
        <Icon name="angle down" />
        <Label.Detail>Please scroll down to load more</Label.Detail>
      </Label>
    {/* </div> */}
    </Fragment>
  );
};

export default observer(ActivityList);
