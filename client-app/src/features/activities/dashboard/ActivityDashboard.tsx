import React, { useEffect, useContext, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

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
          {loadingInitial && page === 0 ? (
            <ActivityListItemPlaceholder />
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handlerGetNext}
              hasMore={!loadingNext && page + 1 < totalPages}
              initialLoad={false}
            >
              <ActivityList />
            </InfiniteScroll>
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityFilters />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ActivityDashboard);
