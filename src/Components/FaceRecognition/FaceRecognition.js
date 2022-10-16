import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ boxes, imageUrl }) => {
  const boxesElements = boxes.map((box, index) => {
    return (
      <div
        key={"#" + index}
        class={`bounding-box ${box.color}`}
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    );
  });

  return (
    <div class="flex flex-row justify-center">
      <div class="facebox">
        <img id="inputimage" class="face-img" src={imageUrl} alt="" />
        {boxesElements}
      </div>
    </div>
  );
};

export default FaceRecognition;
