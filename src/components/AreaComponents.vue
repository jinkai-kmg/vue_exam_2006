<template>
  <div class="AreaComponent">
    <el-form-item prop="province">
      <el-select v-model="ComboSerch.province" multiple placeholder="全部">
        <el-option
          v-for="(item, index) in provinceData"
          :key="index"
          :label="item.province"
          :value="item.province"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="city">
      <el-select
        v-model="ComboSerch.city"
        multiple
        collapse-tags
        style="margin-left: 20px"
        placeholder="全部"
      >
        <el-option
          v-for="(item, index) in cityData"
          :key="index"
          :label="item.city"
          :value="item.city"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "AreaComponent",
  props: {
    provinceData: {
      type: Array,
      required: true,
      default: [
        {
          id: "1",
          province: "湖南省",
        },
        {
          id: "2",
          province: "广东省",
        },
      ],
    },
    cityData: {
      type: Array,
      required: true,
      default: [],
    },
    ComboSerch: {
      type: Object,
      required: true,
      default: {},
    },
  },
};
</script>

<style>
</style>