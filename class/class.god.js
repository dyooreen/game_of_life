class God extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.multiply = floor(random(4));
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 2],
      [this.x + 1, this.y - 2],
      [this.x - 2, this.y - 1],
      [this.x + 2, this.y - 1],
      [this.x - 2, this.y + 1],
      [this.x + 2, this.y + 1],
      [this.x - 1, this.y + 2],
      [this.x + 1, this.y + 2],
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    var found = [];
    return super.chooseCell(character);
  }
  move() {
    this.revive();
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
      matrix[this.y][this.x] = 4;
    }
  }

  revive() {
    this.multiply++;
    var rx = floor(random(resolution[1]));
    var ry = floor(random(resolution[0]));
    if (grassArr.length == 0 && matrix[ry][rx] == 0) {
      matrix[ry][rx] = 1;
      var gr = new Grass(rx, ry);
      grassArr.push(gr);
    }
    if (
      GrassEaterArr.length <= 2 &&
      matrix[ry][rx] == 1 &&
      this.multiply >= 20
    ) {
      this.multiply = 0;
      for (var i in grassArr) {
        if (rx == grassArr[i].x && ry == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      matrix[ry][rx] = 2;
      var gr = new GrassEater(rx, ry);
      GrassEaterArr.push(gr);
    }

    if (PredatorArr.length < 2 && matrix[ry][rx] == 0 && this.multiply >= 5) {
      matrix[ry][rx] = 3;
      var gr = new Predator(rx, ry);
      PredatorArr.push(gr);
    }
    if (DevilArr.length >= 3 && matrix[ry][rx] == 0) {
      for (var i = 0; i < 3; i++) {
        matrix[ry][rx] = 7;
        var gr = new Angel(rx, ry);
        AngelArr.push(gr);
      }
    }
    for (var i in GrassEaterArr) {
      if (GrassEaterArr[i].gender == 0) {
        if (matrix[ry][rx] == 0) {
          matrix[ry][rx] = 1;
          var gr = new Grass(rx, ry);
          grassArr.push(gr);
        }
      }
    }
  }
}
