function register(app) {
    var base = require('../controller/BaseController');
    app.use('/test', base);
    var base = require('../controller/serialPort');
    app.use('/serialPort', base);
    var base = require('../controller/websocket');
    app.use('/websocket', base);
}
exports.register = register;