<template>
  <div class="video">
    <el-row type="flex" justify="center" :gutter="20" class="top-buffer">
      <el-col :span="14" :offset="0">
        <video id="myVideo" class="video-js" style="width: 100%">
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>
        <div id="id">{{ vedio_name }}</div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          class="top-buffer buffer_20"
        >
        </el-input>
        <el-button round class="float_right">发送</el-button>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card>
          <div slot="header">
            <span>播放列表</span>
          </div>
          <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期"> </el-table-column>
          </el-table>
          <!-- card body -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TestTwo",
  data() {
    return {
      textarea: "",
    };
  },

  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "100%",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px",
      });
    },
  },
};
</script>

<style>
.top-buffer_20 {
  margin-top: 20px;
}
.buffer_20 {
  margin-bottom: 10px;
}
</style>