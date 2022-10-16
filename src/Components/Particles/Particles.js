import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import React, { useCallback, useMemo } from "react";

const ParticlesComponent = () => {
  const options = useMemo(() => {
    return {
      fullscreen: {
        enable: true,
        zIndex: 1000,
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 5,
          },
          repulse: {
            distance: 400,
          },
        },
      },
      particles: {
        links: {
          enable: true,
          distance: 160,
        },
        move: {
          enable: true,
          speed: {
            min: 1,
            max: 5,
          },
        },
        opacity: {
          value: {
            min: 0.05,
            max: 0.1,
          },
        },
        size: {
          value: {
            min: 0.5,
            max: 1,
          },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return <Particles init={particlesInit} options={options} />;
};

export default ParticlesComponent;
