import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Container>
      <Menu
        secondary
        fixed='top'
        pointing
        size='large'
        style={{ backgroundColor: "aliceBlue" }}>
        <Container>
          <Menu.Item as={NavLink} to='/' exact header>
            <img src='/assets/logo.png' alt='logo' />
            Reactivities
          </Menu.Item>
          <Menu.Item as={NavLink} to='/activities' name='Activities' />
          <Menu.Item as={NavLink} to='/errors' name='Errors' />
          <Menu.Item>
            <Button
              as={NavLink}
              to='/createActivity'
              positive
              content='Create Activity'
            />
          </Menu.Item>
        </Container>
      </Menu>
    </Container>
  );
}
