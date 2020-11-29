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

const BottomNav: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  // console.log(user);
  return (
    <Menu secondary widths={1} pointing size="tiny" style={{backgroundColor:'aliceBlue', marginTop:'100px'}}>
      <Container>

          <Menu.Item name="About Us" as={NavLink} exact to="/home" />
          

      </Container>
    </Menu>
  );
};

export default observer(BottomNav);
