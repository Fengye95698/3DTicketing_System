<template>
  <div>
    <div class="video-main">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="cursor: pointer">
          Video<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/resources/wall.mp4"
            >Water</el-dropdown-item
          >
          <el-dropdown-item command="/resources/yanhua.mp4"
            >Firework</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in mediaListOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @blur="changeVideo(e)"
        >
        </el-option>
      </el-select> -->
      <!-- <el-button
        v-if="currentMedia && currentMedia.isPlay"
        type="text"
        @click="stopPlay(currentMedia)"
        class="dialog_btn"
        >停止播放</el-button
      >
      <el-button
        v-else
        type="text"
        @click="startPlay(currentMedia)"
        class="dialog_btn"
        :disabled="this.value === ''"
        >设置播放</el-button
      > -->
    </div>
    <div class="video">
      <video
        id="video"
        width="100%"
        height="600px"
        controls
        autoplay
        src="/resources/wall.mp4"
      ></video>
    </div>
  </div>
</template>

<script>
// import { reqMediaList, reqChangePlayStatus } from "@/requestApi/backstagePage";
export default {
  data() {
    return {
      mediaListOptions: [
        {
          label: "Firework",
          value: "/resources/yanhua.mp4",
        },
        {
          label: "water",
          value: "/resources/wall.mp4",
        },
      ],
      value: "/resources/wall.mp4",
    };
  },
  mounted() {
    // this.getMediaList();
  },

  methods: {
    handleCommand(value) {
      console.log(value);
      // this.value = value;
      let video = document.querySelector("#video");
      video.src = value;
    },
    // getMediaList() {
    //   reqMediaList()
    //     .then((res) => {
    //       let mediaList = res.data.data.mediaList.map((item) => {
    //         if (!item.is_mp3) {
    //           return {
    //             value: item.id,
    //             label: item.media_name,
    //             isPlay: item.is_play,
    //           };
    //         } else {
    //           return [];
    //         }
    //       });
    //       this.mediaListOptions = [...mediaList];
    //       this.value = this.value =
    //         this.mediaListOptions.length > 0
    //           ? this.mediaListOptions[0].label
    //           : "";
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // startPlay(item) {
    //   let options = {
    //     media_name: item.label,
    //     is_play: true,
    //     is_mp3: false,
    //   };
    //   reqChangePlayStatus(options)
    //     .then((res) => {
    //       console.log(res);
    //       this.$message("开始播放");
    //       this.getMediaList();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // stopPlay(item) {
    //   let options = {
    //     media_name: item.label,
    //     is_play: false,
    //     is_mp3: false,
    //   };
    //   reqChangePlayStatus(options)
    //     .then((res) => {
    //       console.log(res);
    //       this.$message("停止播放");
    //       this.getMediaList();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.video-main {
  display: flex;
  align-items: center;
}

.video {
  width: 80%;
  height: 600px;
  margin: 0 auto;
  margin-top: 50px;
  background-color: #000;
}

.dialog_btn {
  width: 90px;
  height: 40px;
  display: inline-block;
  color: white;
  font-size: 15px;
  background-color: rgb(80, 99, 160);
  text-align: center;
  margin-left: 40px;
}

.dialog_btn:disabled {
  background-color: rgb(80, 99, 160);
}

.el-select {
  width: 100%;
}
</style>
