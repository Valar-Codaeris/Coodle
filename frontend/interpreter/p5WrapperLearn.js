import p5 from 'p5';
import { Problem } from './problem';
import { Player } from './player';

export class p5WrapperLearn {
  constructor(htmlelement) {
    this.sketch = new p5(this.p5instance.bind(this), htmlelement);
    this.dimension = {
      width: 400,
      height: 400,
    };
  }

  p5instance(sketch) {
    sketch.setup = () => {
      sketch.createCanvas(this.dimension.width, this.dimension.height);
      sketch.background('#E71E5C');

      this.problem = new Problem(0, 0, sketch.width/5);
      this.problem.createProblemCanvas(sketch);

      this.player = new Player();
    }
    
    sketch.draw = () => {
      this.problem.display(sketch);
    }
  }
}