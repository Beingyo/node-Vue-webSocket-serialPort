import request from '@/utils/request'

const webSocket = {
  // 获取串口列表
  getPortList() {
    return request({
      url: '/serialPort/portList',
      method: 'get'
    })
  },
  // 打开串口
  getOpenPort(dataList) {
    return request({
      url: '/serialPort/openPort',
      method: 'get',
      params: dataList
    })
  },
  // 发送串口数据
  postPortData(dataList) {
    return request({
      url: '/serialPort/portData',
      method: 'post',
      data: dataList
    })
  }
}

export default webSocket

