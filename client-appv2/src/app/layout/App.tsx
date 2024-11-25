import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
// import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
// import ServerError from "../../features/errors/ServerError";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  BodyScrollOptions,
} from "body-scroll-lock";
import MySliderMenu from "./MySliderMenu";
import ScrollToTop from "./ScrollToTop";
import { router } from "../router/routes";
import HomePage from "../../features/home/HomePage";

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
    router.navigate(to);
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
      <ScrollToTop />
      <ToastContainer position='top-center' hideProgressBar />
      <ModalContainer />
      {/* <Route exact path='/' component={HomePage} /> */}
      <div id='mySliderMenuContainer' style={{ width: "100vw" }}>
        {location.pathname === "/" ? (
          <HomePage />
        ) : (
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
              <Outlet />
            </Container>
          </>
        )}
      </div>
    </>
  );
}

export default observer(App);
