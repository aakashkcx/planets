import { Canvas, Drawable } from "./canvas";
import { Vector } from "./vector";

export class Body implements Drawable {
  color: string;
  radius: number;
  mass: number;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  constructor(
    color: string,
    radius: number,
    mass: number,
    position = new Vector(),
    velocity = new Vector(),
    acceleration = new Vector()
  ) {
    this.color = color;
    this.radius = radius;
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  update() {
    // TODO: calculate gravity
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);
  }

  draw(canvas: Canvas) {
    canvas.circle(this.position, this.radius, this.color);
  }
}
