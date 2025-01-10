import { Vector } from "./vector";

export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  zoom: number;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = this.element.getContext("2d")!;
    this.zoom = 1;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.element.addEventListener("wheel", (event: WheelEvent) => {
      this.zoom *= event.deltaY < 0 ? 1.25 : 0.8;
    });
  }

  resize() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }

  rect(position: Vector, width: number, height: number, color: string) {
    this.rect2(position.x, position.y, width, height, color);
  }

  rect2(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.zoom * x + this.element.width / 2,
      this.zoom * y + this.element.height / 2,
      this.zoom * width,
      this.zoom * height
    );
  }

  circle(position: Vector, radius: number, color: string) {
    this.circle2(position.x, position.y, radius, color);
  }

  circle2(x: number, y: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.zoom * x + this.element.width / 2,
      this.zoom * y + this.element.height / 2,
      this.zoom * radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }
}

export type Drawable = {
  draw(canvas: Canvas): void;
};
