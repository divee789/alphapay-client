/* eslint-disable no-bitwise */
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const createServers = port => {
    const app = express();
    const server = require('http').createServer(app);
    const dir = path.resolve(__dirname, './build');

    app.use(compression());
    app.use(cors());
    app.options('*', cors());

    app.get(`*.js` | `*.svg` | `*.css` | `*.otf`, (req, res, next) => {
        req.url = `${req.url}.br`;
        res.set('Content-Encoding', 'br');
        next();
    });

    app.use(express.static(dir));

    app.get('*', (req, res) => {
        res.sendFile(`${dir}/index.html`);
    });

    server.listen(port, () => console.log('🥁 server running '));
};

module.exports = createServers;
