import { Canvas, Drawable } from "./canvas";

export class Body implements Drawable {
  color: string;
  radius: number;
  mass: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  ddx: number;
  ddy: number;

  constructor(
    color: string,
    radius: number,
    mass: number,
    x = 0,
    y = 0,
    dx = 0,
    dy = 0
  ) {
    this.color = color;
    this.radius = radius;
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ddx = 0;
    this.ddy = 0;
  }

  update() {
    // TODO: calculate gravity
    this.dx += this.ddx;
    this.dy += this.ddy;
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(canvas: Canvas) {
    canvas.circle(this.x, this.y, this.radius, this.color);
  }
}
