const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const dbUrl = ""

const Message = mongoose.model("Message", {
    name: String,
    message: String
})

// Messages service endpoint
const messages = [
    {name: "Sunkanmi", message: "Hey! What's up?"},
    {name: "Yinka", message: "Hey! What's up?"}
];

app.get("/messages", (req, res) =>{
    res.send(messages);
})

app.post("/messages", (req, res) =>{
    const message = new Message(req.body);

    message.save((err) => {
        if(err){
            sendStatus(500);    
        }

        MessageChannel.findOne({message: 'badword'}, (err, censored) => {
            if(censored){
                console.log("Censored words found", censored);
                Message.remove({_id: censored.id}, (err) => {
                    console.log("Removed censored message.");
                })
            }
        })
    })

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
