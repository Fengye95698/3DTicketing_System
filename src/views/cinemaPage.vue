<template>
  <div>
    <div id="loading">
      <div class="ring" @click="showMainpage(isDone)">
        <div v-show="!isDone">Loading <br /></div>
        <div v-show="isDone" style="color: white; cursor: pointer">enter</div>
        <span class="span"></span>
        <div style="color: white">{{ progress }}</div>
      </div>
    </div>
    <div id="container">
      <div class="cart_box" ref="cart">
        <div class="title">
          选择此座位
          <span style="font-size: 25px; margin-left: 10px">{{
            chair.name
          }}</span>
        </div>
        <div class="price">价格：￥{{ chair.price }}</div>
        <div class="btn">
          <div class="addCart" @click="toAdd">加入购物车</div>
          <!-- <div class="cancel" @click="cancelEvent">取消</div> -->
        </div>
      </div>
      <div class="chair_area" ref="seat_area">
        <div class="seat_title">点击体验此座位</div>
        <div class="seat_num">座位&nbsp;{{ chair.name }}</div>
        <div class="seat_price">价格:￥{{ chair.price }}</div>
      </div>
      <div class="title_tips">
        Selecting Seats For
        <strong style="color: white">You On A Fantastic Day</strong>
      </div>
      <div class="tips">
        <p>
          Click on white seats to sit and listen to the performance from that
          place. <br /><br />
          Use your headphones to better experience the 3D positional audio
          feature.
        </p>
      </div>
      <!-- <div class="cart" @click="cancelEvent">Your Cart</div> -->
      <div class="btn_music" @click="onMusic">
        <img src="/resources/icon.jpg" alt="" />
      </div>
      <audio src="/resources/music.mp3" autoplay ref="bgMusic" loop></audio>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import {
  initBaseScene,
  initBaseRenderer,
  initBaseControls,
  initBaseCamera,
  initGui,
} from "@/utils/baseElement";
import { initLight, initEXR } from "@/utils/enviromentInit";
import { initScene, initCinema } from "@/utils/modelList";
import { choosePrice, renderPrice } from "@/utils/pagePart";
import Gsap from "gsap";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      mixer: null,
      carMixer: null,
      clock: new THREE.Clock(),
      isShowBuy: false,
      isDone: false,
      chair: {
        name: "",
        price: 0,
      },
      progress: 0,
      isShowTip: false,
    };
  },
  mounted() {
    this.container = document.querySelector("#container");
    this.initThree();
    this.initSceneElement();
    this.initEnviroment();
    this.animate();
    // document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    // document.addEventListener("mousedown", this.dbClick, false);
  },
  methods: {
    initThree() {
      // Camera
      initBaseCamera(this);
      // Scene
      initBaseScene(this);
      // Renderer
      initBaseRenderer(this);
      //   controls
      initBaseControls(this);
    },
    initEnviroment() {
      // initLight(this);
      const PointLight = new THREE.PointLight(0xffffff, 1);
      // this.scene.add(PointLight);
      // 环境光
      this.ambient = new THREE.AmbientLightProbe(0x4b0082, 0.5);
      // this.ambient = new THREE.AmbientLightProbe(0xffffff, 2);
      this.scene.add(this.ambient);
      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      this.scene.add(ambientLight);
      const spotlight = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI / 4, 1);
      spotlight.position.set(10, 30, 20);
      spotlight.target.position.set(0, 0, 0);
      spotlight.castShadow = true;
      spotlight.shadow.camera.near = 10;
      spotlight.shadow.camera.far = 100;
      spotlight.shadow.camera.fov = 30;
      // spotlight.shadow.bias = -0.0001
      spotlight.shadow.mapSize.width = 2048;
      spotlight.shadow.mapSize.height = 2048;
      this.scene.add(spotlight);
      initEXR(this);
    },
    initSceneElement() {
      initCinema(this);
    },
    onMusic() {
      const audio = this.$refs.bgMusic;
      if (audio.paused) {
        //获得播放状态,这个属性应该是是否是暂停状态,如果是就播放,如果不是暂停就暂停
        audio.play();
      } else {
        audio.pause();
      }
    },
    showMainpage(isDone) {
      if (isDone) {
        document.getElementById("loading").style.display = "none";
        this.$refs.bgMusic.play();
        Gsap.to(this.camera.position, {
          x: 10,
          y: 10,
          z: 10,
          duration: 4,
        });
      }
    },
    toAdd() {
      Swal.fire("Good job!", "成功加入购物车啦!", "success").then((res) => {
        if (res.isConfirmed) {
          this.cancelEvent();
        }
      });
    },
    animate() {
      const delta = this.clock.getDelta();
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/pianoScene.css";
</style>
