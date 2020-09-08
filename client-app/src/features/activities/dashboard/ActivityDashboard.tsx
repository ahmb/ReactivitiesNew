import React, { useEffect, useContext, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages,
  } = rootStore.activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handlerGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  //useEffect is the equivalent of componentdidmount/update/delete
  //the second argument of the empty array tells it to only perform this effect once
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Grid>
      {/* <Grid.Row>
        <Segment clearing>
        <ActivityMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIWR5j2ebr6JoplIEQyn5fh4_Pw-7Pr3c&v=3.exp"
          loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
          containerElement={<div style={{ height: `400px` , width: `400`}} />}
          mapElement={<div style={{ height: `100%` , width: `100%`}} />}
        />
        </Segment>
      </Grid.Row> */}
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList />
          <Button
            floated="right"
            content="More..."
            positive
            onClick={handlerGetNext}
            loading={loadingNext}
            disabled={totalPages == page + 1}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Filters</h2>
          <h2> This is a filter</h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ActivityDashboard);
