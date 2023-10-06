const app = require('./app.js')

const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
require('dotenv').config();

require('./sockets')(io)


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}.`);
});