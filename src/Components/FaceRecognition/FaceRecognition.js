import React from "react";
import "./FaceRecognition.css"


const FaceRecognition = ({ box, imageUrl }) => {
    return (
        <div class="flex flex-row justify-center">
            <div class="facebox">
                <img id="inputimage" class="face-img" src={imageUrl} alt="" />
                <div id="bounding-box" class= {`bounding-box ${box.color}`}
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                    }}
                >
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition