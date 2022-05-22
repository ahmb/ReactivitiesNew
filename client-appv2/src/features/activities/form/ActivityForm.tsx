import React, { useEffect, useState } from "react";
import {
  Button,
  Header,
  Segment,
  Label,
  Checkbox,
  Popup,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {
  ActivityFormValues,
  SkillLevel,
  Language,
} from "../../../app/models/activity";
import MyMultiSelectInput from "../../../app/common/form/MyMultiSelectInput";
import MyTextNumberInput from "../../../app/common/form/MyTextNumberInput";
import MyCheckboxInput from "../../../app/common/form/MyCheckboxInput";
import MyCheckboxWithTextNumberInput from "../../../app/common/form/MyCheckboxWithTextNumberInput";
import PhotoUploadSimpleWidget from "../../../app/common/imageUpload/PhotoUploadSimpleWidget";
import MyFileUpload from "../../../app/common/form/MyFileUpload";
import MyFileUploadPreview from "../../../app/common/form/MyFileUploadPreview";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const [recurringEvent, setRecurringEvent] = React.useState(false);
  const [privateEvent, setPrivateEvent] = React.useState(0);

  const validationSchema = Yup.object({
    // title: Yup.string().required("Please provide a title for the activity"),
    // description: Yup.string().required(
    //   "Please enter a helpful description for others"
    // ),
    // categories: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       value: Yup.string().max(255).required().label("value"),
    //     })
    //   )
    //   .min(1, "minimum 1,")
    //   .max(3, "maximum 3,")
    //   .required("Please select atleast 1 category"),
    // date: Yup.date()
    //   .required("Please select the start date and time")
    //   .nullable(),
    // language: Yup.string().required("Please choose a language"),
    // skillLevel: Yup.string().required("Please select a skill level"),
    duration: Yup.number()
      .min(10, "Not equal or greater than 10 mins")
      .max(1440, "Must be less than 1 day i.e. 1440 mins")
      .required("Please enter a number between 10 to 1440 mins"),
    ongoingDays: Yup.number().nullable(),
    attendeeCountMax: Yup.number()
      .min(1, "Please select atleast 1 attendee :p")
      .max(
        6,
        "Please enter a number less than 6, lets keep it personal and interactive"
      )
      .required("Please select atleast 1 attendee :p"),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        if (activity) {
          setActivity(new ActivityFormValues(activity));
        }
      });
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValues | any) {
    console.log(activity);
    // if (!activity.id) {
    //   let newActivity = {
    //     ...activity,
    //     id: uuid(),
    //   };
    //   createActivity(newActivity).then(() =>
    //     history.push(`/activities/${newActivity.id}`)
    //   );
    // } else {
    //   updateActivity(activity).then(() =>
    //     history.push(`/activities/${activity.id}`)
    //   );
    // }
  }

  if (loadingInitial) <LoadingComponent content='Loading Activity' />;
  return (
    <>
      <Header
        content='Fortune favours the brave'
        textAlign='center'
        color='grey'
        style={{ paddingBottom: "30px" }}
      />
      <Segment
        basic
        className='zigZagBorder'
        style={{
          backgroundColor: "aliceblue",
          paddingBottom: "60px",
          marginBottom: "33px",
        }}>
        <Label
          style={{ backgroundColor: "#5162FA", color: "white" }}
          ribbon={true}
          size='large'>
          Online Activity Form
        </Label>
        <Segment clearing>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={activity}
            onSubmit={(values) => handleFormSubmit(values)}>
            {({ isSubmitting, isValid, dirty, handleSubmit }) => (
              <Form
                className='ui form'
                autoComplete='off'
                onSubmit={handleSubmit}>
                <MyMultiSelectInput
                  options={categoryOptions}
                  placeholder='What kind of thing do you feel doing? Max 3'
                  name='categories'
                />
                <MyTextInput
                  name='title'
                  placeholder='What would you like to do'
                />
                <MyTextArea
                  rows={3}
                  placeholder='Details -   Share any helpful details e.g.
                  Goals, for more context. Skills which you
                  are looking for, level of expertise'
                  name='description'
                />
                {/* <MySelectInput
                  options={categoryOptions}
                  placeholder='Category'
                  name='category'
                /> */}
                <MyDateInput
                  placeholderText='When would you like to do this'
                  name='date'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm aa'
                />
                <MyTextNumberInput
                  name='duration'
                  placeholder='How long do you think it will take in minutes'
                  label='Duration of activity (mins)'
                  defaultValue={15}
                />
                <MyTextNumberInput
                  name='attendeeCountMax'
                  placeholder='How many would you like to interact with'
                  label='Number of attendees allowed (max. 6)'
                  defaultValue={1}
                />
                <MyCheckboxWithTextNumberInput
                  name='ongoing'
                  label='Repeat until filled? (only visible for creator)'
                  popUpContent='Note: Display this post on the main page for the desired
                  number of days or until the number of attendees is reached'
                  defaultValue={0}
                  textInputName='ongoingDays'
                  textInputPlaceholder='Number of days to renew for if not filled, only you can see this'
                  textInputLabel='Repeat for (days)'
                  textInputDefaultValue={0}
                />
                <MyCheckboxInput
                  name='private'
                  label='Private Event?'
                  popUpContent='Note: Private activities do not appear on the main page, but
                    can be accessed via the URL. Use this when connecting with
                    someone you already know'
                  defaultValue={0}
                />
                <MySelectInput
                  label='Language'
                  options={Object.values(Language)
                    .filter(
                      (sl) => sl.toString() !== "0" && !parseInt(sl.toString())
                    )
                    .map((str, index) => ({
                      value: str,
                      text: str,
                      index: index,
                    }))}
                  placeholder='Language of communication'
                  name='language'
                  defaultValue='English'
                />
                <MySelectInput
                  label='Skill Level'
                  options={Object.values(SkillLevel)
                    .filter(
                      (sl) => sl.toString() !== "0" && !parseInt(sl.toString())
                    )
                    .map((str, index) => ({
                      value: str,
                      text: str,
                      index: index,
                    }))}
                  placeholder='Any skill requirement?'
                  name='skillLevel'
                  defaultValue='Everyone'
                />
                <MyFileUpload
                  name='file'
                  label='Upload Picture (Optional) - .jpg .png .gif image formats accepted'
                />
                {/* <Header content='Location Details' sub color='teal' />

                <MyTextInput placeholder='City' name='city' />
                <MyTextInput placeholder='Venue' name='venue' /> */}
                <Button
                  loading={isSubmitting}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                  disabled={isSubmitting || !dirty || !isValid}
                />
                <Button
                  as={Link}
                  to='/activities'
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          </Formik>
        </Segment>
      </Segment>
    </>
  );
});
