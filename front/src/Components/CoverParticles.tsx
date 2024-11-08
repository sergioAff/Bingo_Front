"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const CoverParticles = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [numberParticle, setNumberParticle] = useState<number>(0);

  useEffect(() => {
    const initializeParticles = async () => {
      const { initParticlesEngine } = await import("@tsparticles/react");
      await initParticlesEngine(loadSlim);
      setIsInitialized(true);
    };

    initializeParticles();
  }, []);

  const handleClick = () => {
    if (numberParticle < 4) {
      setNumberParticle((prev) => prev + 1);
    }
  };

  if (!isInitialized) return null;

  return (
    <div className="w-[0px] z-0" onClick={handleClick}>
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: numberParticle <= 4 ? true : false,
                mode: "push",
              },
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            // Colores más oscuros para hacer las partículas menos visibles
            color: { value: "#333333" }, // Color oscuro (gris oscuro)
            links: {
              color: "#333333", // El mismo color oscuro para los enlaces
              distance: 150,
              enable: true,
              opacity: 0.3, // Menos opacidad para hacer los enlaces menos visibles
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              outModes: { default: "bounce" },
            },
            number: { density: { enable: true }, value: 80 },
            opacity: { value: 0.3 }, // Menos opacidad para las partículas
            shape: { type: "circle" },
            size: { value: { min: 2, max: 6 } }, // Tamaño más pequeño para hacer las partículas menos notorias
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};
