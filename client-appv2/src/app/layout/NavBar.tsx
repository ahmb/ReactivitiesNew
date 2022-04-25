import React, { useEffect } from "react";
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

  // useEffect(() => {}, [isSidebarOpen]);

  return (
    <Container>
      <Menu
        secondary
        fixed='top'
        size='large'
        style={
          isSidebarOpen
            ? { backgroundColor: "white", width: "100%", zIndex: "-1" }
            : { backgroundColor: "white", width: "100%" }
        }>
        <Container>
          <Menu.Item
            // as={Button}
            // to="javascript:void(0)"
            // as={NavLink}
            // to='/activities'
            header
            onClick={(e, d) => toggleSidebar()}
            style={{ paddingRight: "0px" }}>
            {!isSidebarOpen && <Icon name='bars' size='large' />}
            {isSidebarOpen && <Icon name='angle left' size='large' />}
          </Menu.Item>
          <Menu.Item
            id='logo'
            as={NavLink}
            to='/activities'
            style={{
              backgroundColor: "white",
              paddingLeft: "0px",
            }}
            header>
            W
          </Menu.Item>
          {isLoggedIn && (
            <>
              {/* <Menu.Item as={NavLink} to='/activities' name='Activities' />
              <Menu.Item as={NavLink} to='/errors' name='Errors' /> */}
              <Menu.Item position='right'>
                <Menu.Item position='right'>
                  <Button
                    as={NavLink}
                    to='/createActivity'
                    icon='search'
                    circular
                    size='mini'
                  />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button
                    as={NavLink}
                    to='/createActivity'
                    color='red'
                    icon='plus'
                    size='mini'
                    circular
                  />
                </Menu.Item>
                <Image
                  src={user?.image || "/assets/user.png"}
                  size='mini'
                  avatar
                  spaced='right'
                  style={{ height: 45, width: 45 }}
                />
                <Dropdown pointing='top left'>
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
