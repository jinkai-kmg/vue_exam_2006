<template>
  <div class="LoginComponent">
    <el-form :label-position="labelPosition" ref="loginForm" :model="logForm">
      <el-form-item prop="username">
        <el-input v-model="logForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="logForm.password"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleLogClick('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",
      logForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$service
            .post("/user/login", {
              // .post("http://vue.api.com/user/login", {
              username: this.logForm.username,
              password: this.logForm.password,
            })
            .then((res) => {
              console.log(res)
              sessionStorage.setItem(
                "username",
                res.data.data.username
              );
              if (!res.data.errNum) {
                this.$router.push({
                  path: "/admin",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(this.logForm);
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
.LoginComponent {
  .el-form {
    height: 200px;
    display: flex;
    flex-direction: column;
  }
}
</style>