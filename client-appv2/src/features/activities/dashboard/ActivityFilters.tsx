import { observer } from "mobx-react-lite";
import { useState } from "react";
import Calendar from "react-calendar";
import { Button, Grid, Header, Menu, Container } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useTransition, animated, config } from "react-spring";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

import { useLocation } from "react-router-dom";
import { useMountEffect } from "../../../app/common/util/hooks";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
    commonStore: { isFilterNavSticky },
    userStore: { isLoggedIn },
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

  const location = useLocation();

  // const isNotMobile = useMediaQuery("(min-width: 450px)");
  useMountEffect(() => {
    ToggleIsCalendarVisible();
  });

  return (
    <>
      <Grid.Row>
        <Grid.Column width={13}>
          <Header
            float='left'
            content='Activities'
            style={{
              float: "left",
              paddingTop: "5px",
              fontSize: "36px",
            }}
          />
          {/* <p
              // id='guestHeader'
              style={{ fontSize: "36px", fontWeight: "normal" }}>
              Activities
            </p> */}
          {/* </Header> */}
        </Grid.Column>
        <Grid.Column width={3}>
          <Button
            icon='calendar'
            circular
            className='calendarToggleButton'
            style={{
              // position: "absolute",
              // right: "30px",
              backgroundColor: "#5162FA",
              boxShadow: "#404cb8 1px 3px 0px 0px",
              color: "white",
              // marginLeft: "30px",
            }}
            size='huge'
            onClick={(_) => ToggleIsCalendarVisible()}
            active={isCalendarVisible}
            floated='right'
          />
        </Grid.Column>
      </Grid.Row>
      <br />

      <Grid.Row
        centered
        className='aliceBlueBg'
        style={{
          padding: "2% 2% 2%",
          borderRadius: "20px 20px 0px 0px",
          paddingBottom: "3%",
        }}>
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

      <Grid.Row
        className='aliceBlueBg'
        stretched
        style={{ paddingTop: "0px", paddingBottom: "30px" }}>
        <Container>
          <Header
            size='medium'
            content='Categories'
            style={{ float: "left", paddingLeft: "10px", paddingTop: "5px" }}
          />
        </Container>

        <Menu
          size='large'
          style={
            !isFilterNavSticky && location.pathname === "/"
              ? { width: "100%", marginTop: 25 }
              : {
                  width: "100%",
                  margin: "px",
                  visibility: "hidden",
                  padding: "0px",
                }
          }
          className='filterNavMain'>
          {/* <Header icon='filter' attached style={{ color: "#009ee6" }}/> */}
          <Menu.Item
            active={predicate.has("all")}
            onClick={() => setPredicate("all", "true")}>
            {/* <Header
                size='medium'
                style={
                  {
                    // paddingTop: "10px"
                  }
                }
                content='💡'
              /> */}
            <p
              style={{
                fontSize: "18px",

                // paddingTop: "5px", paddingLeft: "5px"
              }}>
              💡 All
            </p>
          </Menu.Item>
          {isLoggedIn && (
            <Menu.Item
              active={predicate.has("isGoing")}
              onClick={() => setPredicate("isGoing", "true")}>
              <p
                style={{
                  fontSize: "18px",
                }}>
                ✅ Mine
              </p>
            </Menu.Item>
          )}
          {/* <Menu.Item
              content='Hosting'
              active={predicate.has("isHost")}
              onClick={() => setPredicate("isHost", "true")}
              style={{ paddingTop: "20px" }}
            /> */}

          {categoryOptions.map(({ id, text, icon, label, value }) => (
            // <HorizontalScrollItem
            //   id={id}
            //   key={id}
            //   style={{ display: "inline" }}>
            <Menu.Item
              key={id}
              active={(predicate.get("category") as string) === value}
              onClick={() => setPredicate("category", value)}>
              <p
                style={{
                  whiteSpace: "nowrap",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                  fontSize: "18px",
                }}>
                {label}
              </p>
            </Menu.Item>
            // </HorizontalScrollItem>
          ))}
        </Menu>
      </Grid.Row>
    </>
  );
});
