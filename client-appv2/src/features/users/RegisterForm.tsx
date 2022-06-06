import { Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore } = useStore();

  return (
    <>
      <Segment
        style={{
          borderRadius: "20px",
          backgroundColor: "aliceblue",
        }}
        raised>
        <Formik
          initialValues={{
            displayName: "",
            username: "",
            email: "",
            password: "",
            error: null,
          }}
          onSubmit={(values, { setErrors }) =>
            userStore.register(values).catch((error) => setErrors({ error }))
          }
          validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
          })}>
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form
              className='ui form error'
              onSubmit={handleSubmit}
              style={{ paddingTop: "2em", paddingBottom: "2em" }}
              autoComplete='off'>
              <Header as='h1' content='Sign Up' textAlign='left' />
              <MyTextInput name='displayName' placeholder='Display Name' />
              <MyTextInput name='username' placeholder='Username' />
              <MyTextInput name='email' placeholder='Email' />
              <MyTextInput
                name='password'
                placeholder='Password'
                type='password'
              />
              <ErrorMessage
                name='error'
                render={() => <ValidationErrors errors={errors.error} />}
              />
              <Button
                positive
                circular
                content='Register'
                type='submit'
                fluid
                style={{ boxShadow: "#2a7b3d 1px 3px 0px 0px" }}
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
});
