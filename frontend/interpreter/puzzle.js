import { Wall } from "./wall";

export class Puzzle {
  constructor(dimension) {
    this.dimension = dimension;
  }
  
  configureLevel1(walls) {
    walls.push(new Wall(this.dimension.width/4, this.dimension.height/4, 3*this.dimension.height/4, 'y'));
    walls.push(new Wall(this.dimension.width/4, this.dimension.height/4 + 10, this.dimension.width/2, 'x'));
    return walls;
  }

  configureLevel2(walls) {
    walls.push(new Wall(0, this.dimension.height/2, 1*this.dimension.height/2, 'x'));
    walls.push(new Wall(3*this.dimension.width/4, this.dimension.height/4, this.dimension.height/2, 'y'));
    return walls;
  }

  configureLevel3(walls) {
    const obstacles = 4;
    for(let i = 1; i < obstacles; i++) {
      walls.push(new Wall(i*this.dimension.width/obstacles, this.dimension.height/2, Math.pow(-1,i)*this.dimension.height/2, 'y'));
    }
    return walls;
  }
}