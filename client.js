// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';
import createCamera from 'perspective-camera';

import Input from './controls';

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

const input = Input(document.body);

const line = two.makePath(0,0, 0,0, 0,0, 0,0, false);
line.stroke = 'black';
line.linewidth = 2;

const points = [
  linkPoint(line.vertices[0], [-3, -3, 0]),
  linkPoint(line.vertices[1], [-3, 3, 0]),
  linkPoint(line.vertices[2], [3, 3, 0]),
  linkPoint(line.vertices[3], [3, -3, 0]),
];

two.bind('update', () => {
  const [cameraX, cameraY] = input();
  const cameraRadius = 5;
  const cameraRadiusH = Math.cos(cameraY) * cameraRadius;
  camera.position = [
    Math.sin(cameraX) * cameraRadiusH,
    Math.sin(cameraY) * cameraRadius,
    Math.cos(cameraX) * cameraRadiusH,
  ];
  camera.up = [0, 1, 0];
  camera.lookAt([0, 0, 0]);
  camera.update();
  
  points.forEach(point => point(camera));
}).play();

console.log('hello world :o');
