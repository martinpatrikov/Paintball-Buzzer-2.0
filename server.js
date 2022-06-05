const fs = require('fs');
const net = require('net');
// Express server

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
app.use(express.static('src'));
app.use('/fonts', express.static('fonts'));
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    return res.sendFile("/index.html");
});

app.get('/stop', (req, res) => {
    io.emit('btn');
});

server.listen(port, () => {
    console.log('listening on *:3000');
});

// Socket.io server

const {
    Server
} = require("socket.io");
const io = new Server(server);
// io.emit("btn");



// TCP connection

// const client = new net.Socket();
// client.connect(8888, '192.168.100.57', function () {
//     console.log('Connected');
//     client.write('Hello, server! Love, Client.');
// });

// client.on('data', function (data) {
//     console.log('Received: ' + data);
//     if (data == 'btn') {
//         console.log("emitting event to client");
//         io.emit("btn");
//     }
// });

// client.on('close', function () {
//     console.log('Connection closed');
// });