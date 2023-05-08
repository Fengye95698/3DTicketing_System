<template>
  <div class="choosePlayPage">
    <div class="musicShow" v-if="isMusicShow">
      <div class="top_item">
        <div class="left">
          <div class="title">Select show</div>
          <div class="desc">
            Add user to the dashboard so they can manage the content
          </div>
        </div>
        <div
          class="right"
          @click="
            () => {
              $router.go(-1);
            }
          "
        >
          Back
        </div>
      </div>
      <div class="content">
        <div
          class="item_box"
          @click="toWatchScene(item.id)"
          v-for="item in musicContentList"
          :key="item.id"
        >
          <div class="avator">
            <img src="@/assets/img/movie.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">{{ item.name }}</div>
            <div class="tips">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cinemaShow" v-else>
      <div class="top_item">
        <div class="left">
          <div class="title">Select show</div>
          <div class="desc">
            Add user to the dashboard so they can manage the content
          </div>
        </div>
        <div
          class="right"
          @click="
            () => {
              $router.go(-1);
            }
          "
        >
          Back
        </div>
      </div>
      <div class="content">
        <div class="item_box" @click="toWatchScene(2)">
          <div class="avator">
            <img src="@/assets/img/music.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">Sam</div>
            <div class="tips">Add user to the dashboard</div>
          </div>
        </div>
        <div class="item_box">
          <div class="avator">
            <img src="@/assets/img/music.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">Sam</div>
            <div class="tips">Add user to the dashboard</div>
          </div>
        </div>
        <div class="item_box">
          <div class="avator">
            <img src="@/assets/img/music.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">Sam</div>
            <div class="tips">Add user to the dashboard</div>
          </div>
        </div>
        <div class="item_box">
          <div class="avator">
            <img src="@/assets/img/music.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">Sam</div>
            <div class="tips">Add user to the dashboard</div>
          </div>
        </div>
        <div class="item_box">
          <div class="avator">
            <img src="@/assets/img/music.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">Sam</div>
            <div class="tips">Add user to the dashboard</div>
          </div>
        </div>
        <div class="item_box">
          <div class="avator">
            <img src="@/assets/img/music.png" alt="" />
          </div>
          <div class="show_name">
            <div class="nickname">Sam</div>
            <div class="tips">Add user to the dashboard</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEtcInfo } from "@/requestApi/etcModule";
export default {
  data() {
    return {
      isMusicShow: this.$route.query.list == 1 ? true : false,
      musicContentList: [],
    };
  },
  mounted() {
    this.getEtcInfoMed();
  },
  methods: {
    toWatchScene(val) {
      this.$router.push({
        path: "/music",
        query: {
          EtcId: val,
        },
      });
    },
    getEtcInfoMed() {
      getEtcInfo().then((res) => {
        console.log(res);
        this.musicContentList = res.data.data.etcs;
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/choosePlayPage.scss";
</style>
