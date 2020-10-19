const socketio = require('socket.io');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        const { usuario } = socket.handshake.query;
        connections.push({
            id: socket.id,
            usuario,
        });

        io.on("disconnect", () => console.log("Client disconnected"));
    });
};

exports.findConnections = (usuario) => {
    return connections.filter(connection => {
        return connection.usuario == usuario;
    });
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
};