export class Wall {

  constructor(x, y, length, axis) {
    this.x = x; //position of one end of the wall
    this.y = y;
    this.length = length;
    this.axis = axis; //axis along which the wall should be
    this.weight = 20;
  }

  display(sketch) {
    sketch.stroke(255);
    sketch.strokeCap(sketch.SQUARE);
    sketch.strokeWeight(this.weight);
    if(this.axis === 'x') {
      sketch.line(this.x, this.y, this.x + this.length, this.y);
    }
    else if(this.axis === 'y') {
      sketch.line(this.x, this.y, this.x, this.y + this.length);
    }
    else {
      console.log('Incorrect axis');
    }
  }

  detectCollision(object) {
    //Detect whether the object's position lies within the bounds of the wall
    if((object.x <= this.x + this.weight/2) && (object.x >= this.x - this.weight)) {
      if(this.length > 0) {
        if((object.y >= this.y) && (object.y <= this.y + this.length)) {
          console.log('Collision Detected');
        } 
      }
      else {
        if((object.y <= this.y) && (object.y >= this.y + this.length)) {
          console.log('Collision Detected');
        }
      }
    }
  }
}