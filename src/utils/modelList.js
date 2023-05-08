import * as THREE from "three";
import Gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function initLoading(_this) {
  const manager = new THREE.LoadingManager();
  manager.onLoad = () => {
    console.log("Loading complete!");
    _this.isDone = true;
  };

  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    _this.progress = (itemsLoaded / itemsTotal).toFixed(3) * 100 + "%";
  };

  manager.onError = (url) => {
    console.log("There was an error loading " + url);
  };
  return manager;
}
function initVideo() {
  const videoLabel = document.createElement("video");
  videoLabel.autoplay = true;
  videoLabel.muted = true;
  videoLabel.controls = true;
  videoLabel.loop = true;
  videoLabel.src = "resources/wall.mp4";
  videoLabel.play();
  const videoTexture = new THREE.VideoTexture(videoLabel);
  const videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
  });
  return videoMaterial;
}
// 加载场景
export const initScene = (_this) => {
  //   加载场景
  let dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/gltf/");
  dracoLoader.setDecoderConfig({ type: "js" });
  let gltfLoader = new GLTFLoader(initLoading(_this));
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.load("/resources/models/scene4.glb", (gltf) => {
    // gltf.scene.scale.set(5, 5, 8);
    _this.scene.add(gltf.scene);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.startsWith("screen")) {
          child.material = initVideo();
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });
};
// 加载电影院
export const initCinema = (_this) => {
  //   加载场景
  let gltfLoader = new GLTFLoader(initLoading(_this));
  gltfLoader.load("/resources/models/cinema_of_boredom/scene.gltf", (gltf) => {
    // gltf.scene.scale.set(5, 5, 8);
    _this.scene.add(gltf.scene);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child.name);
        // if (child.name.startsWith("screen")) {
        //   child.material = initVideo();
        // }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });
};
