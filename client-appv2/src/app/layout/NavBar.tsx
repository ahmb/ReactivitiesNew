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
import { categoryOptions } from "../common/options/categoryOptions";
import {
  HorizontalScrollContainer,
  HorizontalScrollItem,
} from "react-simple-horizontal-scroller";
import { useStickyChecker } from "../common/util/useStickyChecker";
import { useLocation } from "react-router-dom";
import Avatar from "boring-avatars";

interface IProps {
  className?: string;
}

const NavBar: React.FC<IProps> = ({ className }) => {
  const {
    userStore: { user, logout, isLoggedIn },
    commonStore: {
      toggleSidebar,
      isSidebarOpen,
      isFilterNavSticky,
      setIsFilterNavSticky,
    },
    activityStore: { predicate, setPredicate },
  } = useStore();

  const location = useLocation();

  useStickyChecker(".filterNavMain", setIsFilterNavSticky);

  // useEffect(() => {}, [isSidebarOpen]);

  return (
    <>
      <Menu
        secondary
        fixed='top'
        size='large'
        style={
          isSidebarOpen
            ? { backgroundColor: "white", width: "100%", zIndex: "0" }
            : {
                backgroundColor: "white",
                width: "100%",
                borderBottom: "1px solid #f4f4f4",
              }
        }>
        <>
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
          {!isLoggedIn && (
            <>
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
                  as={Link}
                  to={`/`}
                  floated='right'
                  content='Sign Up or Login'
                  circular
                  style={{
                    margin: "10px",
                    boxShadow: "#404cb8 1px 3px 0px 0px",
                    backgroundColor: "#5162FA",
                    color: "white",
                  }}
                />
              </Menu.Item>
            </>
          )}
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
                    // color='red'
                    style={{
                      backgroundColor: "#5162FA",
                      color: "white",
                      boxShadow: "#404cb8 1px 3px 0px 0px",
                    }}
                    icon='plus'
                    size='mini'
                    circular
                    // style={{
                    //   boxShadow: "#a51c1d 1px 3px 0px 0px",
                    // }}
                  />
                </Menu.Item>
                {user?.image && (
                  <Image
                    src={user?.image || "/assets/user.png"}
                    // avatar
                    circular
                    spaced='right'
                    style={{ height: 45, width: 45 }}
                    as={NavLink}
                    to={`/profiles/${user?.username}`}
                  />
                )}
                {!user?.image && (
                  <NavLink to={`/profiles/${user?.username}`}>
                    <Avatar
                      size={45}
                      name={user?.username}
                      variant='beam'
                      colors={[
                        "#D8C395",
                        "#F77825",
                        "#F5F03A",
                        "#F1EFA5",
                        "#60BB99A",
                      ]}
                    />
                  </NavLink>
                )}

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
        </>
      </Menu>

      {/* FILTER NAV */}
      {isFilterNavSticky && location.pathname.endsWith("activities") && (
        <Menu
          secondary
          fixed='top'
          size='mini'
          style={
            isSidebarOpen
              ? {
                  backgroundColor: "white",
                  width: "100%",
                  zIndex: "0",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "71px",
                }
              : {
                  backgroundColor: "white",
                  width: "100%",
                  borderBottom: "1px solid #f4f4f4",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "71px",
                }
          }>
          <Container>
            <HorizontalScrollContainer>
              <Menu.Item
                active={predicate.has("all")}
                onClick={() => setPredicate("all", "true")}>
                <Header
                  size='huge'
                  style={{ paddingTop: "10px" }}
                  content='💡'
                />
                <p style={{ paddingTop: "5px", paddingLeft: "5px" }}>All</p>
              </Menu.Item>

              <Menu.Item
                active={predicate.has("isGoing")}
                onClick={() => setPredicate("isGoing", "true")}>
                <Header
                  size='huge'
                  style={{ paddingTop: "10px" }}
                  content='😁'
                />
                <p style={{ paddingTop: "5px", paddingLeft: "5px" }}>Mine</p>
              </Menu.Item>
              {/* <Menu.Item
              content='Hosting'
              active={predicate.has("isHost")}
              onClick={() => setPredicate("isHost", "true")}
              style={{ paddingTop: "20px" }}
            /> */}

              {categoryOptions.map(({ id, text, icon }) => (
                <HorizontalScrollItem id={id} key={id}>
                  <Menu.Item
                    key={id}
                    active={predicate.has("isGoing")}
                    // style={{ display: "inline" }}
                    onClick={() => setPredicate("isGoing", "true")}>
                    <Header size='huge' style={{ paddingTop: "10px" }}>
                      {icon + " "}
                    </Header>
                    <span
                      className='categoryText'
                      style={{ paddingTop: "5px", paddingLeft: "5px" }}>
                      {text}
                    </span>
                  </Menu.Item>
                </HorizontalScrollItem>
              ))}
            </HorizontalScrollContainer>
          </Container>
        </Menu>
      )}
    </>
  );
};

export default observer(NavBar);
