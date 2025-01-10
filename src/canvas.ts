import { Vector } from "./vector";

export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scale: number;
  mouse: {
    position: Vector;
    left: boolean;
    middle: boolean;
    right: boolean;
  };

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = this.element.getContext("2d")!;
    this.scale = 1;
    this.mouse = {
      position: new Vector(0, 0),
      left: false,
      middle: false,
      right: false,
    };

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.element.addEventListener("mousemove", this.mousemove.bind(this));
    this.element.addEventListener("mousedown", this.mousedown.bind(this));
    this.element.addEventListener("mouseup", this.mouseup.bind(this));
    this.element.addEventListener("wheel", this.wheel.bind(this));
    this.element.addEventListener("click", this.click.bind(this));
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
      this.scale * x + this.element.width / 2,
      this.scale * y + this.element.height / 2,
      this.scale * width,
      this.scale * height
    );
  }

  circle(position: Vector, radius: number, color: string) {
    this.circle2(position.x, position.y, radius, color);
  }

  circle2(x: number, y: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.scale * x + this.element.width / 2,
      this.scale * y + this.element.height / 2,
      this.scale * radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }

  resize() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  mousemove(event: MouseEvent) {
    this.mouse.position = new Vector(
      event.clientX - this.element.width / 2,
      event.clientY - this.element.height / 2
    );
  }

  mousedown(event: MouseEvent) {
    if (event.button === 0) this.mouse.left = true;
    else if (event.button === 1) this.mouse.middle = true;
    else if (event.button === 2) this.mouse.right = true;
  }

  mouseup(event: MouseEvent) {
    if (event.button === 0) this.mouse.left = false;
    else if (event.button === 1) this.mouse.middle = false;
    else if (event.button === 2) this.mouse.right = false;
  }

  click(_event: MouseEvent) {}

  wheel(event: WheelEvent) {
    this.scale *= event.deltaY < 0 ? 1.25 : 0.8;
  }
}

export type Drawable = {
  draw(canvas: Canvas): void;
};
