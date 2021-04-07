<template>
  <div class="BookingInformation">
    <div class="main-serch">
      <h3>数据筛选</h3>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="输入查询：">
          <el-input
            v-model="formInline.user"
            placeholder="姓名/手机/身份证号/订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="体检状态：">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体检状态：">
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="reset" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-btn">
      <el-button @click="dialogFormVisible = true">修改状态</el-button>
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
          label="姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="comboName"
          label="性别"
          width="40"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="originalPrice"
          label="手机"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sellingPrice"
          label="身份证号"
          width="250"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="activeRegion"
          label="体检内容"
          width="250"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="isEnable"
          label="体检机构"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="体检日期"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="订单号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="体检状态"
          width="100"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改时间</el-button
            >
            <el-button type="text" size="small">修改状态</el-button>
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
    <el-dialog title="修改状态" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="目标状态" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">已体检</el-radio>
          <el-radio v-model="radio" label="2">失效</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BookingInformation",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      dialogFormVisible: false,
      comboData: [
        {
          comboId: "TJXM00001",
          comboName: "女",
          originalPrice: "1000",
          sellingPrice: "998",
          activeRegion: "广东省，湖南省",
          isEnable: "启用",
          orderNumber: "88",
        },
      ],
      radio: "1",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
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
.BookingInformation {
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
    width: 500px;
    height: 250px;
  }
  .el-form-item{
    display: flex;
    justify-content: center;
  }
}
</style>