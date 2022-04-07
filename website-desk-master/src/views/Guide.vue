<template>
  <div class="guide">
    <!-- 侧边框 -->
    <el-row>
      <el-col :span="4" style="height:100%">
        <el-aside>

          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">文档</span>
              </template>
              <router-link to="/g1"><el-menu-item index="1-1">简介</el-menu-item></router-link>
              <el-menu-item index="1-2">环境设置</el-menu-item>
              <el-menu-item index="1-3">程序结构</el-menu-item>
              <el-menu-item index="1-4">基本语法</el-menu-item>
              <el-menu-item index="1-5">数据类型</el-menu-item>
              <el-menu-item index="1-6">变量</el-menu-item>
              <el-menu-item index="1-7">常量</el-menu-item>
              <el-menu-item index="1-8">运算符</el-menu-item>
              <el-menu-item index="1-9">判断</el-menu-item>
              <el-menu-item index="1-10">循环</el-menu-item>
              <el-menu-item index="1-11">函数</el-menu-item>
              <el-menu-item index="1-12">作用域规则</el-menu-item>
              <el-menu-item index="1-13">数组</el-menu-item>
              <el-menu-item index="1-14">枚举</el-menu-item>
              <el-menu-item index="1-15">指针</el-menu-item>
              <el-menu-item index="1-16">函数指针与回调函数</el-menu-item>
              <el-menu-item index="1-17">字符串</el-menu-item>
              <el-menu-item index="1-18">结构体</el-menu-item>
              <el-menu-item index="1-19">共用体</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">课件</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">问答</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">在线交流</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-col>

      <!-- 侧边框结束 -->
      <!-- 主内容 -->
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
      <!-- 主内容结束 -->
    </el-row>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
