const http = require('http');
const fs = require('fs')
const zlib = require('zlib');

const server = http.createServer((req, res) => {
	const rs = fs.createReadStream(`${req.url}`)
	
	res.setHeader('content-encoding', 'gzip')
	
	const gz = zlib.createGzip();
	rs.pipe(gz).pipe(res)
	
	rs.on('error', err => {
		res.writeHeader(404)
		res.write('Not Found')
		
		res.end();
	})
})

server.listen(8888)