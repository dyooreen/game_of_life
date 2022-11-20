class Grass extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.multiply = floor(random(10));
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
    return super.chooseCell(character);
  }
  weather() {
    if (weather == 4) this.mul(100);
    else if (weather == 3) this.mul(10);
    else if (weather == 2) this.mul(6);
    else this.mul(5);
  }
  mul(m) {
    this.multiply++;
    var newCell = random(this.chooseCell(0));
    if (this.multiply >= m && newCell) {
      grassArrLength++;
      var newGrass = new Grass(newCell[0], newCell[1]);
      grassArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = 1;
      this.multiply = 0;
    }
  }
}
