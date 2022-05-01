import React, { useEffect, useState } from "react";
import { Grid, Header, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import Slideshow from "../../../app/layout/Slideshow";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } =
    activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  // if (activityStore.loadingInitial && !loadingNext)
  //   return <LoadingComponent content='Loading activities' />;

  return (
    <Grid>
      <Grid.Row centered>
        <Slideshow />
      </Grid.Row>
      <ActivityFilters />

      <Grid.Row style={{ paddingTop: "0px" }}>
        <Grid.Column style={{ padding: "0px" }}>
          {activityStore.loadingInitial && !loadingNext ? (
            <>
              <ActivityListItemPlaceholder />
              <ActivityListItemPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination?.currentPage < pagination?.totalPages
              }
              initialLoad={false}>
              <ActivityList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered style={{ paddingBottom: "100px" }}>
        <Grid.Column width={16}>
          <Header id='logo' style={{ color: "grey", textAlign: "center" }}>
            Feeling bored?
            <br /> Start an activity!
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
});
