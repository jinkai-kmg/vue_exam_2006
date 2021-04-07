<template>
  <div class="Layout">
    <el-container>
      <el-header>
        <div class="el-header-left">
          <div class="medical-img"></div>
          <h2>在线体检预约管理后台</h2>
        </div>
        <div class="el-header-right">
          <div class="header-right-admin">
            <img src="../assets/avatar.jpg" alt="" />
            <span>Admin</span>
          </div>
          <div class="header-right-out">
            <img src="../assets/guanji.png" alt="" />
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>体检商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/medicalcombo">
                  <span slot="title">体检套餐管理</span>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/admin/medicalterm">
                  <span slot="title">体检项管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>体检信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/bookinginformation">
                  <span slot="title">预约信息查询</span>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/admin/medicalorganization">
                  <span slot="title">体检机构管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>体检指标管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/criterion">
                  <span slot="title">标准指标管理</span>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/admin/institutionalindicators">
                  <span slot="title">机构指标管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="main-top">
            <span>体检项管理</span>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
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

<style lang="scss">
.Layout {
  .el-header,
  .el-footer {
    background-color: rgb(50, 64, 87);
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .el-header-left {
    display: flex;
    align-items: center;
  }

  .el-header h2 {
    color: #fff;
    width: 150px;
    height: 50px;
    margin-left: 20px;
  }

  .el-header-right {
    display: flex;
    justify-content: space-between;
  }

  .header-right-admin {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }

  .header-right-admin img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .header-right-admin span {
    color: #fff;
    font-size: 10px;
    margin-left: 20px;
  }

  .header-right-out {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .header-right-out img {
    width: 40px;
    height: 40px;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 100%;
  }

  .el-main {
    background-color: rgba(243, 244, 249, 1);
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .medical-img {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
  }

  .main-top {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding-left: 10px;
  }
}
</style>
