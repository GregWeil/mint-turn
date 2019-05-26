// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';
import createCamera from 'perspective-camera';

const linkPoint = (point, point3d) => (camera) => {
  const [x, y] = camera.project(point3d);
  point.x = x;
  point.y = y;
};

const two = new Two({
  width: 400,
  height: 400,
}).appendTo(document.getElementById('main'));

const camera = createCamera({
  fov: 30,
  near: 1,
  far: 10,
  viewport: [0, 0, two.width, two.height],
});

const start = [-3, -1, 0];
const end = [3, 1, 0];

const line = two.makePath(0, 0, 0, 0, 0, 0, true);
line.stroke = 'black';
line.linewidth = 2;

const points = [
  linkPoint(line.vertices[0], [-3, 1, 0]),
  linkPoint(line.vertices[1], [0, -1, 0]),
  linkPoint(line.vertices[2], [3, 1, 0]),
];

two.bind('update', () => {
  const angle = parseFloat(document.getElementById('rotation').value) * Math.PI/180;
  camera.position = [Math.sin(angle)*5, 0, Math.cos(angle)*5];
  camera.lookAt([0, 0, 0]);
  camera.update();
  
  points.forEach(point => point(camera));
}).play();

console.log('hello world :o');
