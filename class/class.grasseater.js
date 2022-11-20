class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 8;
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
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
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
      this.mul();
    } else {
      this.weather();
    }
  }
  weather() {
    if (weather == 4) this.move(20);
    else if (weather == 3) this.move(5);
    else if (weather == 2) this.move(2);
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
      this.mul();
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
    }
  }
  mul() {
    var newCell = random(this.chooseCell(0));
    if (this.energy >= 12 && newCell) {
      grassArrLength++;
      var newGrass = new GrassEater(newCell[0], newCell[1]);
      GrassEaterArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = 2;
      this.energy = 0;
    }
  }
}
