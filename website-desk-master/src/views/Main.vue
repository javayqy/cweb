<template>
  <div id="main">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-container class="float_right">
        <router-link to="/"
          ><el-menu-item index="1"
            ><span class="el-icon-s-home" />主页</el-menu-item
          ></router-link
        >
        <router-link to="/guide"
          ><el-menu-item index="2"
            ><span class="el-icon-s-management" />文档</el-menu-item
          ></router-link
        >
        <router-link to="/class"
          ><el-submenu index="3"
            ><template slot="title"
              ><span class="el-icon-s-claim" />课程</template
            ><router-link to="/video"
              ><el-menu-item index="3-1"><span class="el-icon-video-camera-solid"></span> 视频课程</el-menu-item></router-link
            >
          </el-submenu></router-link
        >
        <a href="#"
          ><el-menu-item index="4"
            ><span class="el-icon-s-platform" />GitHub</el-menu-item
          ></a
        >
      </el-container>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.float_right {
  float: right;
}
.router-link-active {
  text-decoration: none;
}
</style>
