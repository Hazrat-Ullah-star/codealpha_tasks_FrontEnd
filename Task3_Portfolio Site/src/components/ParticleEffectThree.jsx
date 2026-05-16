import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleEffectThree = () => {
  const [init, setInit] = useState(false);

  const [themeColor, setThemeColor] = useState("#00f2fe"); // Default Dark Mode color

  const updateColorByTheme = () => {
    if (document.body.classList.contains('light-mode')) {
      setThemeColor("#0284c7"); // Light Mode Accent Primary
    } else if (document.body.classList.contains('hacker-mode')) {
      setThemeColor("#00ff00"); // Hacker Mode Accent Primary
    } else {
      setThemeColor("#00d2ff"); // Dark Mode Accent Primary
    }
  };

  useEffect(() => {
    // Initial color setup
    updateColorByTheme();

    // Create a MutationObserver to watch for class changes on the body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColorByTheme();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    return () => observer.disconnect();
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="particles-bg"
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "bubble" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, links: { opacity: 0.5 } },
            bubble: { distance: 400, size: 10, opacity: 1 },
            repulse: { distance: 75 },
          },
        },
        particles: {
          color: {
            value: themeColor,
          },
          links: {
            color: themeColor,
            distance: 80,
            enable: true,
            opacity: 0.35,
            width: 1,
          },
          move: {
            direction: "right",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 300,
          },
          opacity: {
            value: 0.1,
            random: false,
            animation: {
              enable: false,
              speed: 1,
              minimumValue: 0.25,
              sync: false
            },
          },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#ffffff", opacity: 1 },
          },
          size: {
            value: { min: 0.5, max: 1 },
            random: true,
            animation: {
              enable: false,
              speed: 40,
              minimumValue: 1,
              sync: false
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleEffectThree;
