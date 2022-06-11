import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";
import { useStore } from "../../app/stores/store";
import LoginForm from "./LoginForm";

export default function ConfirmEmail() {
  const { modalStore } = useStore();
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifying);

  function handleConfirmEmailResend() {
    agent.Account.resentEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  function getBody() {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p>
              Verification failed. You can try resending the verify link to your
              email
            </p>
            <Button
              primary
              onClick={handleConfirmEmailResend}
              size='huge'
              content='Resend email'
            />
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>Your email is now verified, please login with your account</p>
            <Button
              as={Link}
              to={`/login`}
              // floated='right'
              content='Login'
              circular
              style={{
                // margin: "10px",
                boxShadow: "#404cb8 1px 3px 0px 0px",
                backgroundColor: "#5162FA",
                color: "white",
              }}
            />
            {/* <Button
              primary
              onClick={() => modalStore.openModal(<LoginForm />)}
              size='huge'
              content='Login'
              circular
            /> */}
          </div>
        );
    }
  }

  return (
    <Segment placeholder textAlign='center' style={{ borderRadius: "20px" }}>
      <Header icon>
        <Icon name='envelope' />
        Email verification
      </Header>
      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
}
