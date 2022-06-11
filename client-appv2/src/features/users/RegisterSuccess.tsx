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
    <Segment placeholder textAlign='center' style={{ borderRadius: "20px" }}>
      <Header icon color='green'>
        <Icon name='check' />
        Successfully registered!
      </Header>
      <p>
        <b>Final Step - Email verification is required to login</b>
      </p>
      <p>
        Please check your email, including junk email, for the verification
        email
      </p>
      {email && (
        <>
          <br />
          <p style={{ color: "grey" }}>
            Didn't recieve the email? Click the below button to have it resent
          </p>
          <Button
            circular
            color='grey'
            style={{ boxShadow: "#5d5d5d 1px 3px 0px 0px" }}
            onClick={handleConfirmEmailResend}
            content='Resend email'
            size='medium'
          />
        </>
      )}
    </Segment>
  );
}
