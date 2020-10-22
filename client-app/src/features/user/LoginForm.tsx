import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import {history} from '../..'

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

interface IProps {

}

const LoginForm: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { login , isLoggedIn} = rootStore.userStore;
  {isLoggedIn && history.push('/activities')};
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({ [FORM_ERROR]: error }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
        values
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            as="h2"
            content="Login to WannaGo"
            color="teal"
            textAlign="center"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {/* {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text='Invalid username or password.'/>
          )} */}
           {submitError && <div className="error">{submitError.statusText}{console.log(submitError)}</div>}
          <Button
            color='teal'
            loading={submitting}
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            content="Login"
            fluid
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>

        </Form>
      )}
    />
  );
};

export default LoginForm;
