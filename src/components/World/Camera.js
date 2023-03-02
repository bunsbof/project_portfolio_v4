import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Camera = () => {
  const experience = new Experience();
  const sizes = experience.sizes;
  const scene = experience.scene;
  const canvas = experience.canvas;

  const createPerspectiveCamera = () => {
    const perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      sizes.aspect,
      0.1,
      1000
    );
    scene.add(perspectiveCamera);
    perspectiveCamera.position.x = 29;
    perspectiveCamera.position.y = 14;
    perspectiveCamera.position.z = 12;
    return perspectiveCamera;
  };

  const createOrthographicCamera = () => {
    const orthographicCamera = new THREE.OrthographicCamera(
      (-sizes.aspect * sizes.frustrum) / 2,
      (sizes.aspect * sizes.frustrum) / 2,
      sizes.frustrum / 2,
      -sizes.frustrum / 2,
      -50,
      50
    );
    orthographicCamera.position.y = 5.65;
    orthographicCamera.position.z = 10;
    orthographicCamera.rotation.x = -Math.PI / 6;

    scene.add(orthographicCamera);
    return orthographicCamera;
  };

  const setOrbitControls = (perspectiveCamera) => {
    const controls = new OrbitControls(perspectiveCamera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    return controls;
  };

  const perspectiveCamera = createPerspectiveCamera();
  const orthographicCamera = createOrthographicCamera();
  const controls = setOrbitControls(perspectiveCamera);

  const resize = () => {
    // Updating Perspective Camera on Resize
    perspectiveCamera.aspect = sizes.aspect;
    perspectiveCamera.updateProjectionMatrix();
    // Updating Orthographic Camera on Resize
    orthographicCamera.left = (-sizes.aspect * sizes.frustrum) / 2;
    orthographicCamera.right = (sizes.aspect * sizes.frustrum) / 2;
    orthographicCamera.top = sizes.frustrum / 2;
    orthographicCamera.bottom = -sizes.frustrum / 2;
    orthographicCamera.updateProjectionMatrix();
  };

  const update = () => {
    controls.update();
  };

  return {
    perspectiveCamera,
    orthographicCamera,
    resize,
    update,
  };
};

export default Camera;
