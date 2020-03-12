const express = require('express');

const app = express();

app.use(express.static(__dirname))

// To listen to a change on the server once deployed
const server = app.listen(3000, () => {
    console.log("Server is listening on port", server.address().port);
});
