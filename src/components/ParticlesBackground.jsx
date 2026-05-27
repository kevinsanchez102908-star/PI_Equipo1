import { useCallback } from "react";

import Particles from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {

  const particlesInit = useCallback(async (engine) => {

    await loadSlim(engine);

  }, []);

  return (

    <Particles

      id="tsparticles"

      init={particlesInit}

      options={{

        fullScreen: false,

        background: {
          color: {
            value: "transparent",
          },
        },

        fpsLimit: 120,

        particles: {

          color: {
            value: ["#ec4899", "#8b5cf6", "#06b6d4"],
          },

          links: {
            color: "#ffffff",
            distance: 140,
            enable: true,
            opacity: 0.08,
            width: 1,
          },

          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },

          number: {
            density: {
              enable: true,
            },
            value: 60,
          },

          opacity: {
            value: 0.4,
          },

          shape: {
            type: "circle",
          },

          size: {
            value: { min: 1, max: 4 },
          },

        },

        detectRetina: true,

      }}

      className="absolute inset-0 z-0"

    />

  );

};

export default ParticlesBackground;