<template>
  <div class="login-form-container">
    <el-form>
      <div class="title-container">
        <h3>用户登陆</h3>
      </div>
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="loginInfo.username">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" v-model="loginInfo.password" show-password>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-divider></el-divider>
        <el-button type="text" @click="resignFormVisible = true">注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="账户注册" :visible.sync="resignFormVisible" center>
      <el-form :model="resignInfo" status-icon :rules="rules" ref="resignInfo">
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
          <el-input v-model="resignInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="设置密码：" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="resignInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="verifyPassword">
          <el-input type="password" v-model="resignInfo.verifyPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phoneNum">
          <el-input v-model="resignInfo.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" :label-width="formLabelWidth" prop="realName">
          <el-input v-model="resignInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="resignInfo.idCard"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resignFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resign('resignInfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.resignInfo.verifyPassword !== "") {
          this.$refs.resignInfo.validateField("verifyPassword");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resignInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginInfo: {
        username: "",
        password: ""
      },
      resignInfo: {
        username: "",
        password: "",
        verifyPassword: "",
        phoneNum: "",
        realName: "",
        idCard: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        verifyPassword: [
          { required: true, validator: validatePassword2, trigger: "blur" }
        ],
        phoneNum: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /^1[123457890]\d{9}$/,
            min: 11,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        idCard: [
          { required: true, message:"请输入身份证号码", trigger: "blur" },
          {
            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请输入正确的身份证号",
            trigger: "blur"
          }
        ]
      },
      resignFormVisible: false,
      formLabelWidth: "150px"
    };
  },
  methods: {
    login() {
      if (this.loginInfo.username === "" || this.loginInfo.password === "") {
        this.$message({
          showClose: true,
          type: "error",
          message: "用户名或密码不能为空",
          center: true
        });
      } else {
        axios
          .post(
            "/api/login",
            qs.stringify({
              username: this.loginInfo.username,
              password: this.loginInfo.password
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then(res => {
            console.log(res.data);
            if (res.data.success === true) {
              // 存用户名
              this.$store.dispatch("setUsername", this.loginInfo.username);
              // 存token
              this.$store.dispatch("setToken", res.data.data.token);
              this.$router.push({ path: "/course" });
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "用户名或密码错误",
                center: true
              });
            }
          })
          .catch(error => console.log(error));
      }
    },

    resign(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              "/api/resign",
              qs.stringify({
                username: this.resignInfo.name,
                password: this.resignInfo.password,
                phoneNum: this.resignInfo.phoneNum,
                realName: this.resignInfo.realName,
                idCard: this.resignInfo.idCard
              }),
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
            .then(res => {
              if (res.data.success === true) {
                this.resignFormVisible = false;
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
            });
        } else {
          console.log("error submit!");
        }
      });
    }
  }
};
</script>
<style scoped>
.title-container {
  position: relative;
}
.title-container h3 {
  font-size: 26px;
  margin: 0px auto 40px auto;
  text-align: center;
}

.login-form-container {
  height: 100%;
}

.login-form-container > .el-form {
  position: relative;
  width: 420px;
  top: 20%;
  max-width: 100%;
  padding: 35px 35px 0;
  margin: auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
}
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #454545;
}
.el-input >>> .el-input__inner {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-form-item .el-button {
  width: 100%;
}
.el-button {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-divider {
  margin: 20px 0;
}
.el-divider >>> .el-divider__text {
  height: 10px;
  line-height: 10px;
  background: rgba(255, 255, 255, 0.7);
}
.el-dialog__wrapper >>> .el-dialog {
  border-radius: 15px;
}
</style>