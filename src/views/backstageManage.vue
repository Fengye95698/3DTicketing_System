<template>
  <el-container style="height: 100%" class="manage">
    <el-aside width="180">
      <el-menu
        background-color="rgb(0,21,41)"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%"
        default-active="1_1"
        :router="true"
        @select="handleSelect"
      >
        <div class="user_box">
          <div class="username">System management</div>
          <div></div>
        </div>
        <el-submenu :index="item.id" v-for="item in menuList" :key="item.index">
          <template slot="title"
            ><i :class="item.icon"></i>{{ item.title }}</template
          >
          <el-menu-item
            :index="ele.index"
            v-for="ele in item.childrenlist"
            :key="ele.index"
            :route="ele.route"
          >
            <i :class="ele.inner_icon"></i>{{ ele.text }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>Home Page</el-breadcrumb-item>
          <el-breadcrumb-item>{{ manage_name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ list_name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <i
          class="el-icon-setting"
          style="font-size: 17px; position: absolute; right: 74px; top: 22px"
        ></i>
        <span
          style="font-size: 17px"
          class="usertext"
          @click="$router.push('/apartmentArea')"
          >{{ username }}</span
        >
      </el-header>

      <el-main>
        <router-view></router-view>
        <!-- {{ $t("language.language") }} -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      manage_name: "User Management",
      list_name: "User List",
      menuList: [
        {
          id: "1",
          title: "User Management",
          icon: "el-icon-s-custom",
          childrenlist: [
            {
              index: "1_1",
              route: "/backstageManage/userlist",
              text: "User List",
              inner_icon: "el-icon-menu",
            },
          ],
        },
        {
          id: "2",
          title: "Seat Management",
          icon: "el-icon-s-order",
          childrenlist: [
            {
              index: "2_1",
              route: "/backstageManage/seatlist",
              text: "Seat List",
              inner_icon: "el-icon-menu",
            },
          ],
        },
        {
          id: "3",
          title: "Etc Management",
          icon: "el-icon-s-order",
          childrenlist: [
            {
              index: "3_1",
              route: "/backstageManage/etclist",
              text: "Etc List",
              inner_icon: "el-icon-menu",
            },
          ],
        },

        {
          id: "4",
          title: "Order Management",
          icon: "el-icon-s-order",
          childrenlist: [
            {
              index: "4_1",
              route: "/backstageManage/orderlist",
              text: "Order List",
              inner_icon: "el-icon-menu",
            },
          ],
        },
        {
          id: "5",
          title: "Content Management",
          icon: "el-icon-s-order",
          childrenlist: [
            {
              index: "5_1",
              route: "/backstageManage/videomanage",
              text: "Video Management",
              inner_icon: "el-icon-menu",
            },
            // {
            //   index: "5_2",
            //   route: "/backstageManage/audiomanage",
            //   text: "Music Management",
            //   inner_icon: "el-icon-menu",
            // },
          ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleSelect(index) {
      this.menu_idx = index.substring(0, 1);
      this.menuList.forEach((res) => {
        if (res.id == this.menu_idx) {
          this.manage_name = res.title;
          res.childrenlist.forEach((ele) => {
            if (index == ele.index) {
              this.list_name = ele.text;
            }
          });
        }
      });
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("languageSet", this.$i18n.locale);
    },
  },
};
</script>

<style lang="scss">
.manage {
  .el-header {
    background-color: rgb(0, 21, 41);
    color: rgb(255, 255, 255);
    line-height: 60px;
    height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .el-aside {
    color: rgb(255, 255, 255);
  }
  .user_box .username:hover {
    color: #ffbbaa;
  }
  .user_box .username {
    color: rgb(226, 226, 226);
    padding: 20px;
    font-size: 25px;
    cursor: pointer;
  }
  .breadcrumb {
    line-height: 60px;
    .el-breadcrumb__inner.is-link {
      color: white;
    }
    .el-breadcrumb__inner {
      color: white;
    }
  }
  .usertext:hover {
    color: #ffbbaa;
    cursor: pointer;
  }
  .lang_change {
    display: flex;
    position: absolute;
    right: 100px;
    div {
      padding-right: 10px;
      font-size: 20px;
      cursor: pointer;
    }
    div:hover {
      color: #ffbbaa;
    }
  }
}
</style>
