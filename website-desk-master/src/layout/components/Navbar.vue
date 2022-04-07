<template>
  <div class="nvabar">
    <!-- <div>
      <img
        src="C:\Users\Javayqy\Desktop\cvweb\website-desk-master\src\assets\c.png"
        style="width: 300px; height: 300px"
      /><span>cnbb</span>
    </div> -->
    <!-- 基本菜单栏 -->
    <el-menu
      :default-active="this.$route.path"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">{{
        item.navItem
      }}</el-menu-item>

      <div class="right-menu">
        <!-- 右上角用户图标 -->
        <el-dropdown @command="handleCommand">
          <div class="avatar-wrapper">
            <el-avatar :src="src">user</el-avatar>
            <i class="el-icon-caret-bottom" />
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人信息</el-dropdown-item>
            <el-dropdown-item command="b">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      navList: [

        { name: "/course", navItem: "我的课程" },
        { name: "/resource", navItem: "课程资源" },
        { name: "/courseManager", navItem: "课程管理" },
        { name: "/userManager", navItem: "用户管理" },
      ],
      src: "",
    };
  },
  created: function () {
    this.getAvatar();
  },
  mounted: function () {
    this.getRole();
  },
  methods: {
    getRole() {
      // 利用token获取用户信息
      axios
        .post("/api/getUserInfo", "", {
          headers: { Token: this.$store.state.token },
        })
        .then((res) => {
          if (res.data.success === true) {
            // 存头像url
            this.$store.dispatch(
              "setAvatarUrl",
              res.data.data.userInfo.avatarUrl
            );
            // 存用户名
            this.$store.dispatch(
              "setUsername",
              res.data.data.userInfo.username
            );
            // 存用户权限
            this.$store.dispatch("setRole", res.data.data.userInfo.role);
            console.log(this.$store.state.role);
          }
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command === "a") {
        this.$router.push("/profile");
      } else if (command === "b") {
        this.$store.dispatch("setUsername", null);
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setAvatarUrl", null);
        this.$store.dispatch("setRole", null);
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("avatarUrl");
        window.sessionStorage.removeItem("role");
        this.$router.push({ path: "/" });
        this.$message({
          showClose: true,
          type: "success",
          message: "注销成功",
          center: true,
        });
      } else {
        console.log("注销失败");
      }
    },
    getAvatar() {
      this.src =
        "/api/student/getAvatar?username=" + this.$store.state.username;
    },
  },
};
</script>

<style scoped>
.nvabar {
  height: 100%;
  padding: 0%;
  text-align: justify;
}
.el-row {
  height: 100%;
}
.right-menu {
  float: right;
  margin: 10px;
}
</style>