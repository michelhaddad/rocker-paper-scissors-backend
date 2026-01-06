const {Server} = require("socket.io");
const registerGameHandlers = require('./gameHandler');

const createIoInstance = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "https://rock-paper-scissors-kappa-sand.vercel.app",
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    const onConnection = (socket) => {
        console.log(`Socket connected: ${socket.id}`)
        registerGameHandlers(io, socket);
    }

    io.on('connection', onConnection);

    return io
}

module.exports = {createIoInstance}
