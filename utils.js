export const PI = Math.PI;
export const TWOPI = Math.PI * 2;

export const cream = "#F9F6EE";
export const green = "#0ABB62";
export const colors = [
  ["rgba(112, 184, 255, 0.35)", "rgba(112, 184, 255, 0.0)"],
  ["rgba(57, 208, 133, 0.25)", "rgba(57, 208, 133, 0.0)"],
];
export const createGrid = (a, b) => Math.floor(a / b) + 1;

function createVector(_x, _y) {
  const vectorObj = { x: _x, y: _y };
  return vectorObj;
}

function set(vect, val1, val2) {
  vect.x = val1;
  vect.y = val2 ? val2 : val1;
  return vect;
}

export class Circle {
  constructor(c, x = 0, y = 0) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.c = c;
  }
  update(vel1, vel2) {
    set(this.pos, vel1, vel2);
    this.t += this.inc;
  }
  show(ctx, rad) {
    const gradient = ctx.createRadialGradient(
      this.pos.x,
      this.pos.y,
      0,
      this.pos.x,
      this.pos.y,
      rad
    );
    gradient.addColorStop(0, this.c[0]);
    gradient.addColorStop(1, this.c[1]);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, rad, 0, TWOPI, false);
    ctx.fill();
  }
}
