import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/mainpage",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/pianoScene.vue");
    },
  },
  {
    path: "/",
    name: "loginPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/loginPage.vue");
    },
  },
  {
    path: "/select",
    name: "select",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/selectPage.vue");
    },
  },
  {
    path: "/choosePlayPage",
    name: "choosePlayPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(
        /* webpackChunkName: "about" */ "../views/choosePlayPage.vue"
      );
    },
  },
  {
    path: "/cinema",
    name: "cinema",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/cinemaPage.vue");
    },
  },
  {
    path: "/music",
    name: "music",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/pianoScene.vue");
    },
  },
  {
    path: "/backstageManage",
    name: "backstageManage",
    component: () => import("../views/backstageManage.vue"),
    children: [
      {
        path: "userlist",
        component: () => import("../components/Backstage/UserList.vue"),
      },
      {
        path: "seatlist",
        component: () => import("../components/Backstage/SeatList.vue"),
      },
      {
        path: "etclist",
        component: () => import("../components/Backstage/EtcList.vue"),
      },
      {
        path: "orderlist",
        component: () => import("../components/Backstage/OrderList.vue"),
      },
      {
        path: "videomanage",
        component: () => import("../components/Backstage/VideoManage.vue"),
      },
      {
        path: "audiomanage",
        component: () => import("../components/Backstage/AudioManage.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
