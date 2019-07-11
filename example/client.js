// client-side js
// run by the browser each time your view template is loaded

import { SVGRenderer } from 'two.js';
import {
  create as createMat4,
  identity as identityMat4,
  rotate as rotateMat4,
  translate as translateMat4,
} from 'gl-mat4';

import Input from './controls';
import { makeGroup, makeHull, makePath, makeScene, makeTransform } from '../';

const makePathStyled = (vertices, fill, stroke, strokeWidth, closed, curved) => {
  const [path, ...data] = makePath(vertices, closed, curved);
  path.fill = fill;
  path.stroke = stroke;
  path.linewidth = strokeWidth;
  path.cap = 'round';
  path.join = 'round';
  p.setAttribute('fill', fill);
  p.setAttribute('stroke', stroke);
  p.setAttribute('stroke-width', strokeWidth);
  return [path, ...data];
};

const makeHullStyled = (vertices, curved, fill, stroke, strokeWidth) => {
  const [[path, p], ...data] = makeHull(vertices, curved);
  path.fill = fill;
  path.stroke = stroke;
  path.linewidth = strokeWidth;
  path.cap = 'round';
  path.join = 'round';
  p.setAttribute('fill', fill);
  p.setAttribute('stroke', stroke);
  p.setAttribute('stroke-width', strokeWidth);
  return [path, ...data];
};

const makeCircle = (segments, radius, height) => {
  return [...Array(segments).keys()].map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
  });
};

const face = makeGroup([0, 0, 3], [
  makePathStyled([[-1,1,3],[-1,2,3]], 'transparent', 'black', 5, false, false),
  makePathStyled([[1,1,3],[1,2,3]], 'transparent', 'black', 5, false, false),
  makePathStyled([[[-2,-0.5,3],[0,0,0],[1,-1.5,0]], [[2,-0.5,3],[-1,-1.5,0],[0,0,0]]], 'transparent', 'black', 5, false, true),
]);

const bottom = makePathStyled([[-3,-3,-3], [-3,-3,3], [3,-3,3], [3,-3,-3]], 'green', 'black', 3, true, false);
const head = makeGroup([0, 0, 0], [
  makePathStyled([[-3,3,-3], [-3,3,3], [3,3,3], [3,3,-3]], 'red', 'black', 3, true, false),
  bottom,
  makePathStyled([[-3,-3,-3], [-3,3,-3], [3,3,-3], [3,-3,-3]], 'blue', 'black', 3, true, false),
  makePathStyled([[-3,-3,3], [-3,3,3], [3,3,3], [3,-3,3]], 'yellow', 'black', 3, true, false),
  makePathStyled([[-3,-3,-3], [-3,-3,3], [-3,3,3], [-3,3,-3]], 'pink', 'black', 3, true, false),
  makePathStyled([[3,-3,-3], [3,-3,3], [3,3,3], [3,3,-3]], 'orange', 'black', 3, true, false),
  face,
]);

const hat = makeGroup([0, 3, 0], [
  makeHullStyled([...makeCircle(16, 3, 0), ...makeCircle(16, 2.8, 0.5), ...makeCircle(16, 2.5, 1), ...makeCircle(16, 2, 1.5), ...makeCircle(16, 1.25, 1.85), [0, 2, 0]], true, 'green', 'black', 3),
  makeHullStyled([...makeCircle(8, 0.25, 2), ...makeCircle(8, 0.25, 2.125)], true, 'green', 'black', 3),
  makeGroup([0, -1, 0], [
    makePathStyled([[-3,0,0], [[-3,0,0],[0,0,0],[1,0,3]], [[0,0,4.5],[-1.5,0,0],[0,0,0]], [[0,0,4.5],[0,0,0],[1.5,0,0]], [[3,0,0],[-1,0,3],[0,0,0]], [3,0,0]], 'green', 'black', 3, true, true),
  ]),
]);

const hatTransform = createMat4();
translateMat4(hatTransform, hatTransform, [0, 3, 0]);
const hatInput = document.getElementById('hat');

const [[two, svg], camera, update] = makeScene(400, 400, [
  head, makeTransform(hat, hatTransform),
]);

two.appendTo(document.body);
two.renderer.domElement.setAttribute('viewBox', `0 0 ${two.width} ${two.height}`);
two.renderer.domElement.removeAttribute('width');
two.renderer.domElement.removeAttribute('height');
two.renderer.domElement.setAttribute('id', 'main');
svg.setAttribute('id', 'main');
svg.setAttribute('class', 'alt');
document.body.appendChild(svg);

const input = Input(document.body);

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
  
  identityMat4(hatTransform);
  translateMat4(hatTransform, hatTransform, [0, 3, 0]);
  rotateMat4(hatTransform, hatTransform, parseFloat(hatInput.value)*Math.PI/180, [0, 1, 0]);
  
  update();
}).play();

two.update();
const filter = SVGRenderer.Utils.createElement('filter', { id: 'shadow' });
const erode = SVGRenderer.Utils.createElement('feMorphology', { in: 'SourceAlpha', operator: 'erode', radius: 2 });
const blur = SVGRenderer.Utils.createElement('feGaussianBlur', { stdDeviation: 5 });
const blend = SVGRenderer.Utils.createElement('feBlend', { in: 'SourceGraphic' });
filter.appendChild(erode);
filter.appendChild(blur);
filter.appendChild(blend);
two.renderer.defs.appendChild(filter);
SVGRenderer.Utils.setAttributes(bottom[0][0]._renderer.elem, { filter: 'url(#shadow)' });

console.log('hello world :o');
