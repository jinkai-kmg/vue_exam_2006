<template>
  <div class="medicalorgan">
    <div class="main-serch">
      <h3>数据筛选</h3>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="输入查询：">
          <el-input
            v-model="formInline.user"
            placeholder="机构ID或机构名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在城市：">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构类型：">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
      <el-table :data="organizationData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          fixed
          prop="organizationId"
          label="机构ID"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="organizationName"
          label="机构名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="branch"
          label="分支机构"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="currentCity"
          label="所在城市"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orgniztionType"
          label="机构类型"
          width="160"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orgniztionPhone"
          label="电话"
          width="160"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="isEnable"
          label="是否启用"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button type="text" size="small">离线号源设置</el-button>
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
    <el-dialog title="新增体检机构" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="organ-form-left">
          <el-form-item label="机构名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分支名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="机构ID" :label-width="formLabelWidth">
            <el-input
              placeholder="系统自动生成"
              v-model="input1"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-table-column
            align="center"
            prop="isEnable"
            label="是否启用"
            width="120"
          >
          </el-table-column>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="机构图片" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </div>
        <div class="organ-form-right">
          <el-form-item label="所在城市" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构属性" :label-width="formLabelWidth">
            <el-checkbox v-model="checked">备选项</el-checkbox>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="坐标位置" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </div>
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
  data() {
    return {
      value1: true,
      value2: true,
      formInline: {
        user: "",
        region: "",
      },
      organizationData: [
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
        },
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
        },
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
        },
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
        },
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
        },
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
        },
        {
          organizationId: "00001",
          organizationName: "瑞慈",
          branch: "IFC分店",
          currentCity: "广州市",
          orgniztionType: "专门体检机构",
          orgniztionPhone: "020-88888888",
          isEnable: "启用",
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
      formLabelWidth: "120px",
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
.medicalorgan {
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
}
</style>