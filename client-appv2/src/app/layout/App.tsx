import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {
  Button,
  Container,
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
// import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
// import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import ConfirmEmail from "../../features/users/ConfirmEmail";
import { history } from "../../index";

import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  BodyScrollOptions,
} from "body-scroll-lock";
import CodeOfConduct from "../../features/legal/CodeOfConduct";
import Contact from "../../features/contact/Contact";
import MySliderMenu from "./MySliderMenu";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  const lockScrollStyle = {
    // maxHeight: window.innerHeight,
    // overflowY: "hidden",
  };

  const unlockScrollStyle = {
    // height: "100%",
  };

  const closeSideBarAndNav = (to: string) => {
    clearAllBodyScrollLocks();
    commonStore.toggleSidebar();
    history.push(to);
  };

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded());
    }

    const options: BodyScrollOptions = {
      reserveScrollBarGap: true,
    };

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
      <div id='mySliderMenuContainer' style={{ width: "100vw" }}>
        <Route
          path={"/(.*)"}
          render={() => (
            <>
              <NavBar />
              <MySliderMenu
                handleMouseDown={commonStore.toggleSidebar}
                menuVisibility={commonStore.isSidebarOpen}
              />

              <Container
                // id='targetElementId'
                style={
                  commonStore.isSidebarOpen
                    ? { ...lockScrollStyle, marginTop: "80px" }
                    : { ...unlockScrollStyle, marginTop: "80px" }
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
                  <Route path='/account/verifyEmail' component={ConfirmEmail} />
                  <Route path='/login' component={LoginForm} />
                  <PrivateRoute path='/home' component={HomePage} />
                  <Route path='/code' component={CodeOfConduct} />
                  <Route path='/contact' component={Contact} />
                  {/* <Route path='/newsletter' component={Newsletter} /> */}

                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          )}
        />
      </div>
    </>
  );
}

export default observer(App);
