import p5 from 'p5';
import { Wall } from './wall';

export class p5WrapperPuzzle {
  constructor(htmlElement, player) {
    this.sketch = new p5(this.p5instance.bind(this), htmlElement);
    this.dimension = {
			width: 400,
			height: 400,
    };
    this.walls = [];
    this.player = player;
  }

  p5instance(sketch) {
    sketch.preload = () => {
      const mascot = sketch.loadImage('assets/beagle.png');
      this.player.configurePlayer(this.dimension.width/2, this.dimension.height/2, 0, mascot);
    }

    sketch.setup = () => {      
      sketch.createCanvas(this.dimension.width, this.dimension.height);
      sketch.imageMode(sketch.CENTER);
      sketch.background('#E71E5C');
      
      this.player.createPathGraphic(sketch);
      this.createWalls();
    }

    sketch.draw = () => {
      //Refresh the background
      sketch.background('#E71E5C');

      //Display all the walls and detect player collision with them 
      for(let wall of this.walls) {
        wall.display(sketch);
        wall.detectCollision(this.player);
      }

      //Display the player
      this.player.display(sketch);
    }

    //Generates a zig-zag pattern of walls
    this.createWalls = () => {
      const obstacles = 4;
      for(let i = 1; i < obstacles; i++) {
        this.walls.push(new Wall(i*this.dimension.width/obstacles, this.dimension.height/2, Math.pow(-1,i)*this.dimension.height/2, 'y'))
      }
    }
  }
}