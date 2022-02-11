import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    endDate: "",
    private: false,
    city: "",
    venue: "",
    imageUrl: "",
    latitude: 0,
    longitude: 0,
    isGoing: false,
    isHost: false,
    isApproved: false,
    attendees: "",
    comments: "",
    tags: "",
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        if (activity) {
          setActivity(activity);
        }
      });
  }, [id, loadActivity]);

  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) <LoadingComponent content='Loading Activity' />;
  return (
    <Segment clearing>
      <Form autoComplete='off' onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          as={Link}
          to='/activities'
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
});
