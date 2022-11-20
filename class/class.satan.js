class Satan extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 0;
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
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }
  eat() {
    this.getNewCoordinates();
    var newCell = random(this.chooseCell(2));
    if (newCell) {
      for (var i in GrassEaterArr) {
        if (
          newCell[0] == GrassEaterArr[i].x &&
          newCell[1] == GrassEaterArr[i].y
        ) {
          GrassEaterArr.splice(i, 1);
          break;
        }
      }
      matrix[this.y][this.x] = 0;
      this.x = newCell[0];
      this.y = newCell[1];
      matrix[this.y][this.x] = 5;
      this.energy++;
      this.mul();
    } else {
      this.move();
    }
  }
  mul() {
    this.getNewCoordinates();
    var newCell = random(this.chooseCell(0));
    if (newCell && this.energy >= 10) {
      var gr = new Devil(newCell[0], newCell[1]);
      DevilArr.push(gr);
      matrix[newCell[1]][newCell[0]] = 6;
      this.energy = 0;
    } else {
      this.eat();
    }
  }
  move() {
    this.getNewCoordinates();
    var newCell = random(this.chooseCell(0));
    if (newCell) {
      matrix[this.y][this.x] = 0;
      this.x = newCell[0];
      this.y = newCell[1];
      matrix[this.y][this.x] = 5;
    }
  }
}
