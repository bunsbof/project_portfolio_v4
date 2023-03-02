import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useEffect, useState } from 'react';

function Resources({ assets }) {
  const [items, setItems] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [queue, setQueue] = useState(assets.length);

  const experience = new Experience();
  const renderer = experience.renderer;

  useEffect(() => {
    const loaders = {};

    loaders.gltfLoader = new GLTFLoader();
    loaders.dracoLoader = new DRACOLoader();
    loaders.dracoLoader.setDecoderPath('/draco/');
    loaders.gltfLoader.setDRACOLoader(loaders.dracoLoader);

    let loadedCount = 0;

    function singleAssetLoaded(asset, file) {
      setItems(prevItems => ({ ...prevItems, [asset.name]: file }));
      loadedCount++;

      if (loadedCount === queue) {
        emitReady();
      }
    }

    function emitReady() {
      const event = new CustomEvent('ready');
      window.dispatchEvent(event);
    }

    function startLoading() {
      for (const asset of assets) {
        if (asset.type === 'glbModel') {
          loaders.gltfLoader.load(asset.path, file => {
            singleAssetLoaded(asset, file);
          });
        } else if (asset.type === 'videoTexture') {
          const video = document.createElement('video');
          video.src = asset.path;
          video.muted = true;
          video.playsInline = true;
          video.autoplay = true;
          video.loop = true;
          video.play();

          const videoTexture = new THREE.VideoTexture(video);
          videoTexture.minFilter = THREE.NearestFilter;
          videoTexture.magFilter = THREE.NearestFilter;
          videoTexture.generateMipmaps = false;
          videoTexture.encoding = THREE.sRGBEncoding;

          singleAssetLoaded(asset, videoTexture);
        }
      }
    }

    startLoading();
  }, []);

  return null;
}
