import React from "react";
import { Header } from "semantic-ui-react";
import LookingGraphic from "../../features/graphics/LookingGraphic";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Header size="large" id="funkyHeader">
        {/* <Icon name='search' /> */}
        404 - Page Not Found
      </Header>
      <Header size="small">
        Sorry, we could not find the page you requested. IT support has
        been notified!
      </Header>

      <LookingGraphic
        height="700"
        width="500"
        style={{ display: "inline-block", margin: "auto", marginTop: -100 }}
      />
    </div>
  );
};

export default NotFound;
