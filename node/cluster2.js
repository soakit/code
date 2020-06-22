const cluster = require('cluster');
const os = require('os')

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        const worker = cluster.fork();
        worker.send('hi there');
        worker.on('message', msg => {
            console.log(`msg: ${msg} from worker#${worker.id}`);
        });
    }
} else if (cluster.isWorker) {
    process.on('message', (msg) => {
        process.send(msg);
    });
}