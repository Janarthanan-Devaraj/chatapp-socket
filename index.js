let express = require("express");
let http = require("http");
let cors = require("cors");
let bodyParser = require("body-parser");
const { Server } = require("socket.io")
let path = require("path");

const port = 9000

app = express();

const server = http.createServer(app);

app.use(cors())

app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
})

app.post("/server", (req, res) => {
  io.emit("command", req.body);
  console.log(req.body);
  res.status(201).json({status: "reached" });
});


io.on("connection", (socket) => {
    socket.on("command",function (data) {
      io.emit("command", data);
      console.log(data)
    });
});

server.listen(port, () => {
  console.log("SERVER RUNNING")
});