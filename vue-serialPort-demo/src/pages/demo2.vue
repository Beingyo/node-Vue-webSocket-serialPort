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
      <br />
      <el-form-item v-show="!isOpen">
        <el-button type="primary" @click="openPort">打开串口</el-button>
      </el-form-item>
      <el-form-item v-show="isOpen">
        <el-button type="primary" @click="closePort">关闭串口</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clearData">清空数据</el-button>
      </el-form-item>
      <br />
      <el-form-item label="接收指令">
        <div class="recive-box">
          <p>{{ num }}</p>
          <div v-for="(item, index) in getList" :key="index">
            <!-- <p class="get-date">[{{ item.getDate }}] - 接收：</p>
            <p class="get-msg">{{ item.receiveData }}</p> -->
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
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        sendMsg: ""
      },
      sendType: 1,
      sendData: { sendType: "", dataList: "" },
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
      getList: [],
      isOpen: false,
      num: 0,
      wsCfg: {
        // websocket地址
        url: "ws://localhost:10202/websocket/connect"
      }
    };
  },
  mounted() {
    // window.addEventListener("beforeunload", e => this.closePort(e));
    window.onbeforeunload = () => {
      this.closePort();
      return "tips";
    };
  },
  created() {
    this.$api.serialPort
      .getPortList()
      .then(res => {
        this.portOption = res.data;
        this.dataList.getPortName = this.portOption[0].path;
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
  methods: {
    // 打开串口
    openPort() {
      var socket = new WebSocket(this.wsCfg.url);
      socket.onopen = () => {
        this.sendType = 1;
        this.sendData.dataList = this.dataList;
        this.sendData.sendType = this.sendType;
        socket.send(JSON.stringify(this.sendData));
      };
      socket.onmessage = e => {
        var getList = JSON.parse(e.data);
        console.log(getList);
        this.getList = this.getList.concat(getList);
        this.num = this.num + 1;
      };
      this.isOpen = true;
    },
    // 关闭串口
    closePort() {
      var socket = new WebSocket(this.wsCfg.url);
      socket.onopen = () => {
        this.sendType = 0;
        this.sendData.sendType = this.sendType;
        socket.send(JSON.stringify(this.sendData));
      };
      socket.onclose = e => {
        console.log("WebSocket连接已关闭");
      };
      setTimeout(() => {
        socket.close();
        this.isOpen = false;
      }, 100);
    },
    // 清空数据
    clearData() {
      this.getList = [];
      this.num = 0;
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
