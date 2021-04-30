
var websock = null;
var global_callback = null;
var serverPort = '10202';	//webSocket连接端口
 
 
function getWebIP(){
    // var curIP = window.location.hostname;
    var curIP = 'http://127.0.0.1';
	return curIP;
}
 
function initWebSocket(){ //初始化weosocket
    //ws地址
    var wsuri = "ws://" +getWebIP()+ ":" + serverPort;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
    	onMessage(e);
    } 
    websock.onclose = function(e){
    	onClose(e);
    }
    websock.onopen = function () {
	    onOpen();
	}
    
    //连接发生错误的回调方法
	websock.onerror = function () {
		console.log("WebSocket连接发生错误");
	}
}
 
// 实际调用的方法
function sendSock(agentData,callback){  
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
    	//若是ws开启状态
        onSend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
    	// 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
        	sendSock(agentData,callback);
        }, 1000);
    }else {
    	// 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}
 
//数据接收
function onMessage(e){ 
    global_callback(JSON.parse(e.data));
}
 
//数据发送
function onSend(agentData){
    websock.send(JSON.stringify(agentData));
}
 
//关闭
function onClose(e){  
    console.log("connection closed (" + e.code + ")");
}
 
function onOpen(e){
	console.log("连接成功");
}
 
initWebSocket();
 
export{ sendSock }