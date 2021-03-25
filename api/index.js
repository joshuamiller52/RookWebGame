import express from "express"
import bodyParser from "body-parser"
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});


const clientRooms = {};

io.on("connection", (socket) => {
    socket.on('createGame', () => {
        if (clientRooms[socket.id]) {
            socket.to(socket.id).emit({ errorCode: "GameAlreadyStarted", message: "There is already a game started for this client" })
        } else {
            clientRooms[socket.id] = {
                team1: [socket.id],
                team2: []
            }
        }
        console.log(JSON.stringify(clientRooms))
    })

    socket.on('joinGame', ({ gameId, teamId }) => {
        socket.join(gameId);
        clientRooms[gameId][teamId].push(socket.id);
        console.log(JSON.stringify(clientRooms))
    })

    socket.on('disconnect', () => {

    })
})



server.listen(port, () => console.log(`Server running on port : ${port}`))
