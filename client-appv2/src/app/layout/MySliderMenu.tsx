import { observer } from "mobx-react-lite";
import React from "react"; //  useEffect, useState
import { Menu, Icon, Button, Header } from "semantic-ui-react";
import { useStore } from "../stores/store";
import {
  // disableBodyScroll,
  clearAllBodyScrollLocks,
  // BodyScrollOptions,
} from "body-scroll-lock";
import { useMediaQuery } from "../common/util/hooks";
import { router } from "../router/routes";

interface Props {
  handleMouseDown: () => void;
  menuVisibility: boolean;
}

function MySliderMenu(props: Props) {
  const { commonStore } = useStore();
  const { isSidebarOpen } = commonStore;
  // const [targetElement, setTargetElement] = useState<Element | null>(null);
  const isNotMobile = useMediaQuery("(min-width: 450px)");

  // const options: BodyScrollOptions = {
  //   reserveScrollBarGap: true,
  // };

  // useEffect(() => {
  //   setTargetElement(document.querySelector("body"));
  //   if (isSidebarOpen && targetElement !== null) {
  //     // console.log(scrollPosition);
  //     // window.scrollTo(0, 0);
  //     disableBodyScroll(targetElement, options);
  //   }
  //   if (!isSidebarOpen && targetElement !== null) {
  //     // console.log(scrollPosition);
  //     // window.scrollTo(0, scrollPosition);
  //     // enableBodyScroll(targetElement);
  //     clearAllBodyScrollLocks();
  //   }
  // }, []);

  const closeSideBarAndNav = (to: string) => {
    clearAllBodyScrollLocks();
    commonStore.toggleSidebar();
    router.navigate(to);
  };

  return (
    <>
      <div
        id='flyoutMenu'
        className={isSidebarOpen ? "show" : "hide"}
        // onClick={() => toggleSidebar()}
      >
        <Menu
          className='flyoutMenuMenu'
          icon='labeled'
          direction='left'
          vertical
          fluid
          style={{ backgroundColor: "aliceblue" }}>
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
          <Menu.Item></Menu.Item>

          <Menu.Item
            as='a'
            onClick={(_) => closeSideBarAndNav("/home")}
            className={
              isNotMobile ? "centeredSliderItem" : "centeredSliderItemMobile"
            }>
            <Header size='huge' style={{ display: "inline" }}>
              🏠{" "}
            </Header>
            Home
          </Menu.Item>
          <Menu.Item
            as='a'
            onClick={(_) => closeSideBarAndNav("/")}
            className={
              isNotMobile ? "centeredSliderItem" : "centeredSliderItemMobile"
            }>
            <Header size='huge' style={{ display: "inline" }}>
              💡{" "}
            </Header>
            Activities
          </Menu.Item>

          <Menu.Item
            as='a'
            onClick={(_) => closeSideBarAndNav("/code")}
            className={
              isNotMobile ? "centeredSliderItem" : "centeredSliderItemMobile"
            }>
            <Header size='huge' style={{ display: "inline" }}>
              🤝{" "}
            </Header>
            Code of Conduct
          </Menu.Item>

          <Menu.Item
            as='a'
            onClick={(_) => closeSideBarAndNav("/contact")}
            className={
              isNotMobile ? "centeredSliderItem" : "centeredSliderItemMobile"
            }>
            <Header size='huge' style={{ display: "inline" }}>
              💬{" "}
            </Header>
            Contact
          </Menu.Item>
          {/* <Menu.Item
                // as='a'
                // onClick={(_) => closeSideBarAndNav("/newsletter")}
                >
                  <Header size='huge' style={{ display: "inline" }}>
                    📰{" "}
                  </Header>
                  Biweekly Newsletter <br/><i>*Coming Soon*</i>
                </Menu.Item> */}
          <Menu.Item></Menu.Item>
          <Menu.Item></Menu.Item>
          <Menu.Item>
            <a
              href='https://twitter.com/iWannaGoApp'
              target='_blank'
              rel='noreferrer'>
              <Icon name='twitter' />
            </a>
          </Menu.Item>
          <Menu.Item>
            <Header
              size='tiny'
              color='grey'
              style={{ display: "inline", fontSize: "10px" }}>
              <i>WannaGo alpha - version 0.7</i>
            </Header>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}

export default observer(MySliderMenu);
