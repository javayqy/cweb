<template>
  <div class="box">
    <el-col :span="18" class="videoBox">
      <video
        id="myVideo"
        class="video-js vjs-big-play-centered"
        ref="video"
        width="800"
        height="600"
        preload="auto"
        autoplay
        controls
      ></video>
    </el-col>
    <el-col :span="6" class="tree_warpper">
      <el-tree
        :data="chapters"
        :props="defaultProps"
        :highlight-current="true"
        :default-expand-all="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        ref="tree"
      ></el-tree>
      <!-- 
      <video-list :chapters="chapters" />-->
    </el-col>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "VideoExample",

  components: {
    // VideoPlayer
  },
  data() {
    return {
      currentChapterId:"",
      videoOptions: {
        autoplay: false,
        height: 600,
        width: 800,
        controls: true,
        preload: "auto",
        loop: true,
        sources: [
          {

            src: "",
            type: "video/mp4"
          }
        ]
      },
      defaultProps: {
        id: "id",
        sequence: "sequence",
        children: "children",
        videoId: "videoId",
        label: data => {
          return data.sequence + ". " + data.label;
        }
      },
      chapters: []
    };
  },
  mounted: function() {
    this.getCurrentChapterId();
  },
  methods: {

getCurrentChapterId() {
      axios
        .post(
          "/api/teacher/getBigChapterId",
          qs.stringify({
            courseId: this.$route.params.id
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Token: this.$store.state.token
            }
          }
        )
        .then(res => {
          if (res.data.success === true) {
            this.currentChapterId = res.data.data.rootId;
 this.getAllChapter(this.currentChapterId);
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "课程未添加",
              center: true
            });
          }
        });
    },


    getAllChapter(id) {
      axios
        .post(
          "/api/student/getAllChapter",
          qs.stringify({ id: id }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Token: this.$store.state.token
            }
          }
        )
        .then(res => {
          if (res.data.success === true) {
            this.chapters = res.data.data.chapters;
          }
        });
    },
    handleNodeClick(data) {
      this.$refs.video.src = "/api/guest/video?id=" + data.id;
    }
  }
};
</script>
<style scoped>
.box {
  height: 100%;
}
.el-col {
  height: 100%;
}
.el-tree-node > .el-tree-node__children {
  overflow: visible;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.videoBox {
  display: flex;
  justify-content: center;
}
.tree_warpper {
  overflow-y: auto;
  overflow-x: scroll;
  height: 100%;
  background-color: #ffffff;
  background-color: white;
  padding: 30px;
  border-right-style: solid;
  border-width: 1px;
  border-color: gray;
}
.video-js {
  width: 800px;
  height: 600px;
}
</style>

