import React, { useEffect, useState } from "react";
import { Container, Grid, Header, Loader, Popup } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import Slideshow from "../../../app/layout/Slideshow";
import Typed from "react-typed";
import { Circle, CircleGrid, Diamond, Cross } from "react-awesome-shapes";
import { NavLink } from "react-router-dom";

export default observer(function ActivityDashboard() {
  const { activityStore, userStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } =
    activityStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const { isLoggedIn } = userStore;

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  // if (activityStore.loadingInitial && !loadingNext)
  //   return <LoadingComponent content='Loading activities' />;

  return (
    <Grid>
      {/* d8c395 */}

      {/* #bba981 */}
      {!isLoggedIn && (
        <>
          <Grid.Row>
            <span style={{ paddingTop: "20px" }}>
              <span id='logo'>Wanna</span>
              <span id='logoAlt'>Go</span>
            </span>
          </Grid.Row>
          <Grid.Row>
            <Diamond
              color='linear-gradient(135deg, #93c5fd, #10b981cc)'
              size='100px'
              zIndex={-1}
              position='absolute'
              top='17em'
              right='5vw'
              style={{ overflow: "none" }}
            />
            <CircleGrid
              color='#10b981cc'
              size='100px'
              zIndex={-1}
              position='absolute'
              top='-4em'
              right='3vw'
              style={{ overflow: "none" }}
            />
            <Circle
              color='linear-gradient(135deg, #d8c395, #bba981)'
              // color='linear-gradient(135deg, #a5b4fc, #6366f1)'
              size={["150px", "150px", "180px", "180px"]}
              zIndex={-1}
              left={"-2%"}
              top={"6%"}
              position='absolute'
              style={{ overflow: "none" }}
            />
          </Grid.Row>
          <Container style={{ maxWidth: "100vw", paddingLeft: "0px" }}>
            <Grid.Row>
              <Header
                size='huge'
                floated='left'
                style={{
                  // paddingLeft: "10px",
                  paddingTop: "35px",
                  fontSize: "67px",
                  fontWeight: "900",
                  maxWidth: "80vw",
                }}>
                <span
                  style={{
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                  id='guestHeader'>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      marginBottom: "0px",
                    }}>
                    Do
                  </p>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      marginBottom: "0px",
                    }}>
                    cool stuff
                  </p>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      marginBottom: "0px",
                    }}>
                    with
                  </p>
                  <span style={{ whiteSpace: "nowrap" }}>
                    <p
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        marginBottom: "0px",
                      }}>
                      cool people{" "}
                      <Popup trigger={<span className='altFontColor'>*</span>}>
                        <span className='altFontColor'>*</span>psst..you're cool
                      </Popup>
                    </p>
                  </span>
                  <p
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      marginBottom: "0px",
                    }}>
                    globally
                    {/* <span className='altFontColor'>*</span> */}
                  </p>
                </span>
              </Header>
              <br />
            </Grid.Row>
          </Container>

          <Container style={{ maxWidth: "100vw", paddingLeft: "0px" }}>
            <Grid.Row>
              <span
                style={{
                  width: "20em",
                  height: "5em",
                  display: "inline",
                  fontSize: "24px",
                  paddingLeft: "0px",
                }}>
                Wanna{" "}
              </span>
              <span
                style={{
                  width: "20em",
                  height: "5em",
                  display: "inline",
                  fontSize: "24px",
                }}
                className='fontColor'>
                #
                <span style={{ display: "inline-block" }}>
                  <Typed
                    strings={[
                      "Code",
                      "Draw",
                      "Design",
                      "Chase your dreams",
                      "Game",
                      "Watch TV",
                      "Watch Movies",
                      "Startup",
                      "Business",
                      "Study",
                      "Collaborate",
                      "Learn by doing",
                      "No strings attached",
                      "Make friends",
                      "Do anything",
                      "Scroll down",
                    ]}
                    // typeSpeed={75}
                    // backSpeed={50}
                    loop
                    style={{ color: "black" }}
                  />
                </span>
              </span>
            </Grid.Row>
            <br />
            <br />

            {/* <Header
        size='huge'
        style={{
          marginBottom: "0px",
          marginTop: "-60px",

          // paddingTop: "5px",
        }}>
        <span className='altFontColor'>*</span>psst..you're cool 😁
      </Header> */}
            <Grid.Row>
              <Header
                content={
                  "Built-in real time text, audio, video & screensharing in the browser"
                }
                size='huge'
                style={{
                  marginBottom: "0px",
                  // marginTop: "-60px",

                  // paddingTop: "5px",
                }}
              />

              <Header
                content={
                  "Instantly create, schedule and participate in engaging activities with a small group of 2 to 6"
                }
                color='grey'
                size='medium'
                style={{
                  marginBottom: "0px",
                  // marginTop: "-60px",
                  paddingBottom: "0px",
                  // paddingTop: "5px",
                }}
              />
            </Grid.Row>
          </Container>
          <Grid.Row>
            <div
              style={{
                backgroundColor: "grey",
                padding: "25px",
                // marginTop: "20px",
              }}>
              <Header
                content={
                  "WannaGo values privacy, hobbies, respectful collaboration and potential for connection, between you and upto 5 other like minded people, from around the world. Create public or private, SSL Encrypted peer-to-peer Chatrooms - free forever with minimal ads if any *"
                }
                size='medium'
                style={{
                  marginBottom: "0px",
                  color: "#eaeaea",

                  // paddingTop: "5px",
                }}
              />
              <Header
                content={
                  "* Connections through VPN & 3/4/5G networks will remain encrypted but inherently require a WannaGo server to bridge peer-to-peer connectivity"
                }
                size='tiny'
                style={{
                  marginBottom: "0px",
                  color: "#eaeaea",
                  // paddingTop: "5px",
                }}
              />
            </div>
          </Grid.Row>
          <Grid.Row centered>
            <Header
              size='medium'
              floated='right'
              style={{
                // paddingTop: "5px",
                float: "center",
              }}>
              We do not tolerate explicit, derogatory or offensive content,
              please read our <NavLink to={"/code"}>Code of Conduct</NavLink>
            </Header>
          </Grid.Row>
        </>
      )}
      {isLoggedIn && (
        <Grid.Row centered>
          <Header
            content={
              "We do not tolerate explicit, derogatory or offensive content"
            }
            size='small'
            // floated='right'
            style={
              {
                // paddingTop: "5px",
                // float: "center",
              }
            }
            color='grey'
          />

          {/* <Header
            content={
              "WannaGo ver.0.7 Please submit issues or feedback to: contact@iwannagoapp.com "
            }
            size='small'
            // floated='right'
            style={
              {
                // paddingTop: "5px",
                // float: "center",
              }
            }
            color='grey'
          /> */}
        </Grid.Row>
      )}
      <Grid.Row centered>
        <Slideshow />
        {isLoggedIn && (
          <>
            <Diamond
              color='linear-gradient(135deg, #93c5fd, #10b981cc)'
              size='100px'
              zIndex={-1}
              position='absolute'
              top='39em'
              left='-1em'
            />
            <CircleGrid
              color='#10b981cc'
              size='175px'
              zIndex={-1}
              position='absolute'
              top='1em'
              right='0em'
            />
            <Circle
              color='linear-gradient(135deg, #d8c395, #bba981)'
              // color='linear-gradient(135deg, #a5b4fc, #6366f1)'
              size={["150px", "150px", "180px", "180px"]}
              zIndex={-1}
              left={"-2%"}
              top={"10em"}
              position='absolute'
            />
          </>
        )}
      </Grid.Row>

      {!isLoggedIn && (
        <Cross
          position='absolute'
          size='150px'
          // color='#0ea5e9'
          color='linear-gradient(135deg, #F7971E, #FFD200)'
          zIndex={-1}
          top='34em'
          left='-2em'
        />
      )}

      <ActivityFilters />

      <Grid.Row style={{ paddingTop: "0px" }}>
        <Grid.Column style={{ padding: "0px" }}>
          {activityStore.loadingInitial && !loadingNext ? (
            //  || true
            // {activityStore.loadingInitial && !loadingNext ? (

            <>
              <ActivityListItemPlaceholder />
              <ActivityListItemPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination?.currentPage < pagination?.totalPages
              }
              initialLoad={false}>
              <ActivityList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row></Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered style={{ paddingBottom: "100px" }}>
        <Grid.Column width={16}>
          <Header id='logo' style={{ color: "grey", textAlign: "center" }}>
            Feeling bored?
            <br /> Start an activity!
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
});
