import p5 from 'p5';

export class p5Wrapper {
	// To hold the variable values, and to call the functions from the interpreter
	constructor(htmlElement) {
		this.time = 16;
		this.x = 0;
		this.y = 0;
		this.mascot = null;
		this.angle = 0;
		this.sketch = new p5(this.p5instance.bind(this), htmlElement);

		this.dimensions = {
			width: 400,
			height: 400,
		};
	}
	
	deleteSketch() {
		this.sketch.remove();
	}
	/**
	 * Start p5 in instance mode, and make the functions, callable from outside the sketch, from the p5Wrapper class
	 * @param {object} sketch variable which p5 passes to the function 
	 */
	p5instance(sketch) {
		sketch.preload = () => {
			// 'sketch' used for initializing p5, 'this' used for calling the function from interpreter
			this.mascot = sketch.loadImage('assets/beagle.png');
		};
		
		/**
		 * Setup function, which creates the canvas, and the p5Graphic instance, sets Image mode, background, etc
		 */
		sketch.setup = () => {
			sketch.createCanvas(this.dimensions.width, this.dimensions.height);
			sketch.background('#E71E5C');

			sketch.angleMode(sketch.DEGREES);
			sketch.imageMode(sketch.CENTER);

			this.x = sketch.width / 2;
			this.y = sketch.height / 2;

			this.pathGraphic = sketch.createGraphics(this.dimensions.width, this.dimensions.height);			
			this.pathGraphic.fill(255);
			this.pathGraphic.noStroke();
		};

		/**
		 * Draw function, to draw the path and the puzzle objects, etc
		 */
		sketch.draw = () => {
			sketch.background('#E71E5C');
			sketch.drawPath();
			sketch.image(this.pathGraphic, this.dimensions.width/2, this.dimensions.height/2);
			sketch.image(this.mascot, this.x, this.y, 30, 30);
		};

		/**
		 * Function called to draw the path traced by the code
		 */
		sketch.drawPath = () => {
			this.pathGraphic.circle(this.x, this.y, 5);
		};

		/**
		 * This function will move the dog till the distance mentioned,
		 * and then the code can proceed to the next instruction 
		 * @param {number} step distance to move 
		 */
		this.move = async (step) => {
			const increment = 0.01 * step;

			let promise = new Promise((resolve, reject) => {
				const moveStep = () => {
					
					this.y = this.y + increment * sketch.cos(this.angle);
					this.x = this.x - increment * sketch.sin(this.angle);
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
		this.rotate = (angle) => {
			this.angle = (this.angle + angle) % 360;
		};
	}
}
