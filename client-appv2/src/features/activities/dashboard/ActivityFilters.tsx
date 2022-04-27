import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Button, Grid, Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useTransition, animated, config } from "react-spring";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import {
  HorizontalScrollContainer,
  HorizontalScrollItem,
} from "react-simple-horizontal-scroller";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const transitions = useTransition(isCalendarVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 200,
    config: config.molasses,
  });

  function ToggleIsCalendarVisible() {
    isCalendarVisible
      ? setIsCalendarVisible(false)
      : setIsCalendarVisible(true);
  }

  return (
    <>
      <div>
        <Grid.Row stretched>
          <Header
            size='huge'
            content='Activities'
            style={{ float: "left", paddingLeft: "10px", paddingTop: "5px" }}
          />
          <Button
            icon='calendar'
            circular
            style={{ position: "absolute", right: "10px" }}
            size='large'
            onClick={(_) => ToggleIsCalendarVisible()}
            active={isCalendarVisible}
          />
        </Grid.Row>
        <br />
      </div>

      <Grid.Row className='aliceBlueBg' styles={{ paddingBottom: "0px" }}>
        {transitions(
          (styles, isCalendarVisible) =>
            isCalendarVisible && (
              <animated.div style={styles}>
                <Calendar
                  onChange={(date: Date) => setPredicate("startDate", date)}
                  value={predicate.get("startDate") || new Date()}
                />
              </animated.div>
            )
        )}
      </Grid.Row>

      <Grid.Row className='aliceBlueBg' stretched style={{ paddingTop: "0px" }}>
        <Menu size='large' style={{ width: "100%", marginTop: 25 }}>
          {/* <Header icon='filter' attached style={{ color: "#009ee6" }}/> */}
          <HorizontalScrollContainer>
            <Menu.Item
              active={predicate.has("all")}
              onClick={() => setPredicate("all", "true")}>
              <Header
                size='large'
                style={{ paddingTop: "10px" }}
                content='💡'
              />
              <p style={{ paddingTop: "5px", paddingLeft: "5px" }}>All</p>
            </Menu.Item>

            <Menu.Item
              active={predicate.has("isGoing")}
              onClick={() => setPredicate("isGoing", "true")}>
              <Header
                size='large'
                style={{ paddingTop: "10px" }}
                content='😁'
              />
              <p style={{ paddingTop: "5px", paddingLeft: "5px" }}>Mine</p>
            </Menu.Item>
            {/* <Menu.Item
              content='Hosting'
              active={predicate.has("isHost")}
              onClick={() => setPredicate("isHost", "true")}
              style={{ paddingTop: "20px" }}
            /> */}

            {categoryOptions.map(({ id, text, icon }) => (
              <HorizontalScrollItem id={id} key={id}>
                <Menu.Item
                  key={id}
                  active={predicate.has("isGoing")}
                  // style={{ display: "inline" }}
                  onClick={() => setPredicate("isGoing", "true")}>
                  <Header size='large' style={{ paddingTop: "10px" }}>
                    {icon + " "}
                  </Header>
                  <span
                    className='categoryText'
                    style={{ paddingTop: "5px", paddingLeft: "5px" }}>
                    {text}
                  </span>
                </Menu.Item>
              </HorizontalScrollItem>
            ))}
          </HorizontalScrollContainer>
        </Menu>
      </Grid.Row>
    </>
  );
});
