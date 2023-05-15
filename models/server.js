const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server: Socket } = require('socket.io');
const io = new Socket(server);

class Server {
    constructor() {
        this.app = app;
        this.io = io;
        this.port = process.env.PORT || 3000;

        this.middlewares();

        this.socket();
    }

    socket() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado', socket.id);

            socket.on("move", (user) => {
                let { coords, username, color } = user;

                socket.broadcast.emit("move", { username, coords, color, id: socket.id });
            });

            socket.on('disconnect', () => {
                socket.broadcast.emit("offline-user", {id: socket.id});
            });
        });
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    listen() {
        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;