import {
  Menu,
  Button,
  Container,
  Image,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { categoryOptions } from "../common/options/categoryOptions";
import { useStickyChecker } from "../common/util/useStickyChecker";
import { useLocation } from "react-router-dom";
import Avatar from "boring-avatars";
import ScrollToTop from "react-scroll-to-top";

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
            ? {
                backgroundColor: "white",
                width: "100%",

                // zIndex: "0"
              }
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
            onClick={(e, d) => {
              toggleSidebar();
              e.stopPropagation();
            }}
            style={{ paddingRight: "0px" }}>
            {!isSidebarOpen && <Icon name='bars' size='large' />}
            {isSidebarOpen && <Icon name='angle left' size='large' />}
          </Menu.Item>
          <Menu.Item
            id='logo'
            as={NavLink}
            to='/'
            style={{
              backgroundColor: "white",
              paddingLeft: "0px",
            }}
            header>
            W
          </Menu.Item>
          {!isLoggedIn && (
            <>
              {/* <Menu.Item position='right'>
                <Button
                  as={NavLink}
                  to='/createActivity'
                  icon='search'
                  circular
                  size='mini'
                  style={{ boxShadow: "#969696 1px 3px 0px 0px" }}
                />
              </Menu.Item> */}
              <Menu.Item
                position='right'
                style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <Button
                  as={Link}
                  to={`/login`}
                  floated='right'
                  content='Sign Up or Login'
                  id='signUpButton'
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
              <Menu.Item position='right' style={{ padding: "0px" }}>
                {/* <Menu.Item position='right'>
                  <Button
                    as={NavLink}
                    to='/createActivity'
                    icon='search'
                    circular
                    size='mini'
                    style={{ boxShadow: "#969696 1px 3px 0px 0px" }}
                    disabled
                  />
                </Menu.Item> */}
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
                    className='navCreateButton'
                    icon='plus'
                    size='mini'
                    circular
                    // style={{
                    //   boxShadow: "#a51c1d 1px 3px 0px 0px",
                    // }}
                  />
                </Menu.Item>
                <Menu.Item style={{ padding: "0px" }}>
                  {user?.image && (
                    <Image
                      src={user?.image || "/assets/user.png"}
                      // avatar
                      circular
                      style={{ height: 50, width: 50 }}
                      as={NavLink}
                      to={"/home"}
                    />
                  )}
                  {!user?.image && (
                    <NavLink to={"/home"}>
                      <Avatar
                        size={47}
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

                  <Dropdown simple>
                    <Dropdown.Menu
                      style={{
                        position: "absolute",
                        top: "120px",
                        left: "-80px",
                        borderRadius: "20px",
                        zIndex: "5 !important",
                      }}>
                      <Dropdown.Item
                        as={Link}
                        to={`/profiles/${user?.username}`}
                        text='My Profile'
                      />
                      <Dropdown.Item onClick={logout} text='Sign out' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              </Menu.Item>
            </>
          )}
        </>
      </Menu>

      {/* FILTER NAV */}
      {isFilterNavSticky && location.pathname === "/" && (
        <Menu
          secondary
          fixed='top'
          size='mini'
          style={
            isSidebarOpen
              ? {
                  backgroundColor: "white",
                  width: "100%",
                  zIndex: "2",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "66px",
                }
              : {
                  backgroundColor: "white",
                  width: "100%",
                  borderBottom: "1px solid #f4f4f4",
                  zIndex: "2",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "66px",
                }
          }>
          <Container>
            {/* <HorizontalScrollContainer> */}
            <Menu.Item
              active={predicate.has("all")}
              onClick={() => setPredicate("all", "true")}>
              <p
                style={{
                  whiteSpace: "nowrap",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                  fontSize: "14px",
                }}>
                💡 All
              </p>
            </Menu.Item>
            {isLoggedIn && (
              <Menu.Item
                active={predicate.has("isGoing")}
                onClick={() => setPredicate("isGoing", "true")}>
                <p
                  style={{
                    whiteSpace: "nowrap",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                    fontSize: "14px",
                  }}>
                  ✅ Mine
                </p>
              </Menu.Item>
            )}
            {/* <Menu.Item
              content='Hosting'
              active={predicate.has("isHost")}
              onClick={() => setPredicate("isHost", "true")}
              style={{ paddingTop: "20px" }}
            /> */}
            {categoryOptions.map(({ id, text, icon, label, value }) => (
              // <HorizontalScrollItem id={id} key={id}>
              <Menu.Item
                key={id}
                active={(predicate.get("category") as string) === value}
                onClick={() => setPredicate("category", value)}>
                <p
                  style={{
                    whiteSpace: "nowrap",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                    fontSize: "14px",
                  }}>
                  {label}
                </p>
              </Menu.Item>
              // </HorizontalScrollItem>
            ))}
            {/* </HorizontalScrollContainer> */}
          </Container>
        </Menu>
      )}
      {isFilterNavSticky && !isSidebarOpen && location.pathname === "/" && (
        <ScrollToTop style={{ borderRadius: "15px" }} smooth top={-1} />
      )}
    </>
  );
};

export default observer(NavBar);
