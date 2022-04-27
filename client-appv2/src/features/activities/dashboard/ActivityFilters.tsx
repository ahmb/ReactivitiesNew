import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Button, Grid, Header, Icon, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useTransition, animated, config } from "react-spring";

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

  //   0:
  // fig: 1
  // op:
  // output: Array(2)
  // 0: 0
  // 1: 1
  // length: 2
  // [[Prototype]]: Array(0)
  // range: Array(2)
  // 0: 0.75
  // 1: 1
  // length: 2
  // [[Prototype]]: Array(0)
  // [[Prototype]]: Object
  // trans:
  // extrapolate: "clamp"
  // output: Array(2)
  // 0: -40
  // 1: 0
  // length: 2
  // [[Prototype]]: Array(0)
  // range: Array(2)
  // 0: 0.75
  // 1: 1
  // length: 2
  // [[Prototype]]: Array(0)
  // [[Prototype]]: Object
  // [[Prototype]]: Object

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
      {/* <div style={{ display: "flex" }}>
        {transitions(({ opacity }, item) => (
          <animated.div
            style={{
              opacity: opacity.to(item.op),
              transform: opacity
                .to(item.trans)
                .to((y) => `translate3d(0,${y}px,0)`),
            }}>

          </animated.div>
        ))}
      </div> */}
      <Grid.Row className='aliceBlueBg' stretched style={{ paddingTop: "0px" }}>
        <Menu
          horizontal={true}
          size='large'
          style={{ width: "100%", marginTop: 25 }}>
          <Header icon='filter' attached className='' />
          <Menu.Item
            content='All'
            active={predicate.has("all")}
            onClick={() => setPredicate("all", "true")}
          />
          <Menu.Item
            content='Attending'
            active={predicate.has("isGoing")}
            onClick={() => setPredicate("isGoing", "true")}
          />
          <Menu.Item
            content='Hosting'
            active={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
          />
          <Menu.Item
            content='&#x1F4BE; Coding'
            active={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
          />
          <Menu.Item
            content='&#x1F5BC; Art&Design'
            active={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
          />
        </Menu>
      </Grid.Row>
    </>
  );
});
