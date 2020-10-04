import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {format} from 'date-fns';

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { activitiesByDate } = rootStore.activityStore;

  return (
    
    <div style={{height:'90vh',overflow:'auto'}}>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="grey" style={{width:'99%'}}>
            {format(new Date(group), 'eeee do MMMM')}
          </Label>
            <Item.Group divided>
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </div>
  );
};

export default observer(ActivityList);
