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
const jupiter = new Body(
  "lightsalmon", // color
  11.209 * RE, // radius
  317.8 * ME, // mass
  new Vector(-5.2038 * AU, 0), // position
  new Vector(0, 13.06e3) // velocity
);
const saturn = new Body(
  "wheat", // color
  9.449 * RE, // radius
  95.159 * ME, // mass
  new Vector(9.5826 * AU, 0), // position
  new Vector(0, -9.68e3) // velocity
);
const uranus = new Body(
  "aquamarine", // color
  4.007 * RE, // radius
  14.536 * ME, // mass
  new Vector(0, 19.19126 * AU), // position
  new Vector(6.8e3, 0) // velocity
);
const neptune = new Body(
  "deepskyblue", // color
  3.883 * RE, // radius
  17.147 * ME, // mass
  new Vector(0, -30.07 * AU), // position
  new Vector(-5.43e3, 0) // velocity
);

const solarSystem = [
  sun,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];

function loop() {
  if (!canvas.mouse.left) canvas.clear();
  for (const body of solarSystem) {
    body.update(solarSystem);
    body.draw(canvas);
  }
  requestAnimationFrame(loop);
}

loop();
