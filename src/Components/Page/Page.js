import React from "react";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";

const Page = ({
  route,
  onInputChange,
  onPictureSubmit,
  name,
  entries,
  boxes,
  imageUrl,
  onRouteChange,
  loadUser,
}) => {
  if (route === "home") {
    return (
      <ImageLinkForm
        onInputChange={onInputChange}
        onPictureSubmit={onPictureSubmit}
        name={name}
        entries={entries}
        boxes={boxes}
        imageUrl={imageUrl}
      />
    );
  } else if (route === "signin") {
    return <Signin onRouteChange={onRouteChange} loadUser={loadUser} />;
  } else {
    return <Register onRouteChange={onRouteChange} loadUser={loadUser} />;
  }
};

export default Page;
