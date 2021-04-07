<template>
  <div class="AdminLogin">
    <div class="AdminLogin-box">
      <el-tabs class="el-tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first"
          ><LoginComponent></LoginComponent
        ></el-tab-pane>
        <el-tab-pane label="注册" name="second"
          ><RegisterComponent></RegisterComponent
        ></el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginComponent from "../components/LoginComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
export default {
  name: "AdminLogin",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    LoginComponent,
    RegisterComponent,
  },
};
</script>

<style lang="scss">
.AdminLogin {
  display: flex;
  justify-content: center;
  .AdminLogin-box {
    margin: 100px;
    width: 300px;
    display: flex;
    justify-content: center;
  }
  .el-tabs {
    width: 300px;
    height: 500px;
  }
  .el-tabs__content{
    height: 500px;
  }
}
</style>