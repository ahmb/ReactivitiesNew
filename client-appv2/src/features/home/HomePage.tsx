import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Segment,
  Image,
  Divider,
} from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import ActivityLog from "./ActivityLog";

export default observer(function HomePage() {
  const { profileStore, userStore, modalStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;

  useEffect(() => {
    if (userStore.user && profile === null) {
      console.log("userStore.user.username");
      console.log(userStore.user.username);
      loadProfile(userStore.user.username);
      // return () => {
      //   setActiveTab(0);
      // };
    }
  }, [loadProfile, profile]);

  if (loadingProfile) return <LoadingComponent content='Loading Homepage...' />;

  return (
    // <Segment vertical>
    <Container>
      <span style={{ display: "inline" }}>
        <Header size='huge' style={{ display: "inline" }}>
          🏠{" "}
        </Header>
        {userStore.isLoggedIn && profile && (
          <>
            <Header
              as='h2'
              content={` Welcome back, ${profile?.displayName}!`}
              style={{ display: "inline" }}
            />
            <br />
            <br />
            <ActivityLog />
            {/* <Button as={Link} to='/activities' size='huge' inverted>
              Goto Activities!
            </Button> */}
          </>
        )}
      </span>

      {!userStore.isLoggedIn && (
        <>
          <Button
            onClick={() => modalStore.openModal(<LoginForm />)}
            size='huge'
            inverted>
            Login!
          </Button>
          <Button
            onClick={() => modalStore.openModal(<RegisterForm />)}
            size='huge'
            inverted>
            Register!
          </Button>
          <Divider horizontal inverted>
            {" "}
            Or
          </Divider>
          <Button
            onClick={userStore.facebookLogin}
            loading={userStore.fbLoading}
            size='huge'
            inverted
            color='facebook'
            content='Login with Facebook'
          />
        </>
      )}
    </Container>
    // </Segment>
  );
});
