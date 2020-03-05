const cluster = require('cluster');
const numCPUS = require('os');
const createApp = require('./server');
require('dotenv').config();

const numberOfCores = numCPUS.cpus().length;

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

if (cluster.isMaster) {
    let index = 0;
    for (index; index < numberOfCores; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    process.on('message', message => {
        if (message.type === 'shutdown') {
            process.exit(0);
        }
    });

    const port = normalizePort(process.env.ALPHAPAY_APP_PORT || '5100');
    createApp(port);
}
