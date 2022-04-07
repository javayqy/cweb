<template>
  <div>
    <el-table :data="courses" style="width: 100%" stripe>
      <el-table-column prop="id" label="课程id" width="80"></el-table-column>
      <el-table-column prop="name" label="课程名" width="600"></el-table-column>
      <el-table-column prop="teacherName" label="讲师" width="100">
        <template slot-scope="scope">
          <el-tag>{{scope.row.teacherName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot="header">
          <el-button size="mini" type="primary" @click="handleAddCourse">新增课程</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleDetail(scope)">详细信息</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该课程吗？"
            @confirm="handleDelete(scope.$index,scope.row)"
          >
            <el-button size="mini" type="danger" style="margin-left: 10px" slot="reference">删除</el-button>
          </el-popconfirm>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加课程" :visible.sync="addFormVisible" center>
      <el-form :model="addCourseInfo">
        <el-form-item label="课程名称：">
          <el-input v-model="addCourseInfo.courseName" />
        </el-form-item>
        <el-form-item label="讲师名称：">
          <el-input v-model="addCourseInfo.teacherName" />
        </el-form-item>
      </el-form>
      <template slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible=false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确认</el-button>
      </template>
    </el-dialog>
    <el-dialog title="编辑课程" :visible.sync="editFormVisible" center>
      <el-form :model="editCourseInfo">
        <el-form-item label="课程名称：">
          <el-input v-model="editCourseInfo.courseName" />
        </el-form-item>
        <el-form-item label="讲师名称：">
          <el-input v-model="editCourseInfo.teacherName" />
        </el-form-item>
      </el-form>
      <template slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible=false">取消</el-button>
        <el-button type="primary" @click="commitEdit">确认</el-button>
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
      courses: [],
      addCourseInfo: {
        courseName: "",
        teacherName: "",
        sequence: ""
      },
      editCourseInfo: {
        id: "",
        courseName: "",
        teacherName: ""
      },
      addFormVisible: false,
      editFormVisible: false
    };
  },
  mounted: function() {
    this.getAllCourseInfo();
  },
  methods: {
    handleAddCourse() {
      this.addCourseInfo.sequence = this.courses.length + 1;
      // console.log(this.courses.length+1)
      // console.log(this.addCourseInfo.sequence)
      this.addFormVisible = true;
    },
    getAllCourseInfo() {
      axios({
        method: "post",
        url: "/api/student/getAllCourseInfo2",
        headers: {
          Token: this.$store.state.token
        }
      }).then(res => {
        this.courses = res.data.data.CourseInfo;
      });
    },
    handleEdit(row) {
      this.editCourseInfo.id = row.id;
      this.editCourseInfo.courseName = row.name;
      this.editCourseInfo.teacherName = row.teacherName;
      this.editFormVisible = true;
    },
    commitEdit() {
      axios
        .post(
          "/api/teacher/putCourse",
          qs.stringify({
            id: this.editCourseInfo.id,
            courseName: this.editCourseInfo.courseName,
            teacherName: this.editCourseInfo.teacherName
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
            this.editFormVisible = false;
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
          this.getAllCourseInfo();
        });
    },
    handleAdd() {
      axios
        .post(
          "/api/teacher/postCourse",
          qs.stringify({
            courseName: this.addCourseInfo.courseName,
            teacherName: this.addCourseInfo.teacherName,
            sequence: this.addCourseInfo.sequence
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
          this.getAllCourseInfo();
        });
    },
    handleDelete(index, row) {
      axios
        .post(
          "/api/teacher/deleteCourse",
          qs.stringify({
            id: row.id,
            sequence: index+1
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
          this.getAllCourseInfo();
        });
    },
    handleDetail(scope) {
      this.$router.push({
        name: "ChapterManager",
        params: { id: scope.row.id, sequence: scope.$index + 1 }
      });
    }
  }
};
</script>

<style scoped>
</style>