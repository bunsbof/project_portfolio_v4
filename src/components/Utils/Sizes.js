import { useState, useEffect } from "react";
import { EventEmitter } from "events";

export default function Sizes() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [aspect, setAspect] = useState(width / height);
  const [pixelRatio, setPixelRatio] = useState(
    Math.min(window.devicePixelRatio, 2)
  );
  const [frustrum, setFrustrum] = useState(5);
  const [device, setDevice] = useState(
    width < 968 ? "mobile" : "desktop"
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setAspect(width / height);
      setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (width < 968 && device !== "mobile") {
        setDevice("mobile");
      } else if (width >= 968 && device !== "desktop") {
        setDevice("desktop");
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device, height, width]);

  return {
    width,
    height,
    aspect,
    pixelRatio,
    frustrum,
    device,
  };
}
