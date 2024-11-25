import { Container, Grid, Header, Segment } from "semantic-ui-react";

export default function Contact() {
  return (
    <Grid style={{ height: "100vh" }}>
      <Container>
        <Segment
          style={{
            marginTop: "25px",
            borderRadius: "20px",
            backgroundColor: "aliceblue",
            minHeight: "30vh",
            maxHeight: "60vh",
            maxWidth: "100%",
            minWidth: "100%",
            padding: "20px",
            marginBottom: "30vh",
          }}
          raised>
          <Container>
            <Header size='huge'>💬Contact</Header>
            <p>We love hearing from you! </p>
            <p>
              Email:{" "}
              <a href='mailto:contact@iwannagoapp.com'>
                <b>contact@iwannagoapp.com</b>
              </a>{" "}
            </p>
            <p>
              Twitter:
              <a
                href='https://twitter.com/iWannaGoApp'
                target='_blank'
                rel='noreferrer'>
                <b>@iWannaGoApp</b>
              </a>
            </p>
            <p>Please reach out to us with any issues💩 or feedback😊!</p>
            <p>
              We're currently working on new features such as notifications and
              messages. If theres anything cool you have in mind, do share!
              Thank you for supporting this community
            </p>
            <br />
          </Container>
        </Segment>
      </Container>
    </Grid>
  );
}
