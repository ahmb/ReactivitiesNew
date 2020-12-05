import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import "mobx-react-lite/batchingForReactDom";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import UnreadActivitiesList from "../../features/activities/homepage/UnreadActivitiesList";
import MessagesDashboard from "../../features/messages/MessagesDashboard";
import Homepage from "../../features/activities/homepage/Homepage";
import BottomNav from "../../features/nav/BottomNav";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;
  const isHomePage = location.pathname === "/activities";

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <Container fluid>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      {/* <Route exact path="/" component={HomePage} /> */}
      {/* <Route exact path="/" component={ActivityDashboard} /> */}
      <Route
        path={"/(.*)"}
        render={() => (
          <Fragment>
            <div className='wrapper'>
            <NavBar />

            {/* {isHomePage && <Mapi />} */}
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route  path="/" component={ActivityDashboard} />

                <Route
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  path="/profile/:username"
                  component={ProfilePage}
                />
                <PrivateRoute
                  path="/messages"
                  component={MessagesDashboard}
                />
                <PrivateRoute path="/home" component={Homepage} />

                <Route component={NotFound} />
              </Switch>
            </Container>
            <div className='push'></div>
            </div>
            <div className='footer'>
            <BottomNav/>
            </div>
          </Fragment>
        )}
      />
    </Container>
  );
};

export default withRouter(observer(App));
