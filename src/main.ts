import { Body } from "./body";
import { Canvas } from "./canvas";
import { AU, ME, MS, RE, RS } from "./constants";
import { Vector } from "./vector";

import "./style.css";

const canvasElement = document.querySelector<HTMLCanvasElement>("canvas")!;

const canvas = new Canvas(canvasElement);

const sun = new Body(
  "gold", // color
  1 * RS, // radius
  1 * MS, // mass
  new Vector(0, 0), // position
  new Vector(0, 0) // velocity
);
const mercury = new Body(
  "grey", // color
  0.3829 * RE, // radius
  0.055 * ME, // mass
  new Vector(-0.387098 * AU, 0), // position
  new Vector(0, 47.36e3) // velocity
);
const venus = new Body(
  "tan", // color
  0.9499 * RE, // radius
  0.815 * ME, // mass
  new Vector(0.723332 * AU, 0), // position
  new Vector(0, -35.02e3) // velocity
);
const earth = new Body(
  "aqua", // color
  1 * RE, // radius
  1 * ME, // mass
  new Vector(0, 1 * AU), // position
  new Vector(29.7827e3, 0) // velocity
);
const mars = new Body(
  "orangered", // color
  0.533 * RE, // radius
  0.107 * ME, // mass
  new Vector(0, -1.52368055 * AU), // position
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
