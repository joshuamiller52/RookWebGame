import express from "express"
import bodyParser from "body-parser"
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = new Server(server);

io.on("connection", (socket) => {

})

server.listen(port, () => console.log(`Server running on port : ${port}`))
