import * as THREE from "three";
import { useEffect } from "react";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default function Experience({ canvas }) {
  const scene = new THREE.Scene();
  const time = new Time();
  const sizes = new Sizes();
  const camera = new Camera();
  const renderer = new Renderer();
  const resources = new Resources(assets);
  const theme = new Theme();
  const world = new World();
  const preloader = new Preloader();

  useEffect(() => {
    preloader.on("enablecontrols", () => {
      const controls = new Controls();
    });

    sizes.on("resize", () => {
      resize();
    });

    time.on("update", () => {
      update();
    });

    return () => {
      preloader.removeAllListeners();
      sizes.removeAllListeners();
      time.removeAllListeners();
    };
  }, []);

  function resize() {
    camera.resize();
    world.resize();
    renderer.resize();
  }

  function update() {
    preloader.update();
    camera.update();
    world.update();
    renderer.update();
    if (controls) {
      controls.update();
    }
  }

  return null;
}
