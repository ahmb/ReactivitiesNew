import React, { Fragment, useEffect } from "react";

const VideoChat = () => {
  useEffect(() => {
    document.addEventListener("click", async (event) => {
      if ((event.target as HTMLElement).id === "videoButton") {
        const stream = await window.navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const video = document.getElementById("video") as HTMLVideoElement;
        video!.srcObject = stream;
        video!.play();
        
      }
    });
    // return () => {
    //     cleanup , need to remove event listener here
    // }
  }, []);

  return (
    <Fragment>
      <div>
        <video id="video" controls autoPlay></video>
      </div>
      <div>
        <button id="videoButton">Start Video</button>
      </div>
    </Fragment>
  );
};

export default VideoChat;
