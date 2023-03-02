import { useEffect, useRef } from "react";
import { EventEmitter } from "events";

export default function Time() {
  const start = useRef(Date.now());
  const current = useRef(start.current);
  const elapsed = useRef(0);
  const delta = useRef(16);
  const timer = useRef();

  useEffect(() => {
    const update = () => {
      const currentTime = Date.now();
      delta.current = currentTime - current.current;
      current.current = currentTime;
      elapsed.current = current.current - start.current;

      // Emit the update event
      emitter.emit("update");

      // Request the next animation frame
      timer.current = window.requestAnimationFrame(update);
    };

    // Start the update loop
    update();

    return () => {
      // Stop the update loop when the component unmounts
      window.cancelAnimationFrame(timer.current);
    };
  }, []);

  // Create an EventEmitter instance to emit events
  const emitter = new EventEmitter();

  // Expose the elapsed time and delta to the component's render tree
  return { elapsed: elapsed.current, delta: delta.current, emitter };
}
