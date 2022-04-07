<template>
  <div>
    <el-table :data="users" style="width: 100%" stripe>
      <el-table-column prop="id" label="用户id" width="80" />

      <el-table-column prop="username" label="用户名" width="120" />

      <el-table-column prop="role" label="用户权限" width="100">
        <template slot-scope="scope">
          <el-tag>{{scope.row.role}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" width="160" />
      <el-table-column prop="realName" label="真实姓名" width="100" />
      <el-table-column prop="idCard" label="身份证号" width="220" />
      <el-table-column prop="gender" label="性别" :formatter="formatSex" width="80" />
      <el-table-column prop="collegeName" label="学院名" width="220" />
      <el-table-column prop="schoolNum" label="学号" width="220" />
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该用户吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button size="mini" type="danger" style="margin-left: 10px" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑用户" :visible.sync="editFormVisible" center>
      <el-form :model="editUserInfo">
        <el-form-item label="用户名称：">
          <el-input v-model="editUserInfo.username" />
        </el-form-item>
        <el-form-item label="用户权限">
          <el-select v-model="editUserInfo.role" placeholder="请选择用户权限">
            <el-option label="超级管理员" value="admin" />
            <el-option label="教师" value="teacher" />
            <el-option label="学生" value="student" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="editUserInfo.phoneNum" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="editUserInfo.realName" />
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="editUserInfo.idCard" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="editUserInfo.gender" label="0">男</el-radio>
          <el-radio v-model="editUserInfo.gender" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="学院名称">
          <el-input v-model="editUserInfo.collegeName" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editUserInfo.schoolNum" />
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
      users: [],
      editFormVisible: false,
      editUserInfo: {
        username: "",
        role: "",
        phoneNum: "",
        realName: "",
        idCard: "",
        gender: "",
        collegeName: "",
        schoolNum: ""
      }
    };
  },
  mounted: function() {
    this.getAllUserInfo();
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    formatSex: function(row, column, cellValue, index) {
      return row.gender == 0 ? "男" : row.gender == 1 ? "女" : "未知";
    },
    getAllUserInfo() {
      axios
        .post("/api/admin/getAllUser", "", {
          headers: { Token: this.$store.state.token }
        })
        .then(res => {
          this.users = res.data.data.userInfo;
          console.log(this.users);
        });
    },
    commitEdit() {
      axios
        .post(
          "/api/admin/putUser",
          qs.stringify({
            id: this.editUserInfo.id,
            username: this.editUserInfo.courseName,
            role: this.editUserInfo.role,
            phoneNum: this.editUserInfo.phoneNum,
            realName: this.editUserInfo.realName,
            idCard: this.editUserInfo.idCard,
            collegeName: this.editUserInfo.collegeName,
            schoolNum: this.editUserInfo.schoolNum,
            gender: this.editUserInfo.gender
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
          this.getAllUserInfo();
        });
    },

    handleEdit(row) {
      this.editUserInfo.id = row.id;
      this.editUserInfo.username = row.username;
      this.editUserInfo.role = row.role;
      this.editUserInfo.phoneNum = row.phoneNum;
      this.editUserInfo.realName = row.realName;
      this.editUserInfo.idCard = row.idCard;
      this.editUserInfo.collegeName = row.collegeName;
      this.editUserInfo.schoolNum = row.schoolNum;
      this.editUserInfo.gender = row.gender;
      this.editFormVisible = true;
    },
    handleDelete(row) {
      axios
        .post(
          "/api/admin/deleteUser",
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
    }
  }
};
</script>

<style scoped>
</style>