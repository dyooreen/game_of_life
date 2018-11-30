class Predator extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 16;
        this.multiply = floor(random(10));
        this.directions = [];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    eat() {
        this.multiply++;
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(2));
        if (newCell && this.multiply < 8) {
            for (var i in GrassEaterArr) {
                if (newCell[0] == GrassEaterArr[i].x && newCell[1] == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.energy++;
            this.multiply = this.multiply = 0;
            statistics.Predator[0].mul++;
            this.mul();
        } else {
            this.weather();
        }
    }
    weather() {
        if (weather == 4) this.move(100);
        else if (weather == 3) this.move(15);
        else if (weather == 2) this.move(5);
        else this.move()

    }
    move(m = 8) {
        this.multiply++;
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply > m) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.energy -= 3;
            this.multiply = 0;
            this.die();
        }
        else{
            this.energy--;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 40) {
            matrix[newCell[1]][newCell[0]] = 3;
            var gr = new Predator(newCell[0], newCell[1]);
            PredatorArr.push(gr);
        } else {
            this.move();
        }
    }
    die() {
        if (this.energy <= 0) {
            for (var i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 0;
            statistics.Predator[0].die++;
        }
    }
}