import React, { Fragment } from "react";
import { combineValidators, isRequired } from "revalidate";
import { IProfile } from "../../app/models/profile";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { category } from "../../app/common/options/categoryOptions";

const validate = combineValidators({
  displayName: isRequired("displayName"),
});

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      // onSubmit={updateProfile}
      onSubmit={(profile: IProfile) => {
        console.log(profile);
        console.log(profile.interests?.filter(x => typeof x === 'string'));
        profile.interests = profile.interests?.filter(x => typeof x === 'string');
        updateProfile(profile);
      }}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Label color="red" circular>
            Display Name
          </Label>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="DisplayName"
            value={profile!.displayName}
          ></Field>
          <br />
          <Label color="red" circular>
            About
          </Label>
          <Field
            name="bio"
            component={TextAreaInput}
            rows={3}
            placeholder="Bio"
            value={profile!.bio}
          />

          <Label color="red" circular>
            Interests
          </Label>
          <i>(Please select atleast one which applies)</i>
          <br />

          {category.map((cat) => (
            <Fragment>
              <Label image style={{ margin: 3 }} basic circular size='medium'>
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
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            circular
            content="Update profile"
          />
        </Form>
      )}
    />
  );
};

export default ProfileEditForm;
