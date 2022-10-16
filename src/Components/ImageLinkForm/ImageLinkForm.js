import React from "react";
import Rank from "../Rank/Rank";
import Logo from "../Logo/Logo";
import FaceRecognition from "../FaceRecognition/FaceRecognition";

const ImageLinkForm = ({
  onInputChange,
  onPictureSubmit,
  name,
  entries,
  boxes,
  imageUrl,
}) => {
  let picture = null;
  if (imageUrl === "") {
    picture = <Logo />;
  } else {
    picture = <FaceRecognition boxes={boxes} imageUrl={imageUrl} />;
  }
  return (
    <section class="text-gray-600 body-font">
      <div class="container mx-auto px-5 py-24 flex flex-col items-center lg:flex-row">
        <div class="w-full mb-10 flex flex-row justify-center lg:w-1/2 ">
          {picture}
        </div>
        <div class="w-full lg:flex-grow lg:w-1/2 lg:pl-24 md:pl-16 flex flex-col lg:items-start lg:text-left items-center text-center">
          <h1 class="title-font text-white text-4xl mb-4 font-medium sm:text-5xl">
            Face Detection App:
          </h1>
          <p class="mb-8 leading-relaxed text-white">
            Smart brain will detect faces in your pictures. Give it a try.
          </p>
          <Rank class="mt=10" name={name} entries={entries} />
          <div class="flex justify-center items-end lg:justify-start">
            <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
              <label for="hero-field" class="leading-7 text-white text-sm">
                Image URL
              </label>
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                onChange={onInputChange}
                class="w-full bg-gray-100 rounded border border-white-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
            <button
              onClick={onPictureSubmit}
              class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageLinkForm;
