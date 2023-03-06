const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);

class Server {
    constructor() {
        this.app = app;
        this.port = process.env.PORT || 3000;

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', require('../routes/pages'));
    }

    listen() {
        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;