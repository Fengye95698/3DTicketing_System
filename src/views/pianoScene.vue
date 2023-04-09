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
      <div class="cart_box" ref="cart" v-if="!isAdmin">
        <div class="title">
          选择此座位
          <span style="font-size: 25px; margin-left: 10px">{{
            chair.name
          }}</span>
        </div>
        <div class="price">价格：￥{{ chair.price }}</div>
        <div class="btn">
          <div class="addCart" @click="toAdd">加入购物车</div>
          <div class="cancel" @click="cancelEvent">取消</div>
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
      <div class="cart" @click="cancelEvent" v-if="!isAdmin">Your Cart</div>
      <div class="cart" v-if="isAdmin">Management</div>
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
import { initScene } from "@/utils/modelList";
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
      isAdmin: false,
      chair: {
        name: "",
        price: 0,
      },
      progress: 0,
      isShowTip: false,
      chairList: [
        {
          name: "A08",
          price: "388",
        },
        {
          name: "O25",
          price: "168",
        },
        {
          name: "AA018",
          price: "388",
        },
        {
          name: "AA25",
          price: "358",
        },
        {
          name: "A08",
          price: "388",
        },
        {
          name: "N22",
          price: "288",
        },
        {
          name: "F32",
          price: "258",
        },
        {
          name: "V03",
          price: "88",
        },
        {
          name: "V08",
          price: "88",
        },
      ],
    };
  },
  mounted() {
    this.container = document.querySelector("#container");
    this.initThree();
    this.initSceneElement();
    this.initEnviroment();
    this.animate();
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    document.addEventListener("mousedown", this.dbClick, false);
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
      initLight(this);
      initEXR(this);
    },
    initSceneElement() {
      initScene(this);
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
    cancelEvent() {
      Gsap.to(this.camera.position, {
        y: this.camera.position.y + 6,
        duration: 2,
      });
      this.$refs.cart.style.cssText = `opacity:0;transition: 2s;`;
    },
    dbClick() {
      const object_name = this.intersectsDB[0].object.name;
      if (object_name.startsWith("chair")) {
        this.chair.name = object_name.split("_")[1];
        choosePrice(this, this.chair.name);
        const { x, y, z } = this.intersectsDB[0].object.position;
        Gsap.to(this.camera.position, {
          x,
          y: y + 1,
          z: z - 0.2,
          duration: 2,
        });
        Gsap.to(this.controls.target, {
          x: 0,
          y: 0,
          z: -8,
          duration: 2,
        });
        this.$refs.cart.style.cssText = ` opacity:1;transition: 2s;`;
        this.$refs.seat_area.style.cssText = ` opacity:0;transition: 0.5s;`;
        // this.isShowBuy = true;
        document.body.style.cursor = "pointer";
      }
    },
    onDocumentMouseMove(e) {
      const rayCaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      e.preventDefault();
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      rayCaster.setFromCamera(mouse, this.camera);
      let intersects = rayCaster.intersectObjects(this.scene.children);
      this.intersectsDB = intersects;
      if (intersects.length > 0) {
        const object_name = intersects[0].object.name;
        if (object_name.startsWith("chair")) {
          document.body.style.cursor = "pointer";
          renderPrice(this, object_name.split("_")[1]);
          this.$refs.seat_area.style.cssText = ` opacity:1;transition: 2s;`;
        } else {
          document.body.style.cursor = "";
          this.$refs.seat_area.style.cssText = ` opacity:0;transition: 0.5s;`;
        }
      }
    },
    animate() {
      const delta = this.clock.getDelta();
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
  beforeDestroy() {
    this.scene.traverse((obj) => {
      if (obj.type === "Mesh") {
        obj.geometry.dispose();
        obj.material.dispose();
      }
    });
  },
};
</script>

<style scoped>
@import "@/assets/css/pianoScene.css";
</style>
