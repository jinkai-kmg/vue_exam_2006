<template>
  <div class="Criterion">
    <div class="main-serch">
      <h3>数据筛选</h3>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="输入查询：">
          <el-input v-model="formInline.user" placeholder="指标名称"></el-input>
        </el-form-item>
        <el-form-item label="是否比对：">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="reset" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-btn">
      <el-button @click="dialogFormVisible = true">添加</el-button>
      <el-button>删除</el-button>
      <el-button>导入</el-button>
    </div>
    <div class="main-table">
      <el-table :data="comboData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          fixed
          prop="comboId"
          label="标准指标ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="comboName"
          label="标准指标名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="originalPrice"
          label="指标单位"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sellingPrice"
          label="售价"
          width="参考上限"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="activeRegion"
          label="参考下限"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="isEnable"
          label="正常提示"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="偏高提示"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="偏低提示"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="是否比对"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        background
        layout="sizes,total, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="新增体检套餐" :visible.sync="dialogFormVisible">
      <el-form
        :model="dialogForm"
        :rules="rules"
        ref="dialogForm"
        label-width="100px"
        class="demo-ruleForm dialog-addform"
      >
        <div class="form-box">
          <div class="el-form-top">
            <div class="form-top-left">
              <el-form-item label="套餐名称：" prop="comboName">
                <el-input
                  v-model="dialogForm.comboName"
                  placeholder="请输入体检套餐名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="套餐ID：" prop="comboId">
                <el-input
                  v-model="dialogForm.comboId"
                  placeholder="请输入体检套餐Id"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否启用：" prop="isEnable">
                <el-switch v-model="dialogForm.isEnable"></el-switch>
              </el-form-item>
              <el-form-item label="原价：" prop="originalPrice">
                <el-input
                  v-model="dialogForm.originalPrice"
                  placeholder="请输入体检套餐原价"
                ></el-input>
              </el-form-item>
              <el-form-item label="原价：" prop="originalPrice">
                <el-input
                  v-model="dialogForm.originalPrice"
                  placeholder="请输入体检套餐原价"
                ></el-input>
              </el-form-item>
              <el-form-item label="售价：" prop="sellingPrice">
                <el-input
                  v-model="dialogForm.sellingPrice"
                  placeholder="请输入体检套餐售价"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form-top-right">
            </div>
          </div>
          <div class="el-form-main">
            <el-form-item label="套餐介绍" prop="introduce">
              <el-input
                type="textarea"
                :rows="6"
                v-model="dialogForm.introduce"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="使用规则" prop="regulations">
              <el-input
                type="textarea"
                :rows="6"
                v-model="dialogForm.regulations"
              ></el-input>
            </el-form-item>
            <el-form-item label="套餐组成" prop="constitute">
              <el-input
                type="textarea"
                :rows="6"
                v-model="dialogForm.constitute"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="el-form-bottom">
          <el-form-item>
            <el-button @click="resetForm('dialogForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')"
              >确定</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Criterion",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      dialogForm: {
        comboName: "",
        comboId: "",
        isEnable: false,
        comboType: [],
        comboTime: "",
        originalPrice: "",
        sellingPrice: "",
        activeRegion: "",
        organization: "",
        introduce: "",
        regulations: "",
        constitute: "",
      },
      comboData: [
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
        {
          comboId: "TJXM00001",
          comboName: "老年人体检套餐豪华版（女）",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      value1: true,
      value2: true,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss">
.Criterion {
  .main-serch {
    margin-top: 10px;
    height: 122px;
    background-color: #fff;
    border: 1px solid rgb(233, 233, 233);
  }
  .main-serch h3 {
    line-height: 50px;
    border-bottom: 1px solid rgb(233, 233, 233);
    padding-left: 20px;
  }
  .el-form {
    display: flex;
    position: relative;
    top: 15px;
    justify-content: space-between;
    margin-left: 30px;
  }
  .main-btn {
    background-color: #fff;
    padding: 10px 20px 20px 20px;
  }
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .el-dialog {
    width: 1350px;
    height: 700px;
  }
  .dialog-addform {
    display: flex;
    flex-direction: column;
  }
  .el-form-top {
    display: flex;
    justify-content: space-between;
  }
  .form-box {
    width: 1300px;
    height: 550px;
    overflow-x: auto;
  }
  .form-top-left {
    width: 45%;
    margin-right: 30px;
  }
  .form-top-right {
    width: 50%;
  }
  .el-form-bottom {
    display: flex;
    justify-content: flex-end;
  }
  .el-transfer__buttons {
    width: 40px;
    height: 100px;
    align-content: center;
  }
  .el-transfer__button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 auto;
    padding: 0;
  }
  .el-button + .el-button {
    margin-left: 0px;
  }
}
</style>