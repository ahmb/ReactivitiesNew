import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { useStore } from "../Stores/store";

export default function NavBar() {
  const { activityStore } = useStore();

  return (
    <Container>
      <Menu
        secondary
        fixed='top'
        pointing
        size='tiny'
        style={{ backgroundColor: "aliceBlue" }}>
        <Container>
          <Menu.Item header>
            <img src='/assets/logo.png' alt='logo' />
            Reactivities
          </Menu.Item>
          <Menu.Item name='Activities' />
          <Menu.Item>
            <Button
              onClick={() => activityStore.openForm()}
              positive
              content='Create Activity'
            />
          </Menu.Item>
        </Container>
      </Menu>
    </Container>
  );
}
