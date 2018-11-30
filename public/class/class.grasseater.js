class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.multiply = 0;
        this.gender = floor(random(2));
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    eat() {
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.energy++;
            statistics.Grass[0].die++;
            this.mul();
        } else {
            this.weather();
        }
    }
    weather() {
        if (weather == 4) this.move(100)
        else if (weather == 3) this.move(5)
        else if (weather == 2) this.move(2)
        else this.move();
    }
    move(m = 1) {
        this.multiply++;
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= m) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.energy--;
            this.multiply = 0;
            this.die();
        }
    }
    die() {
        if (this.energy <= 0) {
            for (var i in GrassEaterArr) {
                if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 0;
            statistics.GrassEater[0].die++;
        }
    }
gender(){
    if(this.gender === 0){
        this.mul(0)
    }else{
        this.mul(1);
    }
}
    mul(m) {
        if(m === 0){
            var newCell = random(this.chooseCell(0));
            if (this.multiply >= 5 && newCell) {
                grassArrLength++;
                var newGrass = new GrassEater(newCell[0], newCell[1]);
                GrassEaterArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 2;
                this.multiply = 0;
                statistics.GrassEater[0].mul++;
            }
        }
        else{
            if (this.energy >= 4) {
                this.energy = 1;
                setTimeout(() => {
                    
                    for(var i in GrassEaterArr){
                        var mul = random(this.chooseCell(1));
                        if(mul[0] == GrassEaterArr[i].y && mul[1] == GrassEaterArr[i].x){
                            var newCell = random(this.chooseCell(0));
                            if (newCell) {
                                matrix[newCell[1]][newCell[0]] = 2;
                                var gr = new GrassEater(newCell[0], newCell[1]);
                                GrassEaterArr.push(gr);
                                statistics.GrassEater[0].mul++;
                            }
                        }
                    }
                    
                }, 4000)
    
            }
        }
        
    }
}