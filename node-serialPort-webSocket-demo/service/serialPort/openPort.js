export async function openPort(getPortName, postPortName, baudRate, dataBits, stopBits, parity) {
    var SerialPort = require('serialport')
    // 设置串口属性
    let getSerialPort = setPort(getPortName, baudRate, dataBits, stopBits, parity)
    let postSerialPort = setPort(postPortName, baudRate, dataBits, stopBits, parity)
    // 开启串口
    await startPort(getSerialPort, getPortName);
    // await startPort(postSerialPort, postPortName);

    // getSerialPort.close()
    // postSerialPort.close()

    // 开启串口方法
    function startPort(serialPort, portName) {
        serialPort.open((error) => {
            if (error) {
                console.log("打开端口" + portName + "错误：" + error);
            } else {
                console.log('打开端口' + portName + '成功');
                serialPort.close();
            }
        });
    }
    // 设置串口属性
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