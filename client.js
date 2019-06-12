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

const elements = [
  makePath([[-3,3,-3],[-3,3,3],[3,3,3],[3,3,-3]], 'red', 'black', 5, true, false),
  makePath([[-3,-3,-3],[-3,-3,3],[3,-3,3],[3,-3,-3]], 'green', 'black', 5, true, false),
  makePath([[-3,-3,-3],[-3,3,-3],[3,3,-3],[3,-3,-3]], 'blue', 'black', 5, true, false),
  makePath([[-3,-3,3],[-3,3,3],[3,3,3],[3,-3,3]], 'yellow', 'black', 5, true, false),
  makePath([[-3,-3,-3],[-3,-3,3],[-3,3,3],[-3,3,-3]], 'pink', 'black', 5, true, false),
  makePath([[3,-3,-3],[3,-3,3],[3,3,3],[3,3,-3]], 'orange', 'black', 5, true, false),
];

let groupA = two.makeGroup();
let groupB = two.makeGroup();

two.bind('update', (frame) => {
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
  
  const group = frame % 2 === 1 ? groupA : groupB;
  const pathsWithDepth = elements.map(([path, updatePath, getDepth]) => [path, getDepth(camera)]);
  const depthSortedPaths = pathsWithDepth.sort(([pathA, depthA], [pathB, depthB]) => depthB - depthA);
  group.add(depthSortedPaths.map(([path]) => path));
  
  elements.forEach(([, updatePath]) => updatePath(camera));
}).play();

console.log('hello world :o');
