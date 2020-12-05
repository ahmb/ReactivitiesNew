import React, {
  FormEvent,
  Fragment,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form,
  Button,
  Header,
  Checkbox,
  CheckboxProps,
  Label,
} from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import {
  combineValidators,
  hasLengthGreaterThan,
  isRequired,
  isRequiredIf,
} from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { history } from "../..";
import { category } from "../../app/common/options/categoryOptions";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
  username: isRequired("username"),
  displayName: isRequired("displayname"),
  interests: isRequired("interests"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const [state, setState] = useState("");
  const handleChange = (
    event: FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    console.log(event.currentTarget);
    console.log(data);
    console.log(data.checked);
    setState(String(data.checked));
  };

  return (
    <div className="registerForm">
      <FinalForm
        onSubmit={(values: any) => {
          // register(values).catch((error) => ({ [FORM_ERROR]: error }));
          console.log(values);
        }}
        validate={validate}
        render={({
          handleSubmit,
          submitting,
          submitError,
          invalid,
          pristine,
          dirtySinceLastSubmit,
        }) => (
          <Form onSubmit={handleSubmit} error>
            <span style={{ display: "flex" }}>
              <span id="logo">Wanna</span>
              <span id="logo2">Go</span>
            </span>
            <Header as="h2" content="Create an account" textAlign="center" />
            <Field
              name="username"
              component={TextInput}
              placeholder="Username"
            />
            <Field
              name="displayName"
              component={TextInput}
              placeholder="Display Name"
            />
            <Field name="email" component={TextInput} placeholder="Email" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />

            <div>
              <label>
                Personalize your recommended activities (Pick all that apply)
              </label>
              <br />
              {category.map((cat) => (
                <Fragment>
                  <Label image style={{ margin: 3 }}>
                    <img src={`/assets/categoryImages/${cat.key}.png`} />
                    <Field
                      name="interests"
                      component="input"
                      type="checkbox"
                      value={`${cat.value}`}
                    />{" "}
                    {cat.text}
                  </Label>
                  <br />
                </Fragment>
              ))}
            </div>

            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}
            {/* {submitError && <div className="error">{submitError.statusText}{console.log(submitError)}</div>} */}
            {/* color:'#dc493a',  */}
            <Button
              style={{ margin: "10px" }}
              loading={submitting}
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              content="Register"
              fluid
              circular
              positive
            />
            {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
          </Form>
        )}
      />
    </div>
  );
};

export default RegisterForm;
