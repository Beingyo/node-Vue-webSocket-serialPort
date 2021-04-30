/**
 api接口的统一出口
 */
// 首页数据接口
import serialPort from './serialPort'
import webSocket from './webSocket'
// 导出接口
export default {
  serialPort,
  webSocket
}
