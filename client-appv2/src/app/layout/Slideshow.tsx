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
import { Icon } from "semantic-ui-react";

export default function Slideshow() {
  return (
    <CarouselProvider
      //   hasMasterSpinner={true}
      naturalSlideWidth={750}
      naturalSlideHeight={350}
      interval={5000}
      isPlaying={true}
      totalSlides={5}
      infinite={true}>
      <Slider
        style={{
          height: "350px",
          width: "750px",
          justifyContent: "center",
          alignItems: "fill",
        }}>
        <Slide index={0}>
          {" "}
          <Image
            hasMasterSpinner
            src='https://res.cloudinary.com/dpvigehxt/image/upload/v1655008516/categoryImages/collaborate_nq9zj1.jpg'
          />
        </Slide>
        <Slide index={1}>
          <Image
            hasMasterSpinner
            src='https://res.cloudinary.com/dpvigehxt/image/upload/v1655008515/categoryImages/watch_vftanf.jpg'
          />
        </Slide>
        <Slide index={2}>
          <Image
            hasMasterSpinner
            src='https://res.cloudinary.com/dpvigehxt/image/upload/v1655008515/categoryImages/followYourDreams_bgy8c6.jpg'
          />
        </Slide>
        <Slide index={3}>
          <Image
            hasMasterSpinner
            src='https://res.cloudinary.com/dpvigehxt/image/upload/v1655008516/categoryImages/combineSkills_mllkru.jpg'
          />
        </Slide>
        <Slide index={4}>
          <Image
            hasMasterSpinner
            src='https://res.cloudinary.com/dpvigehxt/image/upload/v1655008516/categoryImages/create_tjkgpf.jpg'
          />
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
