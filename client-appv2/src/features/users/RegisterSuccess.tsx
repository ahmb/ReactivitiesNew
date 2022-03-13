import React from "react";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";

export default function RegisterSuccess() {
  const email = useQuery().get("email") as string;

  function handleConfirmEmailResend() {
    agent.Account.resentEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((error) => console.log(error));
  }

  return (
    <Segment placeholder textAlign='center'>
      <Header icon color='green'>
        <Icon name='check' />
        Successfully registered!
      </Header>
      <p>
        Please check your email (including junk email) for the verificatin email
      </p>
      {email && (
        <>
          <p>Didn't recieve the email? Click the below button to resend</p>
          <Button
            primary
            onClick={handleConfirmEmailResend}
            content='Resent email'
            size='huge'
          />
        </>
      )}
    </Segment>
  );
}
