// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';
import createCamera from 'perspective-camera';

import Input from './controls';
import makePath from './make-path';

const two = new Two({
  width: 400,
  height: 400,
}).appendTo(document.body);

two.renderer.domElement.setAttribute('viewBox', `0 0 ${two.width} ${two.height}`);
two.renderer.domElement.removeAttribute('width');
two.renderer.domElement.removeAttribute('height');
two.renderer.domElement.setAttribute('id', 'main');

const camera = createCamera({
  fov: 30,
  near: 1,
  far: 20,
  viewport: [0, 0, two.width, two.height],
});

const input = Input(two.renderer.domElement);

const [front, updateFront] = makePath([[-3,-3,-3],[-3,3,-3],[3,3,-3],[3,-3,-3]], 'transparent', 'black', 5);
const [back, updateBack] = makePath([[-3,-3,3],[-3,3,3],[3,3,3],[3,-3,3]], 'transparent', 'black', 5);
const [left, updateLeft] = makePath([[-3,-3,-3],[-3,-3,3],[-3,3,3],[-3,3,-3]], 'transparent', 'black', 5);
const [right, updateRight] = makePath([[3,-3,-3],[3,-3,3],[3,3,3],[3,3,-3]], 'transparent', 'black', 5);

two.add(front, back, left, right);
const update = (camera) => [updateFront, updateBack, updateLeft, updateRight].forEach((u) => u(camera));

two.bind('update', () => {
  const [cameraX, cameraY] = input();
  const cameraRadius = 10;
  const cameraRadiusH = Math.cos(cameraY) * cameraRadius;
  
  camera.position = [
    Math.sin(cameraX) * cameraRadiusH,
    Math.sin(cameraY) * cameraRadius,
    Math.cos(cameraX) * cameraRadiusH,
  ];
  camera.up = Math.abs(cameraY) === Math.PI/2 ? [-Math.sin(cameraX), 0, -Math.cos(cameraX)] : [0, 1, 0];
  camera.lookAt([0, 0, 0]);
  camera.update();
  
  update(camera);
}).play();

console.log('hello world :o');
