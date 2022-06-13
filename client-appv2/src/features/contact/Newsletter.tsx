import { Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function Newsletter() {
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
            displayName: Yup.string().required("No displayname provided"),
            username: Yup.string().required("No username provided").min(3),
            email: Yup.string()
              .required("No email provided")
              .email("Incorrect email format"),
            password: Yup.string()
              .required("No password provided")
              .min(9, "Password must be atleast 9 characters")
              .matches(
                /[A-Z]/,
                "Password must contain atleast 1 uppercase character"
              )
              .matches(
                /[a-z]/,
                "Password must contain atleast 1 lowercase character"
              )
              .matches(
                /[0-9]/,
                "Password must contain atleast 1 numeric character"
              )
              .matches(
                /[^a-zA-Z0-9]/,
                "Password must contain atleast 1 symbol ($,%,#,^,@,! etc) character"
              ),
            passwordConfirmation: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
          })}>
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form
              className='ui form error'
              onSubmit={handleSubmit}
              style={{ paddingTop: "2em", paddingBottom: "2em" }}
              autoComplete='off'>
              <Header as='h1' content='Sign Up' textAlign='left' />
              <MyTextInput
                name='displayName'
                placeholder='Display Name - what other users will see, can be changed later'
              />
              <MyTextInput
                name='username'
                placeholder='Username - your unique id, cannot be changed later'
              />
              <MyTextInput
                name='email'
                placeholder='Email - for login and verification'
              />
              <MyTextInput
                name='password'
                placeholder='Password'
                type='password'
              />
              <MyTextInput
                name='passwordConfirmation'
                placeholder='Confirm Password - retype above password'
                type='password'
              />
              <Segment basic style={{ borderRadius: "20px" }}>
                <p>
                  <b>Password Requirements</b>
                  <ul>
                    <li>Password must be atleast 6 characters in length</li>
                    <li>Password must contain atleast 1 uppercase character</li>
                    <li>Password must contain atleast 1 lowercase character</li>
                    <li>Password must contain atleast 1 numeric character</li>
                    <li>
                      Password must contain atleast 1 symbol e.g. $,%,#,^,@,!
                      etc, character
                    </li>
                  </ul>
                </p>
              </Segment>
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
