import { Vector } from "./vector";

const ZOOM_FACTOR = 1.25;
const DRAG_FACTOR = 0.5;

export type Drawable = {
  draw(canvas: Canvas): void;
};

export class Canvas {
  private element: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scale: number;
  private translate: Vector;
  private previousTranslate?: Vector;

  public mouse: {
    position: Vector;
    left: { down: true; start: Vector } | { down: false; start: undefined };
    middle: { down: true; start: Vector } | { down: false; start: undefined };
    right: { down: true; start: Vector } | { down: false; start: undefined };
  };

  public constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = this.element.getContext("2d")!;
    this.scale = 1;
    this.translate = new Vector(0, 0);
    this.mouse = {
      position: new Vector(0, 0),
      left: { down: false, start: undefined },
      middle: { down: false, start: undefined },
      right: { down: false, start: undefined },
    };

    this.resize();
    this.registerListeners();
  }

  private resize() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  /* ========== Drawing Methods ========== */

  public clear() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }

  public rect(position: Vector, width: number, height: number, color: string) {
    this.rect2(position.x, position.y, width, height, color);
  }

  public rect2(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.scale * x + this.element.width / 2,
      this.scale * y + this.element.height / 2,
      this.scale * width,
      this.scale * height,
    );
  }

  public circle(position: Vector, radius: number, color: string) {
    this.circle2(position.x, position.y, radius, color);
  }

  public circle2(x: number, y: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.scale * x + this.element.width / 2 + this.translate.x,
      this.scale * y + this.element.height / 2 + this.translate.y,
      this.scale * radius,
      0,
      2 * Math.PI,
    );
    this.ctx.fill();
  }

  /* ========== Mouse Event Handlers ========== */

  private mousemove(_event: MouseEvent) {
    if (this.mouse.left.down && this.previousTranslate) {
      this.translate = this.previousTranslate.add(
        this.mouse.position
          .subtract(this.mouse.left.start)
          .multiply(DRAG_FACTOR),
      );
    }
  }

  private mousedown(_event: MouseEvent) {
    if (this.mouse.left.down) {
      this.previousTranslate = this.translate;
    }
  }

  private mouseup(_event: MouseEvent) {
    this.previousTranslate = this.translate;
  }

  private click(_event: MouseEvent) {}

  private wheel(event: WheelEvent) {
    this.scale *= event.deltaY < 0 ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
  }

  /* ========== Internal Event Listeners ========== */

  private registerListeners() {
    window.addEventListener("resize", this.resize.bind(this));

    this.element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    this.element.addEventListener("mousemove", this._mousemove.bind(this));
    this.element.addEventListener("mousedown", this._mousedown.bind(this));
    this.element.addEventListener("mouseup", this._mouseup.bind(this));
    this.element.addEventListener("wheel", this._wheel.bind(this));
    this.element.addEventListener("click", this._click.bind(this));
  }

  private _mousemove(event: MouseEvent) {
    this.mouse.position = new Vector(
      event.clientX - this.element.width / 2,
      event.clientY - this.element.height / 2,
    );

    this.mousemove(event);
  }

  private _mousedown(event: MouseEvent) {
    if (event.button === 0) {
      this.mouse.left.down = true;
      this.mouse.left.start = this.mouse.position;
    } else if (event.button === 1) {
      this.mouse.middle.down = true;
      this.mouse.middle.start = this.mouse.position;
    } else if (event.button === 2) {
      this.mouse.right.down = true;
      this.mouse.right.start = this.mouse.position;
    }

    this.mousedown(event);
  }

  private _mouseup(event: MouseEvent) {
    if (event.button === 0) {
      this.mouse.left.down = false;
      this.mouse.left.start = undefined;
    } else if (event.button === 1) {
      this.mouse.middle.down = false;
      this.mouse.middle.start = undefined;
    } else if (event.button === 2) {
      this.mouse.right.down = false;
      this.mouse.right.start = undefined;
    }

    this.mouseup(event);
  }

  private _click(event: MouseEvent) {
    this.click(event);
  }

  private _wheel(event: WheelEvent) {
    this.wheel(event);
  }
}
