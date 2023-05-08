<template>
  <div>
    <div class="media-main">
      <div style="width: 100px">
        <span> 音乐名称： </span>
      </div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in mediaListOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
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
      >
    </div>
    <div class="media">
      <audio controls autoplay src="resources/music.mp3"></audio>
    </div>
  </div>
</template>

<script>
// import { reqMediaList, reqChangePlayStatus } from '@/requestApi/backstagePage'
export default {
  data() {
    return {
      mediaListOptions: [],
      value: "",
    };
  },
  mounted() {
    this.getMediaList();
  },
  computed: {
    currentMedia() {
      let temp = this.mediaListOptions.filter(
        (media) => this.value === media.label
      );
      return temp[0] || {};
    },
  },
  methods: {
    getMediaList() {
      //   reqMediaList().then(res => {
      //     let mediaList = res.data.data.mediaList.map(item => {
      //       if (item.is_mp3) {
      //         return {
      //           value: item.id,
      //           label: item.media_name,
      //           isPlay: item.is_play
      //         }
      //       } else {
      //         return []
      //       }
      //     })
      //     this.mediaListOptions = [...mediaList]
      //     this.value = this.value = this.mediaListOptions.length > 0 ? this.mediaListOptions[0].label : ''
      //   }).catch(err => {
      //     console.log(err)
      //   })
    },
    startPlay(item) {
      let options = {
        media_name: item.label,
        is_play: true,
        is_mp3: true,
      };
      //   reqChangePlayStatus(options).then(res => {
      //     console.log(res)
      //     this.$message('开始播放')
      //     this.getMediaList();

      //   }).catch(err => {
      //     console.log(err)
      //   })
    },
    stopPlay(item) {
      let options = {
        media_name: item.label,
        is_play: false,
        is_mp3: true,
      };
      //   reqChangePlayStatus(options).then(res => {
      //     console.log(res)
      //     this.$message('停止播放')
      //     this.getMediaList();
      //   }).catch(err => {
      //     console.log(err)
      //   })
    },
  },
};
</script>

<style lang="scss" scoped>
.media-main {
  display: flex;
  align-items: center;
}

.media {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;

  audio {
    width: 100%;
  }
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
