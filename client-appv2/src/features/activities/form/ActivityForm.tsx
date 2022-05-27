import React, { useEffect, useState } from "react";
import { Button, Header, Segment, Label } from "semantic-ui-react";
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
  ActivityFormValuesNew,
  ICategory,
  ITag,
  ActivityDetails,
} from "../../../app/models/activity";
import MyMultiSelectInput from "../../../app/common/form/MyMultiSelectInput";
import MyTextNumberInput from "../../../app/common/form/MyTextNumberInput";
import MyCheckboxInput from "../../../app/common/form/MyCheckboxInput";
import MyCheckboxWithTextNumberInput from "../../../app/common/form/MyCheckboxWithTextNumberInput";
import MyFileUpload from "../../../app/common/form/MyFileUpload";
import MyTagsTextInput from "../../../app/common/form/MyTagsTextInput";
import { Circle, CircleGrid, Diamond } from "react-awesome-shapes";
const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    createActivityNew,
    updateActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  // const [activity, setActivity] = useState<ActivityFormValues>(
  //   new ActivityFormValues()
  // );

  const [activity, setActivity] = useState<ActivityFormValuesNew>(
    new ActivityFormValuesNew()
  );

  const [loadedActivity, setLoadedActivity] = useState<ActivityDetails>();

  // const [recurringEvent, setRecurringEvent] = React.useState(false);
  // const [privateEvent, setPrivateEvent] = React.useState(0);

  const validationSchema = Yup.object({
    title: Yup.string().required("Please provide a title for the activity"),
    description: Yup.string().required(
      "Please enter a helpful description for others"
    ),
    categories: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().max(255).required().label("value"),
        })
      )
      .min(1, "minimum 1")
      .max(3, "maximum 3")
      .required("Please select atleast 1 category"),
    date: Yup.date()
      .required("Please select the start date and time")
      .nullable(),
    language: Yup.string().required("Please choose a language"),
    skillLevel: Yup.string().required("Please select a skill level"),
    duration: Yup.number()
      .min(10, "Not equal or greater than 10 mins")
      .max(1440, "Must be less than 1 day i.e. 1440 mins")
      .required("Please enter a number between 10 to 1440 mins"),
    ongoingDays: Yup.number().nullable(),
    attendeeCountMax: Yup.number()
      .min(1, "Please select atleast 1 attendee :p")
      .max(
        5,
        "Please enter a number less than 6, lets keep it personal and interactive"
      )
      .required("Please select atleast 1 attendee :p"),
  });

  // loadActivity(id).then((activity) => {
  //   if (activity) {
  //     setActivity(new ActivityFormValuesNew(activity));
  //   }

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        if (activity) {
          console.log(activity);
          const activityFormValues = new ActivityFormValuesNew({
            ...activity,
            categories: activity.categories.map(
              (c) => categoryOptions.filter((co) => co.value === c.name)[0]
            ),
            tag: activity.tag.map((t) => t.name),
            ongoing: activity.ongoing ? 1 : 0,
            private: activity.private ? 1 : 0,
            language: Language[activity.language],
            skillLevel: SkillLevel[activity.skillLevel],
          });
          console.log(activityFormValues);
          setActivity(activityFormValues);
        } else {
          console.log("no activity found");
        }
      });
    } else {
      console.log("no activity id found");
      console.log("default activity without id:");
      console.log(activity);
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValuesNew | any) {
    console.log("activity is");
    console.log(activity);
    // if (!activity.id) {
    let newActivity: ActivityFormValuesNew = {
      ...activity,
      id: activity.id ?? uuid(),
      private: activity.private === 0 ? false : true,
      ongoing: activity.ongoing === 0 ? false : true,
      language: Language[activity.language],
      skillLevel: SkillLevel[activity.skillLevel],
      ongoingDays: parseInt(activity.ongoingDays),
      date: (activity.date as Date).toUTCString(),
      categories: (activity.categories as typeof categoryOptions).map(
        (c): ICategory => ({
          name: c.value,
        })
      ),
      tag: activity["tag"]
        ? // activity.tag !== undefined || activity.tag !== null
          Object.entries(activity.tag).map(
            (k, v): ITag => ({
              name: k.toString().split(",")[1],
            })
          )
        : ([] as ITag[]),
    };
    let file: File | undefined = newActivity.file;
    console.log("new activity is");
    console.log(newActivity);
    console.log(newActivity.date);
    console.log("file is");
    console.log(file);
    console.log("new activity stringify is");
    console.log(JSON.stringify(newActivity));

    //TODO:fix createActivity
    createActivityNew(newActivity, file).then(() =>
      history.push(`/activities/${newActivity.id}`)
    );
    // }
    // else {
    //   updateActivity(activity).then(() =>
    //     history.push(`/activities/${activity.id}`)
    //   );
    // }
  }

  if (loadingInitial) <LoadingComponent content='Loading Activity' />;
  return (
    <>
      <CircleGrid
        color='#10b981cc'
        size='175px'
        zIndex={-1}
        position='absolute'
        top='35%'
        left='-1em'
      />
      <Circle
        color='linear-gradient(135deg, #d8c395, #bba981)'
        // color='linear-gradient(135deg, #a5b4fc, #6366f1)'
        size={["150px", "150px", "180px", "180px"]}
        zIndex={-1}
        left={"-2%"}
        top={"6%"}
        position='absolute'
      />
      {/* <Message
        color='linear-gradient(135deg, #00b09b, #96c93d)'
        height='150px'
        width='180px'
        zIndex={-1}
        position='absolute'
        top='17em'
        right='-1em'
      /> */}

      <Diamond
        // color='linear-gradient(135deg, #dc493a, #5162FA)'
        color='linear-gradient(135deg, #93c5fd, #10b981cc)'
        size='100px'
        zIndex={-1}
        position='absolute'
        top='70%'
        right='-0.7em'
      />

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
                  placeholder='What kind of thing do you feel doing? (upto 3 categories)'
                  name='categories'
                />
                <MyTextInput
                  name='title'
                  placeholder='What would you like to do'
                />
                <MyTextArea
                  rows={3}
                  placeholder='Details - share any helpful information e.g.
                  goals, cause, motivation, ideas for more context. List any special skills or qualifications which you may require in an attendee.'
                  name='description'
                />
                <MyTagsTextInput
                  name='tag'
                  placeholder='Relevant tags (upto 8) e.g. discussion javascript figma mentorship books kungfu anime ps5'
                  maxTagCount={7}
                  previouslySetValue={(activity.tag as string[]) ?? undefined}
                />
                {/* <MySelectInput
                  options={categoryOptions}
                  placeholder='Category'
                  name='category'
                /> */}
                <MyDateInput
                  placeholderText='When would you like to do this - start date time'
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
                  label='Number of attendees allowed (max 5)'
                  defaultValue={1}
                />
                <MyCheckboxWithTextNumberInput
                  name='ongoing'
                  label='Repeat until filled? (private setting)'
                  popUpContent='Note: Display this post on the main page for the desired
                  number of days or until the number of attendees is reached'
                  defaultValue={(activity.ongoing ? 1 : 0) ?? 0}
                  textInputName='ongoingDays'
                  textInputPlaceholder='Number of days to renew for if not filled, only you can see this'
                  textInputLabel='Repeat for (days)'
                  textInputDefaultValue={activity.ongoingDays ?? 0}
                />
                <MyCheckboxInput
                  name='private'
                  label='Private Event?'
                  popUpContent='Note: Private activities do not appear on the main page, but
                    can be accessed via the URL. Use this when connecting with
                    someone you already know'
                  defaultValue={(activity.private ? 1 : 0) ?? 0}
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
                  defaultValue={
                    (activity.language === 0 && !activity.id
                      ? "English"
                      : activity.language) ?? "English"
                  }
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
                  defaultValue={
                    (activity.skillLevel === 0 && !activity.id
                      ? "Everyone"
                      : activity.skillLevel) ?? "Everyone"
                  }
                />
                {/* <MyTextInput
                  name='asset'
                  placeholder='Helpful Links , only visible to approved attendees e.g. Git Repo, Figma, Youtube, Movie etc'
                  label='Sharing Link (Optional)'
                /> */}
                <MyTextArea
                  rows={1}
                  label='Sharing Link (Optional)'
                  placeholder='Helpful Links , only visible to approved attendees e.g. Git Repo, Figma, Youtube, Movie etc'
                  name='assets'
                />
                <MyFileUpload
                  name='file'
                  label='Upload Picture (Optional) - .jpg .png .gif image formats accepted'
                  imageUrl={activity.imageUrl}
                />
                {/* <Header content='Location Details' sub color='teal' />

                <MyTextInput placeholder='City' name='city' />
                <MyTextInput placeholder='Venue' name='venue' /> */}
                <Button
                  loading={isSubmitting}
                  floated='right'
                  positive
                  circular
                  style={{
                    backgroundColor: "#5162FA",
                    color: "white",
                    boxShadow: "#404cb8 1px 3px 0px 0px",
                  }}
                  type='submit'
                  content='Submit'
                  disabled={isSubmitting || !dirty || !isValid}
                />
                <Button
                  circular
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
