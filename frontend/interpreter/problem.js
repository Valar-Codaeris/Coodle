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
}