import React from "react";
import LogoSrc from "./project.png";

const Logo = () => {
  return (
    <div class="w-full">
      <img
        class="object-cover object-center rounded-lg Tilt-inner"
        alt="hero"
        src={LogoSrc}
      />
    </div>
  );
};

export default Logo;
