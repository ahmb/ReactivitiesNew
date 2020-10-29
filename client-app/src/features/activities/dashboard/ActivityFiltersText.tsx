import React, {
  createRef,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Menu, Header, Button, Grid, Image } from "semantic-ui-react";
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
          <Menu.Item header><b>Filter By</b></Menu.Item>

          <Menu.Item
            active={predicate.size === 0}
            onClick={() => setPredicate("all", "true")}
            color={"blue"}
            name={"all"}
            content={"All"}
          />
          <Menu.Item
            active={predicate.has("isGoing")}
            onClick={() => setPredicate("isGoing", "true")}
            color={"blue"}
            name={"username"}
            content={"Attending"}
          />
          <Menu.Item
            active={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
            color={"blue"}
            name={"host"}
            content={"Hosting"}
          />
          <Menu.Item
            color={"blue"}
            // name={"calendar"}
            // content={"Date"}
            content="Date"
            active={predicate.has("startDate")}
            onClick={() =>
              openModal(
                <Calendar
                  onChange={(date) => setPredicate("startDate", date!)}
                  value={predicate.get("startDate") || new Date()}
                />
              )
            }
          />
          
        </Menu>
      </Grid.Row>
      <Grid.Row>
        <Menu className="filtersHeader" borderless compact={true} text vertical>
          <Menu.Item header>Categories</Menu.Item>
          {category.map((cat) => (
            <Fragment key={cat.key}>
            <Menu.Item
              key={cat.key}
              name={`${cat.value}`}
              active={Array.from(predicate.values()).filter((x)=> x === cat.value).length>0}
              onClick={() => setPredicate("category", cat.value)}
              color={"blue"}
              // active={activeItem === 'closest'}
              // onClick={this.handleItemClick}
            >
            <Image
            avatar
            circular
            src={`/assets/categoryImages/${cat.key}.png`}
            style={{width:'1.5em', height:'1.5em'}}
          />
          {cat.text}
          </Menu.Item>
            </Fragment>
          ))}
        </Menu>
      </Grid.Row>
    </Fragment>
  );
};

export default observer(ActivityFiltersText);
