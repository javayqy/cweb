<template>
  <div class="box">
    <el-row>
      <el-col :span="10" class="tree_warpper">
        <div class="header_warpper">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>
        </div>
        <!-- <el-alert title="默认添加章节到子章节的最后顺位" type="warning" show-icon></el-alert>
        <el-alert title="删除同级章节时请务必从最后章节删起" type="error" show-icon></el-alert> -->
        <el-button size="mini" class="addbutton" type="success" @click="addBigChapter">添加大章节</el-button>
        <div class="tree_box">
          <el-tree
            :data="chapters"
            :props="defaultProps"
            :highlight-current="true"
            :default-expand-all="true"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  style="  margin-right:10px;"
                  size="mini"
                  @click="() => append(node)"
                >添加小节</el-button>
                <el-popover placement="top" width="160" :ref="'popover-'+data.id">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="pCancel(data.id)">取消</el-button>
                    <el-button type="primary" size="mini" @click="deleteSubmit(data)">确定</el-button>
                  </div>
                  <el-button type="text" size="mini" slot="reference" @click="pOpen(data.id)">删除</el-button>
                </el-popover>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="14" class="detail_wrapper">
        <el-upload
          class="poster-uploader"
          action="/api/teacher/postPoster"
          accept="image/jpeg, image/jpg, image/png"
          :headers="uploadHeader"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handlePosterSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="imageUrl" :src="imageUrl" class="poster" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>更换课程封面</span>

        <el-form :model="detailForm" label-width="100px">
          <el-form-item label="章节名：">
            <el-input v-model="detailForm.name" />
          </el-form-item>
          <el-form-item label="章节排序：">
            <el-input :disabled="true" v-model="detailForm.sequence" />
          </el-form-item>
          <el-form-item label="子章节数：">
            <el-input :disabled="true" v-model="detailForm.countChild" />
          </el-form-item>
          <el-form-item label="叶子章节：">
            <el-switch v-model="uploadVisble" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="视频上传：" v-if="uploadVisble===true">
            <el-upload
              class="upload-wrapper"
              action="/api/teacher/uploadVideo"
              accept="video/mp4"
              :headers="uploadHeader"
              :data="uploadVideoData"
              :show-file-list="false"
              :on-success="videoUploadSuccess"
              :on-progress="videoUploading"
            >
              <el-button class="uploadButton" type="primary">选择视频...</el-button>
              <div slot="tip" class="el-upload__tip">
                <el-alert
                  title="务必保证在叶子章节才上传一个视频; 视频数量为1; 视频格式只能为mp4; "
                  type="info"
                  :closable="false"
                  show-icon
                ></el-alert>
              </div>
            </el-upload>
            <el-progress
              v-if="videoFlag == true"
              type="line"
              :percentage="videoUploadPercent"
              style="margin-top: 30px;"
            ></el-progress>
          </el-form-item>
          <el-form-item label="文件上传：" v-if="uploadVisble===true">
            <el-upload
              class="upload-wrapper"
              action="/api/teacher/uploadFile"
              :headers="uploadHeader"
              :data="uploadVideoData"
              :show-file-list="false"
              :before-upload="beforeUploadFile"
              :on-progress="fileuploading"
              :on-success="fileUploadSuccess"
            >
              <el-button class="uploadButton" type="primary">选择文件...</el-button>
              <div slot="tip" class="el-upload__tip">
                <el-alert
                  title="务必保证在叶子章节才上传课件; 课件数量不限; 课件格式不限"
                  type="info"
                  :closable="false"
                  show-icon
                ></el-alert>
              </div>
              <el-progress
                v-if="progressFlag == true"
                type="line"
                :percentage="fileUploadPercent"
                style="margin-top: 30px;"
              ></el-progress>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog title="添加章节" :visible.sync="addFormVisible" center>
      <el-form :model="appendForm">
        <el-form-item label="课程名称：">
          <el-input v-model="appendForm.chapterName" />
        </el-form-item>
        <el-form-item label="父级课程ID">
          <el-input :disabled="true" v-model="appendForm.parentId" />
        </el-form-item>
        <el-form-item label="当前层级顺序">
          <el-input :disabled="true" v-model="appendForm.sequence" />
        </el-form-item>
      </el-form>
      <template slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible=false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      currentChapterId: "",
      videoFlag: false,
      videoUploadPercent: 0,
      progressFlag: false,
      fileUploadPercent: 0,
      uploadVideoData: { id: "" },
      addFormVisible: false,
      uploadVisble: false,
      imageUrl: "/api/student/getPoster?id=" + this.$route.params.id,
      uploadHeader: { Token: this.$store.state.token },
      uploadData: {
        courseId: this.$route.params.id , 
        sequence: this.$route.params.sequence
      },
      chapters: [],
      defaultProps: {
        id: "id",
        sequence: "sequence",
        children: "children",
        videoId: "videoId",
        label: data => {
          return data.sequence + ". " + data.label;
        }
      },
      detailForm: {
        id: "",
        name: "",
        sequence: "",
        countChild: ""
      },
      appendForm: {
        chapterName: "",
        parentId: "",
        sequence: ""
      }
    };
  },
  mounted: function() {
    this.getCurrentChapterId();
    this.uploadVideoData.sequence = this.$route.params.sequence;
    console.log("初始化"+"当前index："+this.uploadVideoData.sequence);
  },
  methods: {
    handleNodeClick(data) {
      this.detailForm.id = data.id;
      this.detailForm.name = data.label;
      this.detailForm.sequence = data.sequence;
      this.detailForm.countChild = data.children.length;
      this.uploadVideoData.id = data.id;
    },
    goBack() {
      this.$router.push("/courseManager");
    },
    append(node) {
      this.appendForm.parentId = node.data.id;
      this.appendForm.sequence = node.childNodes.length + 1;
      this.addFormVisible = true;
    },
    handlePosterSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError(err) {
      console.log(err);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
        return isJPG && isPNG;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
    },
    getAllChapter(chapterId) {
      axios
        .post("/api/student/getAllChapter", qs.stringify({ id: chapterId }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Token: this.$store.state.token
          }
        })
        .then(res => {
          if (res.data.success === true) {
            this.chapters = res.data.data.chapters;
          }
        });
    },
    handleAdd() {
      axios
        .post(
          "/api/teacher/postChapter",
          qs.stringify({
            chapterName: this.appendForm.chapterName,
            parentId: this.appendForm.parentId,
            sequence: this.appendForm.sequence
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
            this.addFormVisible = false;
            this.$message({
              showClose: true,
              type: "success",
              message: res.data.message,
              center: true
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: res.data.message,
              center: true
            });
          }
          this.getAllChapter(this.currentChapterId);
        });
    },
    addBigChapter() {
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
            this.appendForm.parentId = res.data.data.rootId;
            this.appendForm.sequence = this.chapters.length + 1;
            this.addFormVisible = true;
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
            console.log(res.data.data);
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

    deleteSubmit(data) {
      console.log(data);
      axios
        .post(
          "/api/teacher/deleteChapter",
          qs.stringify({
            id: data.id
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
            this.pClose(data.id);
            this.$message({
              showClose: true,
              type: "success",
              message: res.data.message,
              center: true
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: res.data.message,
              center: true
            });
          }
          this.getAllChapter(this.currentChapterId);
        });
    },
    updateSubmit() {
      axios
        .post(
          "/api/teacher/putChapter",
          qs.stringify({
            id: this.detailForm.id,
            name: this.detailForm.name,
            sequence: this.detailForm.sequence
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
            this.$message({
              showClose: true,
              type: "success",
              message: res.data.message,
              center: true
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: res.data.message,
              center: true
            });
          }
          this.getAllChapter(this.currentChapterId);
        });
    },
    //上传前的函数(用于验证上传文件格式及大小)
    beforeUploadFile(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isLt100M) {
        return false;
      }
    },
    // eslint-disable-next-line no-unused-vars
    videoUploadSuccess(res, file, fileList) {
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (file.status == "success") {
        this.$message({
          showClose: true,
          type: "success",
          message: "上传成功",
          center: true
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "上传失败",
          center: true
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    fileUploadSuccess(res, file, fileList) {
      console.log(file);
      this.progressFlag = false;
      this.fileUploadPercent = 0;
      if (file.status == "success") {
        this.$message({
          showClose: true,
          type: "success",
          message: "上传成功",
          center: true
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "上传失败",
          center: true
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    videoUploading(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = Math.abs(file.percentage.toFixed(0));
    },
    // eslint-disable-next-line no-unused-vars
    fileuploading(event, file, fileList) {
      this.progressFlag = true;
      this.fileUploadPercent = Math.abs(file.percentage.toFixed(0));
    },
    pCancel(id) {
      this.pClose(id);
      console.log(id);
    },
    pClose(id) {
      this.$refs[`popover-` + id].doClose();
    },
    pOpen(id) {
      console.log(this.$refs);
      console.log(this.$refs[`popover-` + id]);
      this.$refs[`popover-` + id][0].doShow();
    }
  }
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
}
.box,
.el-row,
.tree_warpper,
.detail_wrapper {
  height: 100%;
}

.header_warpper {
  padding: 16px;
  background-color: white;
}
.tree_warpper {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
  border-right-style: solid;
  border-width: 1px;
  border-color: gray;
}
.detail_wrapper {
  padding: 30px;
  background-color: white;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.poster-uploader {
  margin: 0;
}
.poster-uploader >>> .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.poster-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.poster-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.poster {
  width: 240px;
  height: 150px;
  display: block;
}
.addbutton {
  flex: none;
  text-align: right;
  align-self: flex-end;
  margin-bottom: 10px;
  margin-right: 9px;
}
.el-form {
  margin-top: 20px;
}
.el-switch {
  width: 100%;
}
.uploadButton {
  width: 100%;
}
.el-alert {
  height: 30px;
}
.upload-wrapper >>> .el-upload {
  width: 100%;
}
.tree_box {
  overflow-y: auto;
  overflow-x: scroll;
  width: auto;
  height: 100%;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.el-tree-node > .el-tree-node__children {
  overflow: visible;
}
</style>
<style >
</style>