export class Vector {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  get direction() {
    return Math.atan2(this.y, this.x);
  }

  get magnitude() {
    return Math.sqrt(this.magnitudeSq);
  }

  get magnitudeSq() {
    return this.x ** 2 + this.y ** 2;
  }
}
