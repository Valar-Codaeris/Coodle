import p5 from 'p5';
import { Puzzle } from './puzzle';

export class p5WrapperPuzzle {
  constructor(htmlElement, player, level=1) {
    this.dimension = {
			width: 350,
			height: 350,
    };
    this.level = level;
    this.walls = [];
    this.player = player;
    this.puzzle = new Puzzle(this.dimension);
    this.sketch = new p5(this.p5instance.bind(this), htmlElement);
  }

  p5instance(sketch) {
    sketch.preload = () => {
      const mascot = sketch.loadImage('assets/beagle.png');
      this.player.configurePlayer(this.dimension.width/8, 3*this.dimension.height/4, -90, mascot);
    }
    this.deleteSketch = () => {
      sketch.remove();
    }
    sketch.setup = () => {      
      sketch.createCanvas(this.dimension.width, this.dimension.height);
      sketch.angleMode(sketch.DEGREES);
      sketch.imageMode(sketch.CENTER);
      sketch.background('#E71E5C');
      
      this.player.createPathGraphic(sketch);
      switch(this.level) {
        case 1:
          this. walls = this.puzzle.configureLevel1(this.walls);
          break;
        case 2:
          this.walls = this.puzzle.configureLevel2(this.walls);
          break;
        case 3:
          this.walls = this.puzzle.configureLevel3(this.walls);
          break;
      }
    }

    sketch.draw = () => {
      //Refresh the background
      sketch.background('#E71E5C');

      //Display all the walls and detect player collision with them 
      for(let wall of this.walls) {
        wall.display(sketch);
        wall.detectCollision(this.player);
      }

      //Display Destination
      switch(this.level) {
        case 1:
          sketch.circle(7*this.dimension.width/8, 3*this.dimension.height/4, 20);
          break;
        case 2:
          sketch.circle(this.dimension.width/8, this.dimension.height/8, 20);
          break;
        case 3:
          sketch.circle(7*this.dimension.width/8, 3*this.dimension.height/4, 20);
          break;
        }
            
      //Display the player
      this.player.display(sketch);
    }
  }
}