import React from "react";
import Tilt from "react-tilt";
import LogoSrc from "./project.png";

const Logo = () => {
  return (
    <div class="w-full">
      <Tilt
        class="Tilt rounded-lg drop-shadow-lg flex flex-col justify-center"
        options={{ max: 10 }}
      >
        <img
          class="object-cover object-center rounded-lg Tilt-inner"
          alt="hero"
          src={LogoSrc}
        />
      </Tilt>
    </div>
  );
};

export default Logo;
