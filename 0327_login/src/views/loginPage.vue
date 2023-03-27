<template>
  <div class="main_page" ref="main">
    <div class="login_box" ref="loginBox">
      <div class="title_box">
        <div class="title">账号登录</div>
        <div class="register_box" @click="showTips">?</div>
      </div>
      <div class="line"></div>
      <div class="ipt_box">
        <input type="text" placeholder="账号" v-model="username" />
      </div>
      <div class="pas_box">
        <input type="password" placeholder="密码" v-model="password" />
      </div>
      <div class="btn" @click="toCity">登录</div>
      <div class="register_btn" @click="toRegister">前往注册</div>
    </div>
    <div class="register_part" ref="registerBox">
      <div class="title_box">
        <div class="title">账号注册</div>
        <div class="register_box">?</div>
      </div>
      <div class="line"></div>
      <div class="ipt_box">
        <input type="text" placeholder="请输入账号" v-model="regUsername" />
      </div>
      <div class="pas_box">
        <input type="password" placeholder="请输入密码" v-model="regPassword" />
      </div>
      <div class="ensure_box">
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="ensurePassword"
        />
      </div>
      <div class="btn" @click="registerUserMed">确定注册</div>
      <div class="clear_btn" @click="toLogin">返回登陆</div>
    </div>
  </div>
</template>

<script>
// import { userInfo, registerUser, getSceneInfo } from "@/requestApi/mainPage";
export default {
  name: "MainPage",
  data() {
    return {
      bgImglist: {
        bgImg1: require("../assets/img/bg.png"),
        bgImg2: require("../assets/img/bg2.png"),
      },
      username: "",
      password: "",
      regUsername: "",
      regPassword: "",
      ensurePassword: "",
    };
  },
  components: {},
  mounted() {
    // this.$i18n.locale = "zh-Tibetan";
    // localStorage.setItem("languageSet", this.$i18n.locale);
    // this.getSceneInfoMed();
  },
  methods: {
    // getSceneInfoMed() {
    //   getSceneInfo().then((res) => {
    //     console.log(res);
    //   });
    // },
    toCity() {
      this.$router.replace("/select");
      // this.userInfoMed();
      // this.$router.push("/apartmentArea");
    },
    toRegister() {
      this.$refs.registerBox.style.cssText =
        "opacity:1;transition:4s;z-index:1;";
      this.$refs.loginBox.style.cssText =
        "opacity:0;transition:4s;z-index:0;transform:translateX(-180px)";
      this.$refs.main.style.cssText =
        "background:url(" +
        this.bgImglist.bgImg2 +
        ")no-repeat center center;transition:3s;background-size: 100% 100%;";
    },
    showTips() {
      alert("没有账号？快去注册一个吧！");
    },
    toLogin() {
      this.$refs.registerBox.style.cssText =
        "opacity:0;transition:4s;z-index:0";
      this.$refs.loginBox.style.cssText =
        "opacity:1;transition:4s;z-index:1;transform:translateX(0px)";
      this.$refs.main.style.cssText =
        "background:url(" +
        this.bgImglist.bgImg1 +
        ")no-repeat center center;transition:3s;background-size: 100% 100%;";
      this.regUsername = "";
      this.regPassword = "";
      this.ensurePassword = "";
    },
    userInfoMed() {
      let options = {
        username: this.username,
        password: this.password,
      };
      this.$router.replace({
        path: "/select",
      });
      //   userInfo(options).then((res) => {
      //     if (res.data.errorno === 0) {
      //       const name = res.data.userinfo[0].username;
      //       const status = res.data.userinfo[0].type;
      //       alert("登录成功");
      //       localStorage.setItem("username", name);
      //       localStorage.setItem("status", status);
      //       this.$router.replace({
      //         path: "/apartmentArea",
      //       });
      //     } else {
      //       alert("登录失败，请输入正确的账号密码，若没有账号请前往注册~~");
      //     }
      //   });
    },
    registerUserMed() {
      if (
        this.regUsername &&
        this.regPassword === this.ensurePassword &&
        this.regPassword &&
        this.ensurePassword
      ) {
        let options = {
          username: this.regUsername,
          password: this.ensurePassword,
        };
        // registerUser(options).then((res) => {
        //   if (res.data.errorno === 0) {
        //     alert("注册成功");
        //     this.toLogin();
        //   }
        // });
      } else {
        alert("输入用户名密码不能为空且确保两次输入的密码一致");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/loginPage.scss";
</style>
