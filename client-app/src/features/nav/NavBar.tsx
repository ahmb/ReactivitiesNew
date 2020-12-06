import React, { Fragment, useContext } from "react";
import {
  Menu,
  Container,
  Dropdown,
  Image,
  Button,
  Input,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  // console.log(user);
  return (
    <Menu
      secondary
      fixed="top"
      pointing
      size="tiny"
      style={{ backgroundColor: "aliceBlue" }}
    >
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          {/* <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} /> */}
          <span id="logo">Wanna</span>
          <span id="logo2">Go</span>
        </Menu.Item>
        <Menu.Menu position="right">
          {/* <Menu.Item >
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            // content="Create Activity"
            icon='plus'
            circular
          />
        </Menu.Item> */}
          {user && <Menu.Item name="Home" as={NavLink} exact to="/home" />}
          <Menu.Item name="Explore" as={NavLink} to="/activities" />
          {!user && (
            <Fragment>
              <Button
                onClick={() => openModal(<LoginForm />)}
                size="tiny"
                color='twitter'
                circular
                style={{margin:5}}
                content='Login'
              />
              <Button
                onClick={() => openModal(<RegisterForm />)}
                size="tiny"
                positive
                circular
                content='Register'
                style={{margin:5}}
              />
            </Fragment>
          )}
          {user && <Menu.Item name="Messages" as={NavLink} to="/messages" />}
          {/* <Menu.Item>
            <Input
              icon="search"
              iconPosition="left"
              placeholder="Search...COMING SOON"
              className="searchInput"
            />
          </Menu.Item> */}

          {user && (
            <Fragment>
              <Menu.Item position="right">
                <Image
                  avatar
                  spaced="right"
                  src={
                    user.image || "/assets/profpic.svg" || "/assets/user.png"
                  }
                />
                <Dropdown pointing="top" text={user.displayName}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/profile/${user.username}`}
                      text="Profile"
                      icon="eye"
                    />
                    <Dropdown.Item
                      onClick={logout}
                      text="Sign Out"
                      icon="sign-out"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              <Button
                as={NavLink}
                to="/createActivity"
                positive
                // icon="plus"
                icon="lightbulb"
                size="tiny"
                // style={{ marginTop: "13px", padding: "15px" }}
                content="Post Activity"
                circular
                className="navbarPostBtn"
                // id="stickyButton"
              />
            </Fragment>
          )}
          {/* <Menu.Menu position="right"> */}

          {/* </Menu.Menu> */}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
