<template>
  <div>
    <div id="loading">
      <div class="ring" @click.stop="showMainpage(isDone)">
        <div v-show="!isDone">Loading <br /></div>
        <div v-show="isDone" style="color: white; cursor: pointer">enter</div>
        <span class="span"></span>
        <div style="color: white">{{ progress }}</div>
      </div>
    </div>
    <div id="container">
      <div class="cart_box" ref="cart" v-if="!isAdmin">
        <div class="title">
          Select the seat
          <span style="font-size: 25px; margin-left: 10px">{{
            chair.name
          }}</span>
        </div>
        <div class="price">Price：￥{{ chair.price }}</div>
        <div class="btn">
          <div class="addCart" @click="toAdd">Add Cart</div>
          <div class="cancel" @click="cancelEvent">Cancel</div>
        </div>
      </div>
      <div class="chair_area" ref="seat_area">
        <div class="seat_title">Experience this seat</div>
        <div class="seat_num">Seat&nbsp;{{ chair.name }}</div>
        <div class="seat_price">Price:￥{{ chair.price }}</div>
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
      <!-- @click="cancelEvent" -->
      <div class="cart" v-if="!isAdmin">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            Your Cart<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div class="select-all">
              <input
                class="chooseAll"
                type="checkbox"
                :checked="isAllCheck && cartList.length > 0"
                @change="updateAllCartChecked"
              />
              <span>All</span>
            </div>
            <div v-for="item in cartList" :key="item.id" class="cart-container">
              <input
                type="checkbox"
                :id="item.id"
                name="chk_list"
                :checked="isAllCheck"
                @change="updateChecked(item, $event)"
              />
              <label :for="item.id">
                <div class="cart-item">
                  <div class="cart-item-etc">
                    Etc：{{ item.etc_name
                    }}<el-button
                      type="text"
                      class="delete-cart"
                      @click="deleteCartItem(item)"
                      >Delete</el-button
                    >
                  </div>
                  <!-- @click="deleteCart(item)" -->

                  <div class="cart-item-content">
                    <div class="text">
                      Seat Name：<span>{{ item.seat_name }}</span>
                    </div>
                    <div class="text">
                      Seat Price￥：<span>{{ item.price }}</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div class="cart-footer">
              <!-- <el-button
                type="text"
                class="delete-all-cart"
                @click="deleteAllCart"
                >删除选中</el-button
              > -->
              <div class="cart-total">Total Price￥：{{ totalPrice }}</div>
              <!-- @click="settlement"  -->
              <el-button type="text" class="cart_btn" @click="generateOrderMed"
                >Pay</el-button
              >
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        class="cart"
        v-if="isAdmin"
        @click="$router.push('/backstageManage/userlist')"
      >
        Management
      </div>
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
import { getSeatInfo } from "@/requestApi/seatModule";
import { initLight, initEXR, initRGB } from "@/utils/enviromentInit";
import { initScene } from "@/utils/modelList";
import { choosePrice, renderPrice } from "@/utils/pagePart";
import {
  addCartInfo,
  getUserCartInfo,
  updateCartSelectedStatus,
  deleteCartInfo,
  cartSelectedAll,
} from "@/requestApi/CartModule";
import { generateOrder, orderPay } from "@/requestApi/OrderModule";
import Gsap from "gsap";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      cartList: [],
      mixer: null,
      carMixer: null,
      clock: new THREE.Clock(),
      isShowBuy: false,
      isDone: false,
      isAdmin: false,
      userId: 0,
      chair: {
        id: 0,
        name: "",
        price: 0,
      },
      progress: 0,
      isShowTip: false,
      totalPrice: 0,
      isAllCheck: false,
      isSelected: false,
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
    this.isAdmin = localStorage.getItem("role") == "admin" ? true : false;
    console.log(this.cartList);
    this.userId = localStorage.getItem("userId");
    this.initThree();
    this.initSceneElement();
    this.initEnviroment();
    this.getSeatInfoMed();
    this.getUserCartInfoMed();
    this.animate();
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    document.addEventListener("mousedown", this.dbClick, false);
    window.addEventListener("resize", this.onWindowResize);
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
      initRGB(this);
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

    dbClick() {
      const object_name = this.intersectsDB[0].object.name;
      // console.log(object_name);
      if (object_name.startsWith("chair")) {
        this.chair.name = object_name.split("_")[1];
        // choosePrice(this, this.chair.name);
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
    toAdd() {
      console.log(this.chair);
      Swal.fire(
        "Good job!",
        "Successfully added to shopping cart!",
        "success"
      ).then((res) => {
        if (res.isConfirmed) {
          let options = {
            user_id: parseInt(localStorage.getItem("userId")),
            etc_id: parseInt(this.$route.query.EtcId),
            seat_id: parseInt(this.chair.id),
          };
          addCartInfo(options).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.cartList.push(res.data.data);
              this.getUserCartInfoMed();
            }
          });
          console.log(this.cartList);
          this.cancelEvent();
        }
      });
    },
    deleteCartItem(item) {
      console.log("delete", item);
      let options = {
        seat_id: item.seat_id,
      };
      deleteCartInfo(options, this.userId).then((res) => {
        if (res.data.code == 200) {
          this.getUserCartInfoMed();
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
    generateOrderMed() {
      let seatIdArr = [];
      console.log(this.cartList);
      this.cartList.forEach((child) => {
        seatIdArr.push(child.seat_id);
      });
      let options = {
        user_id: this.userId,
        seat_ids: seatIdArr.join(),
      };
      let orderNum = "";

      generateOrder(options).then((res) => {
        console.log("生成订单", res);
        if (res.data.code == 200) {
          orderNum = res.data.data.order_number;
          let options = {
            order_number: orderNum,
          };
          orderPay(options).then((res) => {
            console.log("支付", res);
            if (res.data.code == 200) {
              let url = res.data.url;
              Swal.fire("Good job!", "On the way to pay!", "success").then(
                (res) => {
                  if (res.isConfirmed) {
                    window.open(url);
                    this.getUserCartInfoMed();
                    this.totalPrice = 0;
                  }
                }
              );
            }
          });
        }
      });
    },
    getUserCartInfoMed() {
      getUserCartInfo(this.userId).then((res) => {
        console.log("cartInfo", res);
        this.cartList = res.data.data.cart;
      });
    },
    updateAllCartChecked() {
      console.log("allcheck");
      this.isAllCheck = !this.isAllCheck;
      let options = this.isAllCheck ? 1 : 0;
      cartSelectedAll(this.userId, options).then((res) => {
        console.log("allchekc", res);
        let cartData = res.data.data.cart;
        cartData.forEach((res) => {
          console.log("=============", res);
          if (res.select_status == 1) {
            this.totalPrice += res.price;
          }
        });
        if (!this.isAllCheck) {
          this.totalPrice = 0;
        }
      });
    },
    updateChecked(item, event) {
      console.log(item);
      this.isSelected = !this.isSelected;
      let options = {
        seat_ids: String(item.seat_id),
        select_statuses: String(item.select_status) == "0" ? "1" : "0",
      };
      updateCartSelectedStatus(options, this.userId).then((res) => {
        console.log(res);
        if (!this.isAllCheck) {
          if (this.isSelected) {
            res.data.data.cart.forEach((res) => {
              // if (res.select_status == 1) {
              this.totalPrice += res.price;
              // }
            });
          } else {
            res.data.data.cart.forEach((res) => {
              // if (res.select_status == 1) {
              this.totalPrice -= res.price;
              if (this.totalPrice < 0) {
                this.totalPrice = 0;
              }
              // }
            });
          }
          // else {
          //   res.data.data.cart.forEach((res) => {
          //     if (res.select_status == 0) {
          //       if (this.totalPrice >= 0) {
          //         this.totalPrice -= res.price;
          //       } else {
          //         this.totalPrice = 0;
          //       }
          //     }
          //   });
          // }
        }
      });
    },
    getSeatInfoMed() {
      let etcid = this.$route.query.EtcId;
      getSeatInfo(etcid).then((res) => {
        this.chairList = res.data.data.seats;
      });
      // this.tableData = this.seatList;
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
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
.back_btn {
  width: 180px;
  height: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  cursor: pointer;
}
.back_btn:hover {
  background-color: black;
  transition: 0.5s;
}
.el-dropdown-link {
  cursor: pointer;
  color: rgb(232, 193, 110);
}

.cart-container {
  display: flex;
  margin-top: 10px;
}

.cart-container:first-child {
  margin-top: 0;
}

.cart-item {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 350px;
  padding: 0 20px;
  cursor: pointer;
}

.cart-item-etc {
  font-size: 16px;
  font-weight: bold;
  width: max-content;
}

.delete-cart {
  position: absolute;
  top: 0;
  right: 20px;
  padding: 0;
}

.cart-item-content {
  display: flex;
  justify-content: space-between;
  width: max-content;
  font-size: 14px;
  font-weight: bold;
}

.cart-item-content .text {
  width: max-content;
  margin-top: 4px;
}

.cart-item-content .text span {
  font-weight: normal;
}

.cart-item-content .text:first-child {
  margin-right: 10px;
}

.cart-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 20px 0;
}

.delete-all-cart {
  padding: 0;
}

.cart-total {
  margin-right: 10px;
  font-weight: bold;
}

.cart_btn {
  display: flex;
  align-items: center;
  width: 90px;
  height: 20px;
  color: white;
  font-size: 15px;
  background-color: rgb(80, 99, 160);
  text-align: center;
}
</style>
