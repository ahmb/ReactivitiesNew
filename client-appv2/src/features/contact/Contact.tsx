import React from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

export default function Contact() {
  return (
    <Grid style={{ height: "100vh" }}>
      <Segment
        style={{
          marginTop: "25px",
          borderRadius: "20px",
          backgroundColor: "aliceblue",
          minHeight: "30vh",
          maxHeight: "30vh",
          maxWidth: "100%",
          minWidth: "100%",
          padding: "35px",
          marginBottom: "30vh",
        }}
        raised>
        <Container>
          <Header size='huge'>💬Contact</Header>
          <p>We love hearing from you! </p>
          <p>Email: </p>
          <p>Twitter: </p>
          <p>Please reach out to us with any issues💩 or feedback😊!</p>
          <br />
        </Container>
      </Segment>
    </Grid>
  );
}
