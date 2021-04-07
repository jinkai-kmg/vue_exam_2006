<template>
  <div class="RegisterComponent">
    <el-form
      :label-position="labelPosition"
      ref="regForm"
      :model="regForm"
      :rules="rulesForm"
    >
      <el-form-item label="" prop="username">
        <el-input v-model="regForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="regForm.password"
          placeholder="密码"
          required
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="rePassword">
        <el-input
          v-model="regForm.rePassword"
          required
          type="password"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleLogClick('regForm')" style="width: 100%">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (value.length > 10) {
        callback(new Error("用户名最多10位"));
      } else {
        if (value.length < 2) {
          callback(new Error("用户名最少4位"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.isReg ? "请设置密码" : "请输入密码"));
      } else {
        if (this.regForm.password !== "") {
          this.$refs.regForm.validateField("rePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      regForm: {
        username: "",
        password: "",
        rePassword: "",
      },
      // 统一校验规则
      rulesForm: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        rePassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleLogClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$service
            .post("/user/register", {
              username: this.regForm.username,
              password: this.regForm.password,
            })
            .then((res) => {
              console.log(res);
              if (!res.data.errNum) {
                this.$message({
                  type: "success",
                  message: "注册成功！请登录",
                });
                this.isReg = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(this.regForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.RegisterComponent {
  .el-form {
    height: 200px;
    display: flex;
    flex-direction: column;
  }
}
</style>