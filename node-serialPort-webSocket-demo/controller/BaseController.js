var express = require('express');
var router = express.Router();

class BaseController {

    static getRouter() {
        let result = {
            code: 0,
            msg: "",
            data: [],
        }
        router.get('/getInfo', async function (req, res) {
            result["code"] = 0;
            result["msg"] = "get请求";
            res.json(result);
        })
        return router;
    }

    static postRouter() {
        router.post('/postInfo', async (req, res) => {
            res.json({ json: req.body });
        })
        return router;
    }
}
module.exports = BaseController.getRouter()
module.exports = BaseController.postRouter()