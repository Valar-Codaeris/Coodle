import p5 from 'p5';
import { Problem } from './problem';

export class p5WrapperLearn {
  constructor(htmlelement, player, level) {
    this.player = player;
    this.level = level;
    this.dimension = {
      width: 350,
      height: 350,
    };
    this.sketch = new p5(this.p5instance.bind(this), htmlelement);


  }

  deleteSketch() {
		this.sketch.remove();
  }

  p5instance(sketch) {
    sketch.preload = () => {
      const mascot = sketch.loadImage('/assets/beagle.png');
      this.player.configurePlayer(this.dimension.width/2, this.dimension.height/2, 0, mascot);
    }

    sketch.setup = () => {
      sketch.createCanvas(this.dimension.width, this.dimension.height);
      sketch.imageMode(sketch.CENTER);
      sketch.angleMode(sketch.DEGREES);
      sketch.background('#E71E5C');

      this.player.createPathGraphic(sketch);
      this.problem = new Problem(sketch.width/5, sketch.width/5, sketch.width/2.5);
      this.problem.createProblemCanvas(sketch);
    }
    
    sketch.draw = () => {
      sketch.background('#E71E5C');
      this.player.display(sketch);
      switch(this.level) {
        case 1:
          this.problem.displayLevel1(sketch);
          break;
        case 2:
          this.problem.displayLevel2(sketch);
          break;
        case 3:
          this.problem.displayLevel3(sketch);
          break;
        case 4:
          this.problem.displayLevel4(sketch);
          break;
      }
    }
  }
}