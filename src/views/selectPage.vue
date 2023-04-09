<template>
  <div class="selectPage">
    <div class="Title">Please Select Your Scene</div>
    <div class="left_box" @click="toChange(1)">
      <div class="title_box">
        <div class="name">BASIC</div>
        <div class="desc">Virtual Scene Music Show Live</div>
      </div>
      <div class="content_box">
        <div class="img_item">
          <img src="@/assets/img/piano.png" alt="" />
        </div>
        <div class="text_desc">
          All the features you would ever needto keep your personal files,
          safe.accessible, and easy to share to anyone
        </div>
      </div>
      <div class="ensure_btn">Select Scene</div>
    </div>
    <div class="left_box" @click="toChange(2)">
      <div class="title_box">
        <div class="name">BASIC</div>
        <div class="desc">Virtual Scene Movie Show Live</div>
      </div>
      <div class="content_box">
        <div class="img_item">
          <img src="@/assets/img/cinema.png" alt="" />
        </div>
        <div class="text_desc">
          All the features you would ever needto keep your personal files,
          safe.accessible, and easy to share to anyone
        </div>
      </div>
      <div class="ensure_btn">Select Scene</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toChange(index) {
      this.$router.push({
        path: "/choosePlayPage",
        query: {
          list: index,
        },
      });
      // window.location.reload();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/selectPage.scss";
</style>
