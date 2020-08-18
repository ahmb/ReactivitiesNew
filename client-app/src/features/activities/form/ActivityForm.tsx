import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Form, Segment, Button, Grid } from "semantic-ui-react";
import { IActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);

  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivityFormValues>({
    id: undefined,
    title: "",
    category: "",
    description: "",
    date: undefined,
    time: undefined,
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id).then(
        (activity) => setActivity(activity)
      );
    }
  
  }, [
    loadActivity,
    match.params.id,
  ]);

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity} = values;
    activity.date = dateAndTime;
    console.log(dateAndTime);
    
  };

  // const handleSubmit = () => {
  //   //console.log(activity);
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  component={TextAreaInput}
                  rows={3}
                  placeholder="Description"
                  value={activity.description}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  component={SelectInput}
                  value={activity.category}
                  options={category}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    // type="datetime-local"
                    placeholder="Date"
                    component={DateInput}
                    value={activity.date}
                    date={true}
                  />
                  <Field
                    name="time"
                    // type="datetime-local"
                    placeholder="Time"
                    component={DateInput}
                    value={activity.time}
                    time={true}
                  />
                </Form.Group>

                <Field
                  name="city"
                  placeholder="City"
                  component={TextInput}
                  value={activity.city}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  component={TextInput}
                  value={activity.venue}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => {
                    history.push("/activities");
                  }}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
