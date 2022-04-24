import React from "react";
import {
  Menu,
  Button,
  Container,
  Image,
  Dropdown,
  Checkbox,
  Grid,
  Header,
  Icon,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

interface IProps {
  className?: string;
}

const NavBar: React.FC<IProps> = ({ className }) => {
  const {
    userStore: { user, logout, isLoggedIn },
    commonStore: { toggleSidebar, isSidebarOpen },
  } = useStore();

  return (
    <Container>
      <Menu
        secondary
        fixed='top'
        size='large'
        style={{ backgroundColor: "white" }}>
        <Container>
          <Menu.Item
            // as={Button}
            // to="javascript:void(0)"
            // as={NavLink}
            // to='/activities'
            header
            onClick={(e, d) => toggleSidebar()}>
            {!isSidebarOpen && <Icon name='bars' />}
            {isSidebarOpen && <Icon name='close' />}
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to='/activities'
            style={{ backgroundColor: "white" }}
            header>
            W
          </Menu.Item>
          {isLoggedIn && (
            <>
              {/* <Menu.Item as={NavLink} to='/activities' name='Activities' />
              <Menu.Item as={NavLink} to='/errors' name='Errors' /> */}
              <Menu.Item position='right'>
                <Menu.Item>
                  <Button
                    as={NavLink}
                    to='/createActivity'
                    positive
                    content='Create Activity'
                  />
                </Menu.Item>
                <Image
                  src={user?.image || "/assets/user.png"}
                  avatar
                  spaced='right'
                />
                <Dropdown pointing='top left' text={user?.displayName}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/profiles/${user?.username}`}
                      text='My Profile'
                      icon='user'
                    />
                    <Dropdown.Item
                      onClick={logout}
                      text='Logout'
                      icon='power'
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </>
          )}
        </Container>
      </Menu>
    </Container>
  );
};

export default observer(NavBar);
