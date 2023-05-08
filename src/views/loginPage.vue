<template>
  <div class="main_page" ref="main">
    <div class="login_box" ref="loginBox">
      <div class="title_box">
        <div class="title">Account Login</div>
        <div class="register_box" @click="showTips">?</div>
      </div>
      <div class="line"></div>
      <div class="ipt_box">
        <input type="text" placeholder="Account" v-model="username" />
      </div>
      <div class="pas_box">
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <div class="btn" @click="toCity">Login</div>
      <div class="register_btn" @click="toRegister">To Register</div>
    </div>
    <div class="register_part" ref="registerBox">
      <div class="title_box">
        <div class="title">Account Registration</div>
        <div class="register_box">?</div>
      </div>
      <div class="line"></div>
      <div class="ipt_box">
        <input
          type="text"
          placeholder="Please enter the account number.
"
          v-model="regUsername"
        />
      </div>
      <div class="pas_box">
        <input
          type="password"
          placeholder="Please enter the account password."
          v-model="regPassword"
        />
      </div>
      <div class="ensure_box">
        <input
          type="password"
          placeholder="Please enter the account password"
          v-model="ensurePassword"
        />
      </div>
      <div class="btn" @click="registerUserMed">
        Confirmation of registration
      </div>
      <div class="clear_btn" @click="toLogin">Return to landing</div>
    </div>
  </div>
</template>

<script>
// import { userInfo, registerUser, getSceneInfo } from "@/requestApi/mainPage";
import { userLogin, userRegister } from "@/requestApi/UserModule";
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
      this.userInfoMed();
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
        name: this.username,
        password: this.password,
      };
      // this.$router.replace({
      //   path: "/select",
      // });
      userLogin(options).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          const id = res.data.data.id;
          const name = res.data.data.name;
          const status = res.data.data.role;
          alert("Login successfully!");
          localStorage.setItem("username", name);
          localStorage.setItem("role", status);
          localStorage.setItem("userId", id);
          if (status == "admin") {
            this.$router.replace({
              path: "/backstageManage/userlist",
            });
          } else {
            this.$router.replace({
              path: "/select",
            });
          }
        } else {
          alert(
            "Login failed, please enter the correct account password, if no account please go to register ~~"
          );
        }
      });
    },
    registerUserMed() {
      if (
        this.regUsername &&
        this.regPassword === this.ensurePassword &&
        this.regPassword &&
        this.ensurePassword
      ) {
        let options = {
          name: this.regUsername,
          password1: this.ensurePassword,
          password2: this.regPassword,
        };
        userRegister(options).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            alert("registered successfully");
            this.toLogin();
          }
        });
      } else {
        alert(
          "The entered user name and password cannot be empty and must be the same"
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/loginPage.scss";
</style>
