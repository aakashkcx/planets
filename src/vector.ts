export class Vector {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static fromPolar(magnitude: number, direction: number) {
    return new Vector(
      magnitude * Math.cos(direction),
      magnitude * Math.sin(direction)
    );
  }

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number) {
    return new Vector(this.x / scalar, this.y / scalar);
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
