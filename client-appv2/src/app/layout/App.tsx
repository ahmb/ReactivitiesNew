import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import { Route, Switch, useLocation } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import ConfirmEmail from "../../features/users/ConfirmEmail";
import CommonStore from "../stores/commonStore";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
  BodyScrollOptions,
} from "body-scroll-lock";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
  const options: BodyScrollOptions = {
    reserveScrollBarGap: true,
  };

  const lockScrollStyle = {
    // maxHeight: window.innerHeight,
    // overflowY: "hidden",
  };

  const unlockScrollStyle = {
    // height: "100%",
  };

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded());
    }

    setTargetElement(document.querySelector("#targetElementId"));
    if (commonStore.isSidebarOpen && targetElement !== null) {
      setScrollPosition(window.pageYOffset);
      // console.log(scrollPosition);
      // window.scrollTo(0, 0);
      disableBodyScroll(targetElement, options);
    }
    if (!commonStore.isSidebarOpen && targetElement !== null) {
      // console.log(scrollPosition);
      // window.scrollTo(0, scrollPosition);
      // enableBodyScroll(targetElement);
      clearAllBodyScrollLocks();
    }
  }, [
    commonStore,
    userStore,
    commonStore.isSidebarOpen,
    targetElement,
    setScrollPosition,
  ]);

  if (!commonStore.appLoaded)
    return (
      // <div style={{ marginTop: "20em" }}>
      <LoadingComponent content='Loading app..' style={{ marginTop: 0 }} />
      // </div>
    );

  return (
    <>
      <ToastContainer position='top-center' hideProgressBar />
      <ModalContainer />
      {/* <Route exact path='/' component={HomePage} /> */}

      <Route
        path={"/(.*)"}
        render={() => (
          <>
            <NavBar />

            <Sidebar.Pushable>
              <Sidebar
                id='targetElementId'
                as={Menu}
                animation='overlay'
                icon='labeled'
                direction='left'
                vertical
                visible={commonStore.isSidebarOpen}
                width='wide'
                style={
                  commonStore.isSidebarOpen
                    ? {
                        ...lockScrollStyle,
                        width: "100%",
                        position: "absolute",
                        top: scrollPosition,
                        maxHeight: window.innerHeight,
                        zIndex: "10",
                        // paddingTop: "60px",
                      }
                    : {
                        ...unlockScrollStyle,
                        width: "100%",
                        zIndex: "10",
                        // paddingTop: "60px",
                      }
                }>
                <Menu.Item style={{ padding: 50 }}>
                  <Button
                    onClick={(_) => commonStore.toggleSidebar()}
                    floated='left'
                    circular>
                    <Icon name='angle left' />
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  {/* <span style={{ display: "flex", textAlign: "center" }}> */}
                  <span id='logo' style={{ textAlign: "center" }}>
                    Wanna
                  </span>
                  <span id='logoAlt' style={{ textAlign: "center" }}>
                    Go
                  </span>
                  {/* </span> */}
                </Menu.Item>
                <Menu.Item as='a'>
                  <Header size='huge' style={{ display: "inline" }}>
                    🏠{" "}
                  </Header>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>
                  <Header size='huge' style={{ display: "inline" }}>
                    💡{" "}
                  </Header>
                  Activities
                </Menu.Item>
                <Menu.Item> </Menu.Item> <Menu.Item as='a'>FAQ</Menu.Item>{" "}
                <Menu.Item as='a'>About</Menu.Item>{" "}
                <Menu.Item as='a'>Contact</Menu.Item>{" "}
                <Menu.Item as='a'>Code of Conduct</Menu.Item>{" "}
                <Menu.Item as='a'>Terms of Service</Menu.Item>{" "}
              </Sidebar>

              <Sidebar.Pusher dimmed={commonStore.isSidebarOpen}>
                <Container
                  // id='targetElementId'
                  style={
                    commonStore.isSidebarOpen
                      ? { ...lockScrollStyle, marginTop: "7em" }
                      : { ...unlockScrollStyle, marginTop: "5em" }
                  }>
                  <Switch>
                    <Route exact path='/' component={ActivityDashboard} />

                    {/* <Route exact path='/' component={ActivityDashboard} /> */}
                    <Route path='/activities/:id' component={ActivityDetails} />
                    <PrivateRoute
                      key={location.key}
                      path={["/createActivity", "/manage/:id"]}
                      component={ActivityForm}
                    />
                    <Route path='/profiles/:username' component={ProfilePage} />
                    {/* <Route path='/errors' component={TestError} />
                          <Route path='/server-error' component={ServerError} /> */}
                    <Route
                      path='/account/registerSuccess'
                      component={RegisterSuccess}
                    />
                    <Route
                      path='/account/verifyEmail'
                      component={ConfirmEmail}
                    />
                    <Route path='/login' component={LoginForm} />
                    <PrivateRoute path='/home' component={HomePage} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
