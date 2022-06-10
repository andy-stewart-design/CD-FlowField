// Simplex Noise is the algorithm that is driving the animation. It generates a very long array of psuedo-random data.
import SimplexNoise from "./node_modules/simplex-noise/dist/esm/simplex-noise.js";
import { PI, cream, green, colors, createGrid, Circle } from "./utils.js";

const simplex = new SimplexNoise();
console.log(simplex);
const hero = document.querySelector("section.hero");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const scale = window.devicePixelRatio;

let columns, field, rows, size, wX, wY, cR;
let time = 0;
const inc = 0.003;
let circles = [];

function setup() {
  wX = hero.offsetWidth;
  wY = hero.offsetHeight;
  size = wX < 600 ? 16 : 20;
  canvas.style.width = wX + "px";
  canvas.style.height = wY + "px";
  canvas.width = wX * scale;
  canvas.height = wY * scale;
  ctx.scale(scale, scale);
  columns = createGrid(wX, size);
  rows = createGrid(wY, size);
  initField();
  cR = (wX / 3) * 2;
}

function draw() {
  window.requestAnimationFrame(draw);
  calculateField();
  clear();
  drawField();
  drawCircles();
  time += inc;
}
// setup the grid of vectors
function initField() {
  field = new Array(columns);
  for (let x = 0; x < columns; x++) {
    field[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      field[x][y] = [0, 0];
    }
  }
}
// calculate each frame of the animation
function calculateField() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const angle = simplex.noise3D(x / 50, y / 50, time) * (PI * 2);
      const length = simplex.noise3D(x / 100 + 40000, y / 100 + 40000, time);
      field[x][y][0] = angle;
      field[x][y][1] = length;
    }
  }
}
// clear the canvas at the beginning of each frame
function clear() {
  ctx.fillStyle = cream;
  ctx.fillRect(0, 0, wX, wY);
}
// run the animation
function drawField() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const angle = field[x][y][0];
      const length = field[x][y][1];
      ctx.save();
      ctx.translate(x * size, y * size);
      ctx.rotate(angle);
      ctx.strokeStyle = green;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size * length);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function createCircles() {
  for (let i = 0; i < 2; i++) {
    circles.push(new Circle(colors[i]));
  }
}

function drawCircles() {
  const sine = [
    Math.sin(time) * (wX / 2) + wX / 2,
    Math.sin(time + PI) * (wX / 2) + wX / 2,
  ];
  const cosine = [
    Math.cos(time) * (wX / 2) + wX / 2,
    Math.cos(time + PI) * (wX / 2) + wX / 2,
  ];
  for (const [i, circle] of circles.entries()) {
    circle.update(sine[i], cosine[i]);
    circle.show(ctx, cR);
  }
}

setup();
createCircles();
draw();
window.addEventListener("resize", setup);
