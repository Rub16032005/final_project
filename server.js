


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
waterArr = [];
fireArr = [];
bombArr = [];
matrix = [];
//! Setting global arrays  -- END

//! hashivner -> creatingObjects (++) -> sendData
grassHashiv = 0;
grassEaterHashiv = 0;
grassEaterEaterHashiv = 0;
waterHashiv = 0;
fireHashiv = 0;
bombHashiv = 0;
//! hashivner

//! Creating MATRIX -- START
let random = require('./modules/random.js');
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, water, fire ,bomb) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < bomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(10, 5, 9 , 4 , 3 , 2 ,2);
//! Creating MATRIX -- END



//! Requiring modules  --  START
let Grass = require("./modules/Grass.js");
let GrassEater = require("./modules/GrassEater.js");
let GrassEaterEater = require("./modules/GrassEaterEater.js");
let Water = require("./modules/Water.js");
let Fire = require("./modules/Fire.js");
let Bomb = require("./modules/Bomb.js");
//! Requiring modules  --  END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');

});
server.listen(6400);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grassEaterEater = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(grassEaterEater);
                grassEaterEaterHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
                fireHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var bomb = new Bomb(x, y);
                bombArr.push(bomb);
                bombHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
        }
    }
}


creatingObjects()


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (grassEaterEaterArr[0] !== undefined) {
        for (var i in grassEaterEaterArr) {
            grassEaterEaterArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].eat();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }
    if (bombArr[0] !== undefined) {
        for (var i in bombArr) {
            bombArr[i].eat();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCount: grassHashiv,
        grassEaterCount: grassEaterHashiv,
        grassEaterEaterCount:grassEaterEaterHashiv,
        waterCount:waterHashiv,
        fireCount:fireHashiv,
        bombCount:bombHashiv
    };

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}




// setInterval(
function time() {
    for (let k = 0; k < 600; k++) {
        //summer
        if ((k > 2) && (k < 5)) {
            return setInterval(game, 500)
        }
        //winter
        if (k > 5) {
            return setInterval(game, 1000)
        }
        //spring-autumn
        else {
          return  setInterval(game, 8000);
        }
    }
}
setInterval( time ,500);
// }, 1000);

// setInterval(game, 200);