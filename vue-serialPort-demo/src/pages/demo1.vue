<template>
  <div class="content">
    <el-form :inline="true" :model="dataList" label-position="right">
      <el-form-item label="接收串口号">
        <el-select v-model="dataList.getPortName" placeholder="串口号">
          <el-option
            v-for="(item, index) in portOption"
            :key="index"
            :label="item.path"
            :value="item.path"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发送串口号">
        <el-select v-model="dataList.postPortName" placeholder="串口号">
          <el-option
            v-for="(item, index) in portOption"
            :key="index"
            :label="item.path"
            :value="item.path"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="波特率">
        <el-select v-model="dataList.baudRate" placeholder="波特率">
          <el-option
            v-for="(item, index) in baudRateOption"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="数据位">
        <el-select v-model="dataList.dataBits" placeholder="数据位">
          <el-option
            v-for="(item, index) in dataBitsOption"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停止位">
        <el-select v-model="dataList.stopBits" placeholder="停止位">
          <el-option
            v-for="(item, index) in stopBitsOption"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="校验位">
        <el-select v-model="dataList.parity" placeholder="校验位">
          <el-option
            v-for="(item, index) in parityOption"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openPort">打开串口</el-button>
      </el-form-item>
      <br />
      <el-form-item label="指令">
        <el-input v-model="dataList.sendMsg"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage">发送指令</el-button>
      </el-form-item>
      <br />
      <el-form-item label="接收指令">
        <div class="recive-box">
          <div v-for="(item, index) in getList" :key="index">
            <p class="post-date">[{{ item.postDate }}] - 发送：</p>
            <p class="post-msg">{{ item.sendData }}</p>
            <p class="get-date">[{{ item.getDate }}] - 接收：</p>
            <p class="get-msg">{{ item.receiveData }}</p>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      dataList: {
        getPortName: "",
        postPortName: "",
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        sendMsg: ""
      },
      portOption: [],
      baudRateOption: [
        { label: 600, value: 600 },
        { label: 1200, value: 1200 },
        { label: 2400, value: 2400 },
        { label: 4800, value: 4800 },
        { label: 9600, value: 9600 },
        { label: 14400, value: 14400 },
        { label: 19200, value: 19200 },
        { label: 38400, value: 38400 },
        { label: 56000, value: 56000 },
        { label: 57600, value: 57600 },
        { label: 115200, value: 115200 }
      ],
      dataBitsOption: [
        { label: 5, value: 5 },
        { label: 6, value: 6 },
        { label: 7, value: 7 },
        { label: 8, value: 8 }
      ],
      stopBitsOption: [
        { label: 1, value: 1 },
        { label: 1.5, value: 1.5 },
        { label: 2, value: 2 }
      ],
      parityOption: [{ label: "none", value: "none" }],
      getList: []
    };
  },
  created() {
    this.$api.serialPort
      .getPortList()
      .then(res => {
        this.portOption = res.data;
        this.dataList.getPortName = this.portOption[0].path
        this.dataList.postPortName = this.portOption[1].path
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
  methods: {
    // 打开串口
    openPort() {
      this.$api.serialPort
        .getOpenPort(this.dataList)
        .then(res => {
          this.$message.success(res.msg);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 发送指令
    sendMessage() {
      this.$api.serialPort
        .postPortData(this.dataList)
        .then(res => {
          this.getList = this.getList.concat(res.data.getList);
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  width: 1000px;
  // margin: 0 auto;
}
.recive-box {
  width: 1000px;
  height: 600px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: auto;
  p {
    margin: 0;
    height: 25px;
    line-height: 25px;
    padding: 5px 20px 0;
  }
  .post-date,
  .get-date {
    font-size: 12px;
    color: #606266;
  }
  .post-msg,
  .get-msg {
    font-size: 14px;
    color: #000000;
  }
}
</style>
