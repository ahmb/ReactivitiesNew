import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  "assets/exploreSlideshow/slide.jpg",
  "assets/exploreSlideshow/slide2.jpg",
  "assets/exploreSlideshow/slide3.jpg",
];

const ExploreSlideshow = () => {
  return (
    <div className="slide-container" style={{ marginBottom: 5 }}>
      <Slide>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[0]})`,
              height: 250,
              borderRadius: 10,
            }}
          />
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[1]})`,
              height: 250,
              borderRadius: 10,
            }}
          />
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[2]})`,
              height: 250,
              borderRadius: 10,
            }}
          />
        </div>
      </Slide>
    </div>
  );
};

export default ExploreSlideshow;
