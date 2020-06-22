const zlib = require('zlib')
const fs = require('fs')

const rs = fs.createReadStream('jquery.js')
const ws = fs.createWriteStream('jquery.js.gz')

const gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);
