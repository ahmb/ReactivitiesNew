import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Button, Icon } from "semantic-ui-react";

export default function Slideshow() {
  return (
    <CarouselProvider
      //   hasMasterSpinner={true}
      naturalSlideWidth={400}
      naturalSlideHeight={300}
      interval={5000}
      isPlaying={true}
      totalSlides={4}
      infinite={true}>
      <Slider
        style={{
          height: "300px",
          width: "400px",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Slide index={0}>
          {" "}
          <Image
            hasMasterSpinner
            src='/assets/exploreSlideshow/collaborate.jpg'
          />
        </Slide>
        <Slide index={1}>
          <Image hasMasterSpinner src='/assets/exploreSlideshow/study.jpg' />
        </Slide>
        <Slide index={2}>
          <Image hasMasterSpinner src='/assets/exploreSlideshow/design.jpg' />
        </Slide>
        <Slide index={3}>
          <Image hasMasterSpinner src='/assets/exploreSlideshow/code.jpg' />
        </Slide>
      </Slider>
      <ButtonBack
        style={{
          borderWidth: 0,
          backgroundColor: "transparent",
          position: "absolute",
          bottom: "150px",
          left: "0px",
        }}>
        <Icon circular name='angle left' size='large' />
      </ButtonBack>
      <ButtonNext
        style={{
          borderWidth: 0,
          backgroundColor: "transparent",
          position: "absolute",
          bottom: "150px",
          right: "0px",
        }}>
        <Icon circular name='angle right' size='large' />
      </ButtonNext>
    </CarouselProvider>
  );
}
