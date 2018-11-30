const express = require('express')
const app = express()
const server = app.listen(3000);
const fs = require('fs');
var statData = [];
if (fs.existsSync("public/data.json")) {
    var statData = require("./public/data.json");
}
app.use(express.static('public'));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));
const socket = require('socket.io');
const io = socket(server);
app.get('/', function (req, res) {
    res.redirect('index.html');
});
app.get('/stats', function (req, res) {
    res.redirect('stats.html');
});
io.sockets.on('connection', socket => {
    console.log("New Connection " + socket.id);
    socket.on("send data", function (data) {
        statData.push(data);
        fs.writeFile('public/data.json', JSON.stringify(statData),err =>{});
    })
    socket.on("get stats", function (err) {
        fs.readFile('public/data.json', "utf8", function (err, statisticsFromFile) {
            socket.emit("send stats", statisticsFromFile);
        });

    })
})

