export class Problem {
  constructor(x, y, size) {
    this.x = x;
    this.y = y
    this.size = size;
  }

  //create a new canvas on top of the existing one.
  createProblemCanvas(sketch) {
    this.problemCanvas = sketch.createGraphics(this.size, this.size);
    this.problemCanvas.background(255);
  }
  
  display(sketch) {
    this.problemCanvas.rectMode(this.problemCanvas.CENTER);
    this.problemCanvas.rect(this.size/2, this.size/2, this.size/2, this.size/2);
    sketch.image(this.problemCanvas, this.x, this.y);
  }
  
  // displayLevelTwo(sketch) {
  //   this.problemCanvas.beginShape();
  //   vertex(this.size*0.5, this.size*0.5);
  //   vertex(this.size*0.75, this.size*0.5);
  //   vertex(this.size*0.75, this.size*0.75);
  //   vertex(this.size*0.25, this.size*0.75);
  //   vertex(this.size*0.25, this.size*0.25);
  //   vertex(this.size*0.5, this.size*0.25);
  //   this.problemCanvas.endShape(CLOSE);
  //   sketch.image(this.problemCanvas, this.x, this.y);
  // }

  // displayLevelThree(sketch) {
  //   this.problemCanvas.rectMode(this.problemCanvas.CENTER);
  //   this.problemCanvas.angleMode(RADIANS);
  //   this.problemCanvas.rotate(PI/4.0);
  //   this.problemCanvas.rect(this.size/2, this.size/2, this.size/2, this.size/2);
  //   sketch.image(this.problemCanvas, this.x, this.y);
  // }
}
