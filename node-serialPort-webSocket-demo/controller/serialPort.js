import { openPort } from '../service/serialPort/openPort.js'
import { postPortData } from '../service/serialPort/postPortData.js'
import { getPortList } from '../service/serialPort/getPortList.js'
var express = require('express');
var router = express.Router();

class serialPort {
    // get方式
    static getRouter() {
        // 获取串口列表
        router.get('/portList', async (req, res) => {
            getPortList().then((result) => {
                var dataList = result
                res.json({ code: 200, msg: '获取串口列表成功', data: dataList });
            })
        })
        // 打开串口
        router.get('/openPort', async (req, res) => {
            openPort(req.query.getPortName, req.query.postPortName, parseInt(req.query.baudRate), parseInt(req.query.dataBits), parseInt(req.query.stopBits), req.query.parity)
            res.json({ msg: '打开串口成功' });
        })
        // 获取串口数据(暂无)
        router.get('/getData', async (req, res) => {
            res.json('result');
        })
        return router;
    }
    // post方式
    static postRouter() {
        // 发送串口数据
        router.post('/portData', async function (req, res) {
            postPortData(req.body.getPortName, req.body.postPortName, req.body.baudRate, req.body.dataBits, req.body.stopBits, req.body.parity, req.body.sendMsg).then((result) => {
                var data = result
                res.json({ code: 200, msg: '发送成功', data: { getList: data } });
            })
        })
        return router;
    }
}
module.exports = serialPort.getRouter()
module.exports = serialPort.postRouter()