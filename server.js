const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Messages service endpoint
const messages = [
    {name: "Sunkanmi", message: "Hey! What's up?"},
    {name: "Yinka", message: "Hey! What's up?"}
];

app.get("/messages", (req, res) =>{
    res.send(messages);
})

app.post("/messages", (req, res) =>{
    messages.push(req.body);
    io.emit("message", req.body);
    res.sendStatus(200);
})

io.on("connection", (socket) => {
    console.log("A user connected!");
})

// To listen to a change on the server once deployed
const server = http.listen(3000, () => {
    console.log("Server is listening on port", server.address().port);
});
