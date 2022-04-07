<template>
  <div class="home">
    <!-- 第一部分 -->
    <el-row type="flex" justify="center" class="top-buffer">
      <el-col :span="9" class="">
        <img
          src="../assets/c.png"
          alt="cnbb"
          style="width: 300px; height: 300px"
          class="float_right"
        />
      </el-col>

      <el-col :span="9" class="">
        <el-row type="flex" justify="center" class="top-buffer">
          <el-col>
            <h1>C语言精品课程</h1>
            <h3>面向过程式的计算机程序设计语言</h3>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <div class="box_margin button_margin">

 <router-link to="/login"><el-button type="success" round @click="dialogVisible = true" icon="el-icon-s-order">开始学习</el-button></router-link>

<el-dialog

  :visible.sync="dialogVisible"

  :before-close="handleClose">
  <!-- <span>这是一段信息</span> -->
  <!-- <router-link to="/login">111</router-link> -->
  <router-view></router-view>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


          </div>
          <!-- <div class="button_margin2">
            <a href="/about"
              ><el-button type="success" round>视频课程</el-button></a
            >
          </div> -->
          <div class="button_margin2">
            <a href="/about"><el-button type="info" round icon="el-icon-s-platform">GitHub</el-button></a>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!-- 第一部分结束 -->
    <!-- 第二部分 -->
    <el-row :gutter="100" type="flex" justify="center" class="top-buffer">
      <el-col
        :span="6"
        class="box box_margin"
        style="width: 300px; height: 300px"
      >
        <h3>广泛性</h3>
        <p>
          C语言的运算范围的大小直接决定了其优劣性。C语言中包含了34种运算符，
        </p>
      </el-col>
      <el-col
        :span="6"
        class="box box_margin"
        style="width: 300px; height: 300px"
      >
        <h3>简洁性</h3>
        <p>
          9类控制语句和32个关键字是C语言所具有的基础特性，使得其在计算机应用程序编写中具有广泛的适用性
        </p>
      </el-col>
      <el-col
        :span="6"
        class="box box_margin"
        style="width: 300px; height: 300px"
        ><h3>结构完善</h3>
        <p>
          C语言是一种结构化语言，在系统描述方面具有显著优势，同时这一特性也使得它能够适应多种不同的编程要求，且执行效率高。
        </p>
      </el-col>
    </el-row>
    <!-- 第二部分结束 -->
    <!-- 第三部分 -->
    <el-row type="flex" justify="center" class="bg-purple-dark top-buffer">
      <el-col :span="6"> </el-col>
      <el-col :span="6" :offset="0"
        ><img src="../assets/schlog.png" alt=""
      /></el-col>
      <el-col :span="6" :offset="0"></el-col>
    </el-row>
    <!-- 第三部分结束 -->

  </div>
</template>

<style>
.float_right {
  float: right;
}
.bg-purple-dark {
  background: #99a9bf;
}
.top-buffer {
  margin-top: 60px;
}
.box {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.box_margin {
  margin: 20px;
}
.button_margin {
  margin-left: 0px;
}
.button_margin2 {
  margin: 10px;
  margin-top: 20px;
}
.router-link-active {
  text-decoration: none;
}
</style>

<script>
export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
      }
    }
  };
</script>
