import React, { Fragment, useContext } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Fragment>
      <Menu className='filtersHeader' horizontal size={"large"} style={{ width: "100%"}}>
        <Header icon={"filter"} attached color={"blue"} content={"Filters"} />
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
          name={"calendar"}
          content={"Date"}
          icon="calendar"
          onClick={()=> openModal(
            <Calendar
              onChange={(date) => setPredicate("startDate", date!)}
              value={predicate.get("startDate") || new Date()}
            />
          )}
        />
      </Menu>
      {/* <Header
        icon={"calendar"}
        attached
        color={"blue"}
        content={"Select Date"}
      />
      <Calendar
        onChange={(date) => setPredicate("startDate", date!)}
        value={predicate.get("startDate") || new Date()}
      /> */}
    </Fragment>
  );
};

export default observer(ActivityFilters);
