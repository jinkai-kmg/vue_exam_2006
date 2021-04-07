<template>
  <div class="MedicalTerm">
    <div class="main-serch">
      <h3>数据筛选</h3>
      <el-form
        :inline="true"
        :model="ComboSerch"
        class="demo-form-inline serch-form"
        ref="ComboSerch"
      >
        <el-form-item label="输入查询：" prop="comboName">
          <el-input
            v-model="ComboSerch.comboName"
            placeholder="套餐ID或套餐名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="适用地区：">
          <AreaComponent
            :province-data="provinceData"
            :ComboSerch="ComboSerch"
            :city-data="cityData"
          ></AreaComponent>
        </el-form-item>
        <el-form-item label="适用机构：" prop="applyOrgan">
          <el-select v-model="ComboSerch.applyOrgan" placeholder="全部">
            <el-option
              v-for="(item, index) in organData"
              :key="index"
              :label="item.organ"
              :value="item.organ"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')"
            >查询</el-button
          >
          <el-button @click="resetForm('formInline')">重置</el-button>
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
          label="项目ID"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="comboName"
          label="项目名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="originalPrice"
          label="原价"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sellingPrice"
          label="售价"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="activeRegion"
          label="适用地区"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="isEnable"
          label="是否启用"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="订购数量"
          width="150"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
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
              <el-form-item label="适用标签：">
                <el-checkbox-group v-model="dialogForm.comboType">
                  <el-checkbox-button
                    label="男性套餐"
                    name="comboType"
                  ></el-checkbox-button>
                  <el-checkbox-button
                    label="女性套餐"
                    name="comboType"
                  ></el-checkbox-button>
                  <el-checkbox-button
                    label="老人套餐"
                    name="comboType"
                  ></el-checkbox-button>
                  <el-checkbox-button
                    label="入职体检"
                    name="comboType"
                  ></el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="有效时间至：">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dialogForm.comboTime"
                  style="width: 50%"
                ></el-date-picker>
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
              <el-form-item label="适用城市：" prop="activeRegion">
                <el-select
                  v-model="dialogForm.activeRegion"
                  placeholder="活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select
                  v-model="dialogForm.activeRegion"
                  placeholder="活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="适用机构：" prop="organization">
                <el-select
                  v-model="dialogForm.organization"
                  placeholder="请选择活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分支机构：" prop="organization">
                <el-transfer
                  filterable
                  :filter-method="filterMethod"
                  filter-placeholder="请输入城市拼音"
                  v-model="value2"
                  :data="data2"
                >
                </el-transfer>
              </el-form-item>
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
import AreaComponent from "../components/AreaComponents";
export default {
  name: "MedicalTerm",
  components: {
    AreaComponent,
  },
  data() {
    const generateData2 = (_) => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu",
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index],
        });
      });
      return data;
    };
    return {
      dialogFormVisible: false,
      ComboSerch: {
        comboName: "",
        province: "",
        city: "",
        applyOrgan: "",
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
      organData: [
        {
          id: "1",
          organ: "慈铭",
        },
        {
          id: "2",
          organ: "美年大健康",
        },
        {
          id: "3",
          organ: "中山三院",
        },
      ],
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
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      rules: {
        comboName: [
          { required: true, message: "请输入套餐名称", trigger: "blur" },
        ],
        comboId: [{ required: true, message: "请输入套餐Id", trigger: "blur" }],
        isEnable: [
          { required: true, message: "请点击是否启用", trigger: "change" },
        ],
        comboType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个适用标签",
            trigger: "change",
          },
        ],
        originalPrice: [
          { required: true, message: "请输入套餐原价", trigger: "blur" },
        ],
        sellingPrice: [
          { required: true, message: "请输入套餐售价", trigger: "blur" },
        ],
        activeRegion: [
          { required: true, message: "请选择适用城市", trigger: "change" },
        ],
        organization: [
          { required: true, message: "请选择适用机构", trigger: "change" },
        ],
        introduce: [
          { required: true, message: "请填写套餐介绍", trigger: "blur" },
        ],
        regulations: [
          { required: true, message: "请填写适用规则", trigger: "blur" },
        ],
        constitute: [
          { required: true, message: "请填写套餐组成", trigger: "blur" },
        ],
      },
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      provinceData: [
        {
          id: "1",
          province: "湖南省",
        },
        {
          id: "2",
          province: "广东省",
        },
      ],
      cityData: [
        {
          id: "1",
          city: "广州市",
        },
        {
          id: "2",
          city: "深圳市",
        },
      ],
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
.MedicalTerm {
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