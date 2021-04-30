import { wsConnect } from '../service/websocket/wsConnect.js'
var SerialPort = require('serialport')
var express = require('express');
const expressWs = require('express-ws')
var router = express.Router();
expressWs(router);

var result = {
  getDate: '',
  receiveData: ''
}

var serialPort = ''
var dataValue = ''
var concatValue = ''
var dataLength = 0

class websocket {
  // get方式
  static getRouter() {
    // 获取串口数据(暂无)
    router.ws('/connect', (ws, req) => {
      ws.on('message', (message) => {
        console.log('打开串口成功！！')
        message = JSON.parse(message)
        if (message.sendType === 1) {  // 打开串口
          var msg = message.dataList
          serialPort = new SerialPort( //设置串口属性
            msg.getPortName, {
            baudRate: msg.baudRate,  //波特率
            dataBits: msg.dataBits,    //数据位
            stopBits: msg.stopBits,  //停止位
            parity: msg.parity,  //奇偶校验
            //flowControl: false ,
            autoOpen: false //不自动打开
          }, false);

          serialPort.open((error) => {
            if (error) {
              console.log("打开端口" + msg.getPortName + "错误：" + error);
            } else {
              console.log('打开端口' + msg.getPortName + '成功');
              // 监听数据
              serialPort.on('data', (data) => {
                if (data.toString().indexOf('\n') >= 0) { // 有换行符
                  dataLength = data.toString().indexOf('\n')  // 获取第一个换行符的下标
                  concatValue = data.toString().slice(0, data.toString().indexOf('\n') - 1)
                  if (data.toString().slice(dataLength +1, data.toString().length).indexOf('\n') >= 0) { // 有两个换行符
                    // console.log('2个换行符')
                    if (dataLength === 0) { // 换行符在首  0a开头情况
                      dataValue = dataValue.slice(0, dataValue.length - 1)  // 去除末尾的0d
                      // result.receiveData = dataValue
                    } else if (dataLength > 1) { 
                      dataValue = dataValue.concat(concatValue)
                    } else {  // 换行符在第二位
                      // result.receiveData = dataValue
                    }
                    // 发送第一轮数据
                    result.receiveData = dataValue
                    ws.send(JSON.stringify(result))
                    // 发送第二轮数据
                    dataValue = data.toString().slice(dataLength + 1, data.toString().slice(dataLength, data.toString().length).indexOf('\n') - 2)
                    result.receiveData = dataValue
                    ws.send(JSON.stringify(result))
                    // 清理数据
                    dataValue = ''
                  } else {
                    // console.log('只有1个换行符')
                    if (dataLength === 0) { // 换行符在首  0a开头情况
                      dataValue = dataValue.slice(0, dataValue.length - 1)  // 去除末尾的0d
                      // result.receiveData = dataValue
                    } else if (dataLength > 1) { 
                      dataValue = dataValue.concat(concatValue)
                    } else {  // 换行符在第二位
                      // result.receiveData = dataValue
                    }
                    result.receiveData = dataValue
                    ws.send(JSON.stringify(result))
                    // 保存剩余的数据
                    dataValue = data.toString().slice(dataLength + 1, data.toString().length)
                  }
                } else {  // 无换行符
                  // 保存数据
                  dataValue = dataValue.concat((data.toString()))
                }
              })
            }
          });
        } else {
          // 关闭串口
          serialPort.close();
        }
      });
    })
    router.ws('/test', (ws, req) => {
      ws.send('连接成功')
      ws.on('message', (message) => {
        console.log('接收数据：' + message)
      })
      let interval
      interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          ws.send(Math.random().toFixed(2))
        } else {
          clearInterval(interval)
        }
      }, 1000)

      ws.on('message', msg => {
        ws.send(msg)
      })
    })
    return router;
  }
}
module.exports = websocket.getRouter()