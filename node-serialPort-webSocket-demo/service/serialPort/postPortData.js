export async function postPortData(getPortName, postPortName, baudRate, dataBits, stopBits, parity, sendMsg) {
  var SerialPort = require('serialport')
  var result = {
    postDate: '',
    sendData: sendMsg,
    getDate: '',
    receiveData: ''
  }
  // 设置串口属性
  let getSerialPort = setPort(getPortName, baudRate, dataBits, stopBits, parity)
  let postSerialPort = setPort(postPortName, baudRate, dataBits, stopBits, parity)
  await starPort().then(res => {
    // 数据Buffer转String
    // result = res.toString()
    // 关闭串口
    getSerialPort.close()
    postSerialPort.close()
  }).catch(res => { // 打开错误
    console.log(res)
  });
  // 返回接收数据值
  return result
  // 启动串口
  function starPort() {
    return new Promise((resolve, reject) => {
      // 打开接收串口
      getSerialPort.open((error) => {
        if (error) {
          reject("打开端口错误：" + getPortName + "错误：" + error);
        } else {
          // 打开发送串口
          postSerialPort.open((error) => {
            if (error) {
              reject("打开端口错误：" + getPortName + "错误：" + error);
            } else {
              var msgLength = -1
              // 开启监听
              getSerialPort.on('data', (data) => {
                result.receiveData = result.receiveData.concat(data.toString())
                if (result.receiveData.length === msgLength) {
                  result.getDate = new Date(+new Date(new Date()) + 8*3600*1000).toISOString().replace(/T/g,' ').replace(/Z/, '')
                  resolve(result)
                }
              })
              postSerialPort.write(sendMsg, (error) => {
                if (error) {
                  reject("发送错误" + error)
                } else {
                  result.postDate = new Date(+new Date(new Date()) + 8*3600*1000).toISOString().replace(/T/g,' ').replace(/Z/, '')
                  msgLength = sendMsg.length
                }
              })
            }
          });
        }
      });
    })
  }

  function setPort(portName, baudRate, dataBits, stopBits, parity) {
    var serialPort = new SerialPort( //设置串口属性
      portName, {
      baudRate: baudRate,  //波特率
      dataBits: dataBits,    //数据位
      stopBits: stopBits,  //停止位
      parity: parity,  //奇偶校验
      //flowControl: false ,
      autoOpen: false //不自动打开
    }, false);
    return serialPort
  }
}