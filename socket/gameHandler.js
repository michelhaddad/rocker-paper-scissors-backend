module.exports = (io, socket) => {
    const joinGame = (gameId) => {
        console.log(`Socket ${socket.id} joined the game ${gameId}`)
        socket.to(gameId).emit('game:start', {creator: gameId, joiner: socket.id})
    }

    const createGame = () => {
        console.log(`Socket ${socket.id} created the game ${socket.id}`)
    }

    const informAdversaryOfShape = ({to, shape}) => {
        console.log(`Socket ${socket.id} sends ${to} the shape ${shape}`)
        socket.to(to).emit('game:opponent-shape', shape)
    }

    const playAgain = ({to}) => {
        console.log(`Socket ${socket.id} wants to play again with ${to}`)
        socket.to(to).emit('game:opponent-play-again')
    }

    socket.on('game:join', joinGame);
    socket.on('game:create', createGame);
    socket.on('game:inform-shape', informAdversaryOfShape)
    socket.on('game:play-again', playAgain)
}