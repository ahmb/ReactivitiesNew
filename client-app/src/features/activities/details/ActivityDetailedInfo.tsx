import React, { Fragment } from "react";
import { Segment, Grid, Icon, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import {
  covertDateUTCtoLocal,
  stringCapitalize,
} from "../../../app/common/util/util";
import { category } from "../../../app/common/options/categoryOptions";

const ActivityDetailedInfo: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={1}>
          {category.filter((e) => e.value === activity.category).length > 0 && (
            <Image
              avatar
              circular
              src={`/assets/categoryImages/${activity.category
                .replace("&", "")
                .replace(/\s/g, "")
                .toLowerCase()}.png`}
              // style={{ width: "1.5em", height: "1.5em" }}
            />
          )}
          {category.filter((e) => e.value === activity.category).length ===
            0 && (
            <Image
              avatar
              circular
              src={"/assets/categoryImages/misc.png"}
              // style={{ marginBotton: -13, marginTop: -3 }}
            />
          )}
        </Grid.Column>
        <Grid.Column width={15}>
          <p>
            <b>{stringCapitalize(activity.category)}</b>
          </p>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={1}>
          <Icon size="large" color="red" name="info" />
        </Grid.Column>
        <Grid.Column width={15}>
          <p>{activity.description}</p>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={1}>
          <Icon name="calendar alternate outline" size="large" color="red" />
        </Grid.Column>
        <Grid.Column width={15}>
        <b>Start &nbsp; &nbsp; &nbsp;</b>

          <span>
            {format(activity.date, "eeee do MMM")} at{" "}
            {format(activity.date, "h:mm a")}{" "}
          </span>
          <br/>
        <b>End &nbsp; &nbsp; &nbsp; &nbsp;</b>

          <span>
            {format(activity.endDate, "eeee do MMM")} at{" "}
            {format(activity.endDate, "h:mm a")}{" "}
          </span>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={1}>
          <Icon name="hashtag" size="large" color="red" />
        </Grid.Column>
        <Grid.Column width={11}>
          <span>{activity.tags}</span>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default ActivityDetailedInfo;
