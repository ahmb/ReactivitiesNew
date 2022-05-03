import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
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
import { ActivityFormValues } from "../../../app/models/activity";
import MyMultiSelectInput from "../../../app/common/form/MyMultiSelectInput";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    categories: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().max(255).required().label("value"),
        })
      )
      .min(1, "minimum 1,")
      .max(3, "maximum 3,")
      .required("categories are required"),
    date: Yup.date().required("The date is required").nullable(),
    endDate: Yup.date().required("The end date is required").nullable(),
    // TODO: this breaks the form and caused it to render as dirty upon initial
    // render of nullable valeus? - See: https://codeboosh.com/how-to-do-conditional-validation-with-formik-and-yup/
    //.min(Yup.ref("date"), "The end date cant be before start"),
    venue: Yup.string().required(),
    city: Yup.string().required(),
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
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}>
        {({ isSubmitting, isValid, dirty, handleSubmit }) => (
          <Form className='ui form' autoComplete='off' onSubmit={handleSubmit}>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectInput
              options={categoryOptions}
              placeholder='Category'
              name='category'
            />
            <MyMultiSelectInput
              options={categoryOptions}
              placeholder='Categories'
              name='categories'
            />
            <MyDateInput
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <MyDateInput
              placeholderText='EndDate'
              name='endDate'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='teal' />

            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
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
  );
});
