let LiveForm = require("./LiveForm.js");
let random = require("./random.js");




module.exports = class Bomb extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 19;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 6, this.y - 4],
            [this.x - 4, this.y - 2],
            [this.x + 2, this.y - 4],
            [this.x + 4, this.y - 6],
            [this.x + 4, this.y + 2],
            [this.x + 6, this.y + 4],
            [this.x - 6, this.y + 4],
            [this.x - 4, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            bombHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            let bomb = new Bomb(x, y);
            bombArr.push(bomb);
            this.life = 7;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life+=10;// karam 4 dnem
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            matrix[this.y][this.x] = 1;

            // matrix[this.y][this.x] = 2;
            // matrix[this.y][this.x] = 3;
            // matrix[this.y][this.x] = 4;


            for (let i in grassEaterEaterArr) {
                if (grassEaterEaterArr[i].x == x && grassEaterEaterArr[i].y == y) {
                    grassEaterEaterArr.splice(i, 1)
                }
            }

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            // for (let i in grassArr) {
            //     if (grassArr[i].x == x && grassArr[i].y == y) {
            //         grassArr.splice(i, 1)
            //     }
            // }


            this.x = x;
            this.y = y;

            if (this.life >= 21) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 4 || this.life >= 40) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in bombArr) {
            if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                bombArr.splice(i, 1)
            }
        }
    }
};