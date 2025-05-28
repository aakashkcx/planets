import { Body } from "./body";
import { Canvas } from "./canvas";
import { AU, ME, MS, RE, RS } from "./constants";
import { Vector } from "./vector";

const canvasElement = document.querySelector<HTMLCanvasElement>("canvas")!;

const canvas = new Canvas(canvasElement);

const sun = new Body({
  color: "gold",
  radius: 1 * RS,
  mass: 1 * MS,
  position: new Vector(0, 0),
  velocity: new Vector(0, 0),
});
const mercury = new Body({
  color: "grey",
  radius: 0.3829 * RE,
  mass: 0.055 * ME,
  position: new Vector(-0.387098 * AU, 0),
  velocity: new Vector(0, 47.36e3),
});
const venus = new Body({
  color: "tan",
  radius: 0.9499 * RE,
  mass: 0.815 * ME,
  position: new Vector(0.723332 * AU, 0),
  velocity: new Vector(0, -35.02e3),
});
const earth = new Body({
  color: "aqua",
  radius: 1 * RE,
  mass: 1 * ME,
  position: new Vector(0, 1 * AU),
  velocity: new Vector(29.7827e3, 0),
});
const mars = new Body({
  color: "orangered",
  radius: 0.533 * RE,
  mass: 0.107 * ME,
  position: new Vector(0, -1.52368055 * AU),
  velocity: new Vector(-24.07e3, 0),
});
const jupiter = new Body({
  color: "lightsalmon",
  radius: 11.209 * RE,
  mass: 317.8 * ME,
  position: new Vector(-5.2038 * AU, 0),
  velocity: new Vector(0, 13.06e3),
});
const saturn = new Body({
  color: "wheat",
  radius: 9.449 * RE,
  mass: 95.159 * ME,
  position: new Vector(9.5826 * AU, 0),
  velocity: new Vector(0, -9.68e3),
});
const uranus = new Body({
  color: "aquamarine",
  radius: 4.007 * RE,
  mass: 14.536 * ME,
  position: new Vector(0, 19.19126 * AU),
  velocity: new Vector(6.8e3, 0),
});
const neptune = new Body({
  color: "deepskyblue",
  radius: 3.883 * RE,
  mass: 17.147 * ME,
  position: new Vector(0, -30.07 * AU),
  velocity: new Vector(-5.43e3, 0),
});

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
  if (!canvas.mouse.right.down) canvas.clear();
  for (const body of solarSystem) {
    body.update(solarSystem);
    body.draw(canvas);
  }
  requestAnimationFrame(loop);
}

loop();
