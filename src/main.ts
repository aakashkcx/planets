import { Body } from "./body";
import { Canvas } from "./canvas";
import { Vector } from "./vector";

import "./style.css";

const canvasElement = document.querySelector<HTMLCanvasElement>("canvas")!;

const canvas = new Canvas(canvasElement);

const planets = [
  new Body("red", 100, 100, new Vector(0, 0), new Vector(1, 1)),
  new Body("yellow", 100, 100, new Vector(0, 0), new Vector(-1, -1)),
];

function loop() {
  canvas.clear();
  for (const planet of planets) {
    planet.update();
    planet.draw(canvas);
  }
  requestAnimationFrame(loop);
}

loop();
