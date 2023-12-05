const express = require('express');
const path = require('path');
var app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, './public')))

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// ADMIN PART OF THE CODE START
app.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname, './public/admin.html'));
});
//ADMIN PART OF CODE END

app.listen(port, function () {
    console.log("listening to port: " + port);
});