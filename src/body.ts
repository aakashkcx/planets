import { Canvas, Drawable } from "./canvas";
import { DISTANCE_SCALE, SIZE_LOG_SCALE, TIME_SCALE } from "./constants";
import { gravity } from "./physics";
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

  update(bodies: Body[]) {
    this.acceleration = new Vector();
    for (const body of bodies)
      this.acceleration = this.acceleration.add(gravity(this, body));
    this.velocity = this.velocity.add(this.acceleration.multiply(TIME_SCALE));
    this.position = this.position.add(this.velocity.multiply(TIME_SCALE));
  }

  draw(canvas: Canvas) {
    canvas.circle(
      this.position.multiply(DISTANCE_SCALE),
      Math.log(this.radius) / Math.log(SIZE_LOG_SCALE),
      this.color
    );
  }
}
