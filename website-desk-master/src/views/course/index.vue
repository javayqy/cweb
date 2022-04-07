<template>
  <el-row class="box">
    
    <el-col :span="4"></el-col>
    <el-col :span="16" class="board">
    <div ><p class="font">C语言精品课程网站</p></div>
    <el-divider><div>全部课程</div></el-divider>
      <el-card shadow="hover" @click.native="test(course)" v-for="course in courses" :key="course.id">
        <div class="img-container">
          <el-image
            style="width: 100%; height: 150px"
            :src="'/api/student/getPoster?id='+course.id"
            fit="cover"
          />
        </div>
        <div style="padding:14px">
          <span>《{{ course.name }}》</span>
          <div class="bottom">
            <span>主讲人：{{ course.teacherName }}</span>
          </div>
        </div>
      </el-card>
       
    </el-col>
    <el-col :span="4"></el-col>
  
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      courses: []
    };
  },
  mounted: function() {
    this.getAllCourseInfo();
  },
  computed: {},
  methods: {
    test(course) {
      this.$router.push({ path: `/dashboard/${course.id}` });
    },
    getAllCourseInfo() {
      axios({
        method: "post",
        url: "/api/student/getAllCourseInfo",
        headers: {
          Token: this.$store.state.token
        }
      }).then(res => {
        this.courses = res.data.data.CourseInfo;
      });
    },
    getPoster(courseurl) {
      courseurl;
    }
  }
};
</script>

<style scoped>
.font{
  font-size: 24px;
  text-align: left;
  font-family: "PingFang SC";
}
.box {
  display: flex;
  justify-content: center;
}
.board {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.75);
  flex-wrap: wrap;
  align-content: flex-start;
}
.el-card {
  margin: 20px;
  margin-bottom: 0px;
  height: 270px;
  width: 240px;
}
.el-card >>> .el-card__body {
  padding: 0%;
}
.bottom {
  margin: 14px;
}
</style>