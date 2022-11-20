class Devil extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.multiply = 0;
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
    move(m=1) {
        this.multiply++;
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= m) {
            
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 6;
            this.multiply = 0;
        }
    }
    weather(){
        if(weather == 4) this.move(100)
        else if(weather == 3) this.move(5)
        else if(weather == 2) this.move(2)
        else this.move();
    }
    eat() {
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            for (var i in GrassEaterArr) {
                if (newCell[0] == GrassEaterArr[i].x && newCell[1] == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 6;
        } else {
            this.move();
        }

    }
}