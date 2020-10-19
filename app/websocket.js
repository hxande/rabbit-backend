const socketio = require('socket.io')(https);

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