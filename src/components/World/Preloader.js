import React, { useState, useEffect } from "react";
import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/covertDivsToSpans.js";

import React, { useState, useEffect } from "react";
import Experience from "./Experience";

function Preloader() {
    const [device, setDevice] = useState(null);
  
    useEffect(() => {
      const experience = new Experience();
      const { sizes, resources, camera, world } = experience;
  
      const onSwitchDevice = (newDevice) => {
        setDevice(newDevice);
      };
  
      sizes.on("switchdevice", onSwitchDevice);
  
      world.on("worldready", () => {
        setAssets();
        playIntro();
      });
  
      return () => {
        // Clean up event listeners
        sizes.off("switchdevice", onSwitchDevice);
        window.removeEventListener("wheel", scrollOnceEvent);
        window.removeEventListener("touchstart", touchStart);
        window.removeEventListener("touchmove", touchMove);
      };
    }, []);
  
    const setAssets = () => {
      convert(document.querySelector(".intro-text"));
      convert(document.querySelector(".hero-main-title"));
      convert(document.querySelector(".hero-main-description"));
      convert(document.querySelector(".hero-second-subheading"));
      convert(document.querySelector(".second-sub"));
  
      const room = experience.world.room.actualRoom;
      const roomChildren = experience.world.room.roomChildren;
      console.log(roomChildren);
    };
  
    const playIntro = async () => {
      experience.scaleFlag = true;
      await experience.firstIntro();
      experience.moveFlag = true;
      experience.scrollOnceEvent = experience.onScroll.bind(experience);
      experience.touchStart = experience.onTouch.bind(experience);
      experience.touchMove = experience.onTouchMove.bind(experience);
      window.addEventListener("wheel", experience.scrollOnceEvent);
      window.addEventListener("touchstart", experience.touchStart);
      window.addEventListener("touchmove", experience.touchMove);
    };
  
    return (
      <div>
        {device && <p>Device: {device}</p>}
        <p>Loading...</p>
      </div>
    );
  }
  

export default Preloader;
