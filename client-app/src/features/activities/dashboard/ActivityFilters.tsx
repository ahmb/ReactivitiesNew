import React, {
  createRef,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Menu, Header, Button } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const ActivityFilters: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  const { openModal } = rootStore.modalStore;
  const [isSticky, setSticky] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (ref.current && ref) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <Fragment>
      {/* <Ref innerRef={contextRef}>
        <Sticky context={contextRef}  > */}
      <div
        ref={ref}
        className={isSticky ? "sticky stickyWrapper" : "stickyWrapper"}>
        <Menu
          className='filtersHeader'
          size={"large"}
          style={{ width: "100%" }}
          borderless
          id='filterBar'
          compact={true}>
          <Header
            icon={"filter"}
            attached
            color={"blue"}
            className={"filterMenuIcon"}
          />
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
            icon='calendar'
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

          <Menu.Menu position='right'>
            <Button
              as={NavLink}
              to='/createActivity'
              positive
              // content="Create Activity"
              icon='plus'
              size='large'
              style={{ margin: "0" }}
              content='Post Activity'
              id='stickyButton'
            />
          </Menu.Menu>
        </Menu>
      </div>
    </Fragment>
  );
};

export default observer(ActivityFilters);
