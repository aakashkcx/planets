export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = this.element.getContext("2d")!;

    this.resize();
    window.addEventListener("resize", this.resize);
  }

  resize() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }

  rect(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x + this.element.width / 2,
      y + this.element.height / 2,
      width,
      height
    );
  }

  circle(x: number, y: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.element.width / 2,
      y + this.element.height / 2,
      radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }
}

export type Drawable = {
  draw(canvas: Canvas): void;
  update?(): void;
};
