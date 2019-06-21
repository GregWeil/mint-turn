// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';
import createCamera from 'perspective-camera';

import Input from './controls';
import makeGroup from './make-group';
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

const face = makeGroup([0,0,3], [
  makePath([[-1,1,3],[-1,2,3]], 'transparent', 'black', 5, false, false),
  makePath([[1,1,3],[1,2,3]], 'transparent', 'black', 5, false, false),
  makePath([[[-2,-0.5,3],[0,0,0],[1,-1.5,0]], [[2,-0.5,3],[-1,-1.5,0],[0,0,0]]], 'transparent', 'black', 5, false, true),
]);

const hat = makeGroup([0,3,0], [
  makePath([[2,3,0], [2,5,0],[[2,5,0],[0,0,0],[0,0,1]], [[0,5,2],[1,0,0],[0,0,0]],[0,5,2], [0,3,2],[[0,3,2],[0,0,0],[1,0,0]], [[2,3,0],[0,0,1],[0,0,0]]], 'darkgray', 'transparent', 3, false, true),
]);

const [rootGroup, updateRoot] = makeGroup([0,0,0], [
  makePath([[-3,3,-3], [-3,3,3], [3,3,3], [3,3,-3]], 'red', 'black', 5, true, false),
  makePath([[-3,-3,-3], [-3,-3,3], [3,-3,3], [3,-3,-3]], 'green', 'black', 5, true, false),
  makePath([[-3,-3,-3], [-3,3,-3], [3,3,-3], [3,-3,-3]], 'blue', 'black', 5, true, false),
  makePath([[-3,-3,3], [-3,3,3], [3,3,3], [3,-3,3]], 'yellow', 'black', 5, true, false),
  makePath([[-3,-3,-3], [-3,-3,3], [-3,3,3], [-3,3,-3]], 'pink', 'black', 5, true, false),
  makePath([[3,-3,-3], [3,-3,3], [3,3,3], [3,3,-3]], 'orange', 'black', 5, true, false),
  hat, face
]);

two.add(rootGroup);

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
  updateRoot(camera);
}).play();

console.log('hello world :o');
