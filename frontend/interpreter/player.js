export class Player {
  constructor() {}
  
  createPathGraphic(sketch) {
    this.pathGraphic = sketch.createGraphics(sketch.width, sketch.height);
    this.pathGraphic.fill(255);
    this.pathGraphic.noStroke();
  }

  configurePlayer(x, y, angle, mascot) {
    this.x = x;
		this.y = y;
		this.mascot = mascot;
    this.angle = angle;
  }

  //Display function, to draw the path and the puzzle objects, etc
  display(sketch) {
    this.pathGraphic.circle(this.x, this.y, 5);
    sketch.image(this.pathGraphic, sketch.width/2, sketch.height/2);
    
    // Draw the doggy
    sketch.push();
    sketch.translate(this.x, this.y);
    sketch.angleMode(sketch.DEGREES);
    sketch.rotate(this.angle);
    sketch.image(this.mascot,0,0, 45, 45);
    sketch.pop();

    // sketch.image(this.mascot, this.x, this.y, 30, 30);
  };

  /**
   * This function will move the dog till the distance mentioned,
   * and then the code can proceed to the next instruction 
   * @param {number} step distance to move 
   */
  async move(step) {
    const increment = 0.01 * step;

    let promise = new Promise((resolve, reject) => {
      const moveStep = () => {
        
        this.y = this.y + increment * Math.cos(Math.PI*this.angle/180);
        this.x = this.x - increment * Math.sin(Math.PI*this.angle/180);
        step = step - increment;
        if (step < 0) {
          resolve();
        }
        else {
          requestAnimationFrame(moveStep);
        }
      }
      requestAnimationFrame(moveStep);
    });
    return promise;
  };

  /**
   * Changes the angle of rotation
   * @param {number} angle 
   */
		/**
		 * Changes the angle of rotation
		 * @param {number} angle 
		 */
		async rotate (angle) {
      console.log('called');
			const increment = 0.01*angle;
			const oldAngle = this.angle;
			let angleCopy = angle;
			let promise = new Promise((resolve, reject) => {
				const moveStep = () => {
					this.angle = (this.angle + increment)%360;
					angleCopy = angleCopy - increment;
					if((increment > 0 && angleCopy < 0) || (increment < 0 && angleCopy >0)) {
						this.angle = (oldAngle + angle) % 360; //prevent decimal problems
						resolve();
					}
					else {
						requestAnimationFrame(moveStep);
					}
				}
				requestAnimationFrame(moveStep);
			});
			return promise;
		};
}