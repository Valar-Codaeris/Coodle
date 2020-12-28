export class Problem {
  constructor(x, y, size) {
    this.x = x;
    this.y = y
    this.size = size;
  }

  //create a new canvas on top of the existing one.
  createProblemCanvas(sketch) {
    this.problemCanvas = sketch.createGraphics(this.size, this.size);
    this.problemCanvas.background(255, 150);
    this.problemCanvas.strokeCap(sketch.ROUND);
    this.problemCanvas.stroke(255);
    this.problemCanvas.noFill();
    this.problemCanvas.strokeWeight(5);
  }
  
  displayLevel1(sketch) {
    this.problemCanvas.line(this.size/2, this.size/2, this.size/2, 3*this.size/4);
    sketch.image(this.problemCanvas, this.x, this.y);
  }

  displayLevel2(sketch) {
    this.problemCanvas.line(this.size/4, this.size/4, 3*this.size/4, this.size/4);
    this.problemCanvas.line(3*this.size/4, this.size/4, 3*this.size/4, 3*this.size/4);
    sketch.image(this.problemCanvas, this.x, this.y);
  }

  displayLevel3(sketch) {
    this.problemCanvas.triangle(this.size/2, this.size/4, this.size/4, (Math.sqrt(3) + 1)*this.size/4, 3*this.size/4, (Math.sqrt(3) + 1)*this.size/4);
    sketch.image(this.problemCanvas, this.x, this.y);
  }
  
  displayLevel4(sketch) {
    this.problemCanvas.rectMode(this.problemCanvas.CENTER);
    this.problemCanvas.rect(this.size/2, this.size/2, this.size/2, this.size/2);
    sketch.image(this.problemCanvas, this.x, this.y);
  }
}