import React, {
  useEffect,
  useContext,
  useState,
  Fragment,
} from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import { NavLink } from "react-router-dom";

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
    <Fragment>
      <Grid className="mainPageGrid">
        <Button
          as={NavLink}
          to="/createActivity"
          positive
          // content="Create Activity"
          icon="plus"
          circular
          size="massive"
          className="createActivityBtn"
        />
        <Grid.Row>
          <Grid.Column width={16}>
            <ActivityFilters />

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

          <Grid.Column width={16}>
            <Loader active={loadingNext} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default observer(ActivityDashboard);
