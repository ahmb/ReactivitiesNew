import React, {
  createRef,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Menu, Header, Button, Grid, Image, Icon } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { category } from "../../../app/common/options/categoryOptions";

const ActivityFiltersText: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Fragment>
      <Grid.Row>
        <Menu className="filtersHeader" borderless compact={true} text vertical>
          <Menu.Item header>
            <b>Filter By</b>
          </Menu.Item>

          <Menu.Item
            active={predicate.has("isGoing")}
            onClick={() => setPredicate("isGoing", "true")}
            color={"red"}
            name={"username"}
            content={"I'm Attending"}
          >
            <Icon name="users" />
            I'm Attending
          </Menu.Item>
          <Menu.Item
            active={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
            color={"red"}
            name={"host"}
            content={"I'm Hosting"}
          >
            <Icon name="user outline" />
            I'm Hosting
          </Menu.Item>
          <Menu.Item
            color={"red"}
            // name={"calendar"}
            // content={"Date"}
            content="Activity Date"
            active={predicate.has("startDate")}
            onClick={() =>
              openModal(
                <Calendar
                  onChange={(date) => setPredicate("startDate", date!)}
                  value={predicate.get("startDate") || new Date()}
                />
              )
            }
          >
            <Icon name="calendar alternate outline" />
            Activity Date
          </Menu.Item>
        </Menu>
      </Grid.Row>
      <Grid.Row>
        <Menu className="filtersHeader" borderless compact={true} text vertical>
          <Menu.Item header>Categories</Menu.Item>
          <Menu.Item
            active={predicate.size === 0}
            onClick={() => setPredicate("all", "true")}
            color={"blue"}
            name={"all"}
            content={"All"}
          >
            <Button id="categoryButton" active={predicate.size === 0}>
              {" "}
              {/* <Image
                  size='massive'
                    avatar
                    circular
                    src={`/assets/categoryImages/${cat.key}.png`}
                    style={{ width: "1.5em", height: "1.5em" }}
                  /> */}
              Show All
            </Button>
          </Menu.Item>
          {category.map((cat) => (
            <Fragment key={cat.key}>
              <Menu.Item
                key={cat.key}
                name={`${cat.value}`}
                active={
                  Array.from(predicate.values()).filter((x) => x === cat.value)
                    .length > 0
                }
                onClick={() => setPredicate("category", cat.value)}
                color={"blue"}
                // active={activeItem === 'closest'}
                // onClick={this.handleItemClick}
              >
                <Button
                  id="categoryButton"
                  active={
                    Array.from(predicate.values()).filter(
                      (x) => x === cat.value
                    ).length > 0
                  }
                >
                  {" "}
                  <Image
                    size="massive"
                    avatar
                    circular
                    src={`/assets/categoryImages/${cat.key}.png`}
                    style={{ width: "1.5em", height: "1.5em" }}
                  />
                  {cat.text}
                </Button>
              </Menu.Item>
            </Fragment>
          ))}
        </Menu>
      </Grid.Row>
    </Fragment>
  );
};

export default observer(ActivityFiltersText);
