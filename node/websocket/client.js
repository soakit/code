const sock = new WebSocket('ws://localhost:8888');

sock.onopen = function(){
	alert('连接上了')
}
sock.onmessage = function(){
	alert('有消息过来')
}
sock.onclose = function(){
	alert('断开了')
}