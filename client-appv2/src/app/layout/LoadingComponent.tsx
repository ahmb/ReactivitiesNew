import React from "react";
import { Container, Dimmer, Grid, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content?: string;
  style?: {};
  segmentWidthPx?: number;
  segmentHeightPx?: number;
}

export default function LoadingComponent({
  inverted = true,
  content = "Loading...",
  style = { marginTop: "-30em", zIndex: "100" },
  segmentWidthPx = 600,
  segmentHeightPx = 100,
}: Props) {
  return (
    <Grid
      style={{
        height: segmentHeightPx + "em",
        backgroundColor: "#eaeaea",
        zIndex: 1,
        top: "-20em",
      }}>
      <Dimmer active inverted={inverted}>
        <Loader className='featureLoader' content={content} style={style} />
      </Dimmer>
    </Grid>
  );
}
