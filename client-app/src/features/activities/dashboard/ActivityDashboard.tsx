import React, {
  useEffect,
  useContext,
  useState,
  Fragment,
  useRef,
} from "react";
import { Button, Grid, GridRow, Loader, Ref, Sticky } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import { NavLink } from "react-router-dom";
import Mapi from "../../../app/common/map/Map";

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
  const contextRef = useRef<HTMLElement | undefined>();

  //useEffect is the equivalent of componentdidmount/update/delete
  //the second argument of the empty array tells it to only perform this effect once
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Fragment>
      <Grid centered columns={2} className="mainPageGrid">
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
        <Grid.Row height='90vh'>
          <Grid.Column height='85vh'>
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
                <ActivityList/>
              </InfiniteScroll>
            )}
          </Grid.Column>
          <Grid.Column>
            <Mapi />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column >
            <Loader active={loadingNext} />
          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default observer(ActivityDashboard);
