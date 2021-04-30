var SerialPort = require('serialport')
export async function getPortList() {
  var dataList = []
  // 列出所有端口详细信息
  await SerialPort.list().then(ports => {
    ports.forEach((port) => {
      let data = {
        // vendorId: port.vendorId,
        // productId: port.productId,
        // serialNumber: port.serialNumber,
        path: port.path,
        manufacturer: port.manufacturer,
        pnpId: port.pnpId
      }
      dataList.push(data)
    });
  });
  return dataList;
}