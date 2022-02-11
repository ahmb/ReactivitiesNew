import React from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import { Route, Switch, useLocation } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  key={location.key}
                  exact
                  path='/activities'
                  component={ActivityDashboard}
                />
                <Route
                  key={location.key}
                  path='/activities/:id'
                  component={ActivityDetails}
                />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route
                  key={location.key}
                  path='/errors'
                  component={TestError}
                />
                <Route path='/server-error' component={ServerError} />
                <Route key={location.key} component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
