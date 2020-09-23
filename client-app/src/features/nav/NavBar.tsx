import React, { useContext } from "react";
import { Menu, Container, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  // console.log(user);
  return (
    <Menu fixed="top" inverted borderless size='large'>
      <Container>
        <Menu.Item header as={NavLink} exact to="/activities" >
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          WannaGo
        </Menu.Item>
        <Menu.Menu position='right'>
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
        <Menu.Item name="Messages" as={NavLink} to="/" />
        <Menu.Item name="My Activities" as={NavLink} to="/activities" />

        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/profpic.svg" || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
