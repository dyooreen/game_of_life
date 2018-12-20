socket = io.connect('http://localhost:3000');
var socket;
var statistics = {
    "timestamp": "",
    "Grass": [
        { "name": "Grass", "mul": "", "die": "" }
    ],
    "GrassEater": [
        { "name": "GrassEater", "mul": "", "die": "" }
    ],
    "Predator": [
        { "name": "Predator", "mul": "", "die": "" }
    ],
    "Devil": [
        { "name": "Devil", "mul": "", "die": "" }
    ],
    "God": [
        { "name": "God", "revive":"" }
    ]
}
var weather = 1;
var resolution = 30;
var matrix = matrix(resolution);
var grassArr = [];
var grassArrLength = 0;
var GrassEaterArr = [];
var PredatorArr = [];
var GodArr = [];
var SatanArr = [];
var DevilArr = [];
var AngelArr = [];
var canv = 800;
var side = canv / resolution;
function setup() {
    timer(5);
    frameRate(30);
    createCanvas(canv, canv);
    background(0);
    createObjects();
    noStroke();
}

function draw() {
    if(frameCount % 1000 == 0){
        statistics.timestamp = frameCount;
        socket.emit('send data', statistics);
    }
    ObjectFunctions();
    DrawMatrix();
}
const DrawMatrix = () => {
    for (var y in matrix) {
        for (var x in matrix) {
            if (matrix[y][x] == 0) {
                fill('grey');
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 1) {
                if (weather == 1) fill('#4ebc0f');
                else if (weather == 2) fill('#63f210');
                else if (weather == 3) fill('#c1f10f');
                else if (weather == 4) fill('#00ffd0');
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                if (weather == 4) fill('#ad2929');
                else fill('red');
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill(random(255), random(255), random(255));
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill(random(255));
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 6) {
                fill('black');
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 7) {
                fill('white');
                rect(x * side, y * side, side, side);
            }
        }
    }
}

function createObjects() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y);
                GrassEaterArr.push(gr);
            } else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y);
                PredatorArr.push(gr);
            } else if (matrix[y][x] == 4) {
                var gr = new God(x, y);
                GodArr.push(gr);
            } else if (matrix[y][x] == 5) {
                var gr = new Satan(x, y);
                SatanArr.push(gr);
            } else if (matrix[y][x] == 6) {
                var gr = new Devil(x, y);
                DevilArr.push(gr);
            } else if (matrix[y][x] == 7) {
                var gr = new Angel(x, y);
                AngelArr.push(gr);
            }
        }
    }
}

function ObjectFunctions() {
    for (var i in grassArr) {
        grassArr[i].weather();
    }
    for (var i in GrassEaterArr) {
        GrassEaterArr[i].eat();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].eat();
    }
    for (var i in GodArr) {
        GodArr[i].move();
    }
    for (var i in SatanArr) {
        SatanArr[i].eat();
    }
    for (var i in DevilArr) {
        DevilArr[i].move();
    }
    for (var i in AngelArr) {
        AngelArr[i].eat();
    }
}

function matrix(m) {
    var matrix = [];
    for (var i = 0; i < m; i++) {
        matrix.push([]);
        for (var j = 0; j < m; j++) {
            matrix[i][j] = Math.floor(Math.random() * 2);
        }
    }
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 2;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 7;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 4;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 5;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 6;
    return matrix;
}
const timer = (weatherTime) => {
    setInterval(() => {
        let id = $('#weather');
        weather++;
        if (weather > 4)
            weather = 1;
        switch (weather) {
            case 1: id.text("Weather -- Spring"); break;
            case 2: id.text("Weather -- Summer"); break;
            case 3: id.text("Weather -- Autumn"); break;
            case 4: id.text("Weather -- Winter"); break;
        }
    }, weatherTime * 1000);
}