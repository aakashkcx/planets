import { Body } from "./body";
import { G } from "./constants";
import { Vector } from "./vector";

export function gravity(body1: Body, body2: Body) {
  if (body1 === body2) return new Vector(0, 0);

  const dist = body2.position.subtract(body1.position);
  const r2 = dist.magnitudeSq;
  const direction = dist.direction;

  if (r2 <= (body1.radius + body2.radius) ** 2) return new Vector(0, 0);

  const magnitude = (G * body2.mass) / r2;

  return Vector.fromPolar(magnitude, direction);
}
