import { Body } from "./body";
import { Canvas } from "./canvas";
import { AU, ME, MS } from "./constants";
import { Vector } from "./vector";

import "./style.css";

const canvasElement = document.querySelector<HTMLCanvasElement>("canvas")!;

const canvas = new Canvas(canvasElement);

const sun = new Body(
  "yellow", // color
  25, // radius
  1 * MS, // mass
  new Vector(0, 0), // position
  new Vector(0, 0) // velocity
);
const mercury = new Body(
  "grey", // color
  10, // radius
  0.055 * ME, // mass
  new Vector(-0.387098 * AU, 0), // position
  new Vector(0, -47.36e3) // velocity
);
const venus = new Body(
  "orange", // color
  10, // radius
  0.815 * ME, // mass
  new Vector(0, -0.723332 * AU), // position
  new Vector(35.02e3, 0) // velocity
);
const earth = new Body(
  "turquoise", // color
  10, // radius
  1 * ME, // mass
  new Vector(1 * AU, 0), // position
  new Vector(0, 29.7827e3) // velocity
);
const mars = new Body(
  "red", // color
  10, // radius
  0.107 * ME, // mass
  new Vector(0, 1.52368055 * AU), // position
  new Vector(-24.07e3, 0) // velocity
);

const solarSystem = [sun, mercury, venus, earth, mars];

function loop() {
  canvas.clear();
  for (const body of solarSystem) {
    body.update(solarSystem);
    body.draw(canvas);
  }
  requestAnimationFrame(loop);
}

loop();
