import p5 from 'p5';
import { Problem } from './problem';

export class p5WrapperLearn {
  constructor(htmlelement, player) {
    this.sketch = new p5(this.p5instance.bind(this), htmlelement);
    this.dimension = {
      width: 400,
      height: 400,
    };
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
      this.problem = new Problem(sketch.width/10, sketch.width/10, sketch.width/5);
      this.problem.createProblemCanvas(sketch);
    }
    
    sketch.draw = () => {
      sketch.background('#E71E5C');
      this.problem.display(sketch);
      this.player.display(sketch);
    }
  }
}