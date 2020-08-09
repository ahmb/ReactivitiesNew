import React, { useState, FormEvent } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editmode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //console.log(event.currentTarget.value);
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    //console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="title"
          onChange={handleInputChange}
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          name="description"
          onChange={handleInputChange}
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          onChange={handleInputChange}
          value={activity.category}
        />
        <Form.Input
          name="date"
          type="datetime-local"
          placeholder="Date"
          onChange={handleInputChange}
          value={activity.date}
        />
        <Form.Input
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          value={activity.city}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          onChange={handleInputChange}
          value={activity.venue}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
