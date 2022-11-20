class Angel extends LivingCreature {
  constructor(x, y) {
    super(x, y);
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
    return super.chooseCell(character);
  }
  move() {
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
      matrix[this.y][this.x] = 7;

      this.die();
    }
  }
  eat() {
    this.getNewCoordinates();
    var newCell = random(this.chooseCell(6));
    if (newCell) {
      for (var i in DevilArr) {
        if (newCell[0] == DevilArr[i].x && newCell[1] == DevilArr[i].y) {
          DevilArr.splice(i, 1);
          break;
        }
      }
      matrix[this.y][this.x] = 0;
      this.x = newCell[0];
      this.y = newCell[1];
      matrix[this.y][this.x] = 7;
      this.die();
    } else {
      this.move();
    }
  }
  die() {
    if (DevilArr.length <= 0) {
      for (var i in AngelArr) {
        if (this.x == AngelArr[i].x && this.y == AngelArr[i].y) {
          AngelArr.splice(i, 1);
          break;
        }
      }
      matrix[this.y][this.x] = 0;
    }
  }
}
