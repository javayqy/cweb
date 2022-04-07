<template>
  <div>
    <el-table :data="fileList" style="width: 100%" stripe>
      <el-table-column prop="id" label="id" width="80" />

      <el-table-column prop="name" label="文件名" />

      <el-table-column prop="size" label="文件大小" width="100">
        <template slot-scope="scope">
          <el-tag>{{scope.row.size}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="上传日期" />
      <el-table-column prop="chapterId" label="所属章节id" width="100" />
      <el-table-column prop="url" label="文件路径" />
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini">
            <a :href="'/api/student/download/'+scope.row.id" :download="scope.row.name">下载</a>
          </el-button>
          <template v-if="role=='admin'">
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该文件吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button size="mini" type="danger" style="margin-left: 10px" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
          <template v-else-if="role=='teacher'">
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该文件吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button size="mini" type="danger" style="margin-left: 10px" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      UploadUrl: "/api/guest/uploadVideo",
      fileList: [],
      role: "",

    };
  },
  mounted: function() {
    this.getAllFileInfo();
    this.role = this.$store.state.role;
  },
  methods: {
    handleDelete(row) {
      axios
        .post(
          "/api/teacher/deleteFile",
          qs.stringify({
            id: row.id
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
            this.getAllFileInfo();
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
          this.getAllUserInfo();
        });
    },
    getAllFileInfo() {
      axios
        .post("/api/student/getAllFileInfo", "", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Token: this.$store.state.token
          }
        })
        .then(res => {
          if (res.data.success === true) {
            this.fileList = res.data.data.fileList;
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: res.data.message,
              center: true
            });
          }
          this.getAllUserInfo();
        });
    }
  }
};
</script>

<style>
</style>