const net = require('net'); // tcp
const crypto = require('crypto');

const server = net.createServer(sock => {
	console.log('connected...')
		
	// 只握手一次
	sock.once('data', data => {
		console.log('hand shake...')
		
		const headers = {}
		const str = data.toString() // 报文
		let lines = str.split('\r\n');
		
		// 舍弃第一行和最后两行(\r\n\r\n)
		lines = lines.slice(1, lines.length - 2)
		lines.forEach(line => {
			const [key, value] = line.split(': ')
			headers[key.toLowerCase()] = value;
		})		
		// console.log(headers)
		
		if (headers['upgrade'] !== 'websocket') {
			console.log('其他协议', headers['upgrade'])
			sock.end()
		} else if (headers['sec-websocket-version'] !== '13') {
			console.log('版本不对', headers['sec-websocket-version'])
		} else {
			const key = headers['sec-websocket-key']
			const mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
			
			// sha1(key+mask) -> base64 -> client
			const hash = crypto.createHash('sha1');
			hash.update(key + mask)
			const key2 = hash.digest('base64')
			
			sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${key2}\r\n\r\n`)
			
			console.log('hand shake end')

			// 数据过来
			sock.on('data', data => {
				
			})
		}
	})
	sock.on('end', () => {
		console.log('disconnect')
	})
})

server.listen(8888)




















