<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><span id="demo1" @click="routeLink">串口收发数据</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo2" @click="routeLink">WebSocket调试</span></div></el-col>
      <!-- <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="sortable" @click="routeLink">拖拽表格</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="elSearchLoad" @click="routeLink">el搜索联想</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="tableHeadTouch" @click="routeLink">el表头触摸</span></div></el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    routeLink(e) {
      console.log(e.currentTarget.id)
      this.$router.push({path:'/' + e.currentTarget.id})
    }
  }
}
</script>


<style lang="scss" scoped>
  span {
    line-height: 36px;
    cursor:pointer;
    color: #3a97fa;
  }
.el-row {
  margin: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  text-align: center;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #eaf0f5;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>