import React, {
  useEffect,
  useContext,
  useState,
  Fragment,
  useRef,
} from "react";
import {
  Button,
  Grid,
  GridRow,
  Loader,
  Menu,
  Ref,
  Sticky,
} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import { NavLink } from "react-router-dom";
import Mapi from "../../../app/common/map/Map";
import ActivityFiltersText from "./ActivityFiltersText";

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
  const activeItem = useState();

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
      <Grid className="mainPageGrid">
        {/* <Button
          as={NavLink}
          to="/createActivity"
          positive
          // content="Create Activity"
          icon="plus"
          circular
          size="massive"
          className="createActivityBtn"
        /> */}
        <Grid.Column width={4}>
          {/* <Mapi /> */}
          <div style={{ marginTop: "70px" }} />
          <div style={{ marginTop: "70px" }} />
          <ActivityFiltersText/>
        </Grid.Column>
        <Grid.Column width={12}>
          {/* <ActivityFilters /> */}

          {loadingInitial && page === 0 ? (
            <Fragment>
              <ActivityListItemPlaceholder />
              <ActivityListItemPlaceholder />
              <ActivityListItemPlaceholder />
            </Fragment>
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
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ActivityDashboard);
