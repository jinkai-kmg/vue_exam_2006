<template>
  <div class="InstitutionalIndicators">
    <div class="main-serch">
      <h3>数据筛选</h3>
      <el-form :inline="true" :model="serchForm" class="demo-form-inline">
        <el-form-item label="输入查询：">
          <el-input
            v-model="serchForm.serchName"
            placeholder="项目ID或项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="适用地区：">
          <el-select v-model="serchForm.orgaInfo" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用机构：">
          <el-select v-model="serchForm.mappingStatus" placeholder="全部">
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
      <el-table :data="orgaData" border style="width: 100%" v-loading="loading">
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          fixed
          prop="orga_id"
          label="机构指标ID"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orga_name"
          label="机构指标名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orga_unit"
          label="指标单位"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="upper_limit"
          label="参考上限"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="lower_limit"
          label="参考下限"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="exam_id"
          label="对应指标标准"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="belongs_orga"
          label="所属机构"
          width="300"
        >
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small">指标映射</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizeArr"
        :page-size="pageSize"
        background
        layout="sizes,total, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="新增体检指标" :visible.sync="dialogFormVisible">
      <el-form
        :model="addOrgaForm"
        :rules="rules"
        ref="addOrgaForm"
        label-width="100px"
        class="demo-ruleForm dialog-addform"
      >
        <div class="form-box">
          <div class="el-form-top">
            <div class="form-top-left">
              <el-form-item label="机构指标名称：" prop="orga_name">
                <el-input
                  v-model="addOrgaForm.orga_name"
                  placeholder="请输入机构指标名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="机构指标ID：" prop="orga_id">
                <el-input
                  v-model="addOrgaForm.orga_id"
                  placeholder="请输入机构指标ID"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否比对：" prop="is_comparison">
                <el-switch v-model="addOrgaForm.is_comparison" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="指标单位：" prop="orga_unit">
                <el-input
                  v-model="addOrgaForm.orga_unit"
                  placeholder="请输入指标单位"
                ></el-input>
              </el-form-item>
              <el-form-item label="参考上限：" prop="upper_limit">
                <el-input
                  v-model="addOrgaForm.upper_limit"
                  placeholder="请输入参考上限"
                ></el-input>
              </el-form-item>
              <el-form-item label="参考下限：" prop="lower_limit">
                <el-input
                  v-model="addOrgaForm.lower_limit"
                  placeholder="请输入参考下限"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form-top-right">
              <el-form-item label="体检机构：">
                <el-select v-model="addOrgaForm.belongs_orga" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="el-form-main">
            <el-form-item label="正常提示：" prop="normal_message">
              <el-input
                type="textarea"
                :rows="6"
                v-model="addOrgaForm.normal_message"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="偏高提示：" prop="high_message">
              <el-input
                type="textarea"
                :rows="6"
                v-model="addOrgaForm.high_message"
              ></el-input>
            </el-form-item>
            <el-form-item label="偏低提示：" prop="low_message">
              <el-input
                type="textarea"
                :rows="6"
                v-model="addOrgaForm.low_message"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="el-form-bottom">
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary" @click="submitForm('addOrgaForm')"
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
  name: "InstitutionalIndicators",
  data() {
    return {
      loading: false,
      // 表格数据
      orgaData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      pageSizeArr: [10, 20, 30, 40],
      // 是否弹出
      dialogFormVisible: false,
      // 搜索框数据
      serchForm: {
        serchName: "",
        orgaInfo: "",
        mappingStatus: "",
      },
      // 体检机构添加数据
      addOrgaForm: {
        orga_name: "",
        orga_id: "",
        is_comparison: "",
        orga_unit: "",
        upper_limit: "",
        lower_limit: "",
        normal_message: "",
        high_message: "",
        low_message: "",
        belongs_orga: ""
      }
    };
  },
  created() {
    this.getOrgaList();
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
    submitForm(formName){
      console.log(this.addOrgaForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$service
            .post("http://vue.api.com/orga/addOrga", {
              addOrgaForm: this.addOrgaForm
            })
            .then((res) => {
              console.log(res);
              if (!res.data.errNum) {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOrgaList() {
      this.loading = true;

      this.$service
        .get(
          "http://vue.api.comcto.com/orga/orgaList?page=" +
            this.currentPage +
            "&size=" +
            this.pageSize,
          {}
        )
        .then((res) => {
          this.loading = false;
          // console.log(res);
          this.orgaData = res.data.data;
        });
    },
  },
};
</script>

<style lang="scss">
.InstitutionalIndicators {
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