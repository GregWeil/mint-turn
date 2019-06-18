import { Path, Anchor, Commands } from 'two.js';
import makeAnchor from './make-anchor';

const linkPoint = (point, point3d) => (camera) => {
  const [x, y] = camera.project(point3d);
  point.x = x;
  point.y = y;
};

const getAverage = (vertices) => {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  for (let i = 0; i < vertices.length; ++i) {
    const [x, y, z] = vertices[i];
    sumX += x;
    sumY += y;
    sumZ += z;
  }
  return [sumX, sumY, sumZ].map((value) => value / vertices.length);
};

const makePath = (vertices, fill, stroke, strokeWidth, closed, curved) => {
  const anchors = vertices.map(makeAnchor);
  const path = new Path(anchors.map(([anchor]) => anchor), closed, curved, false);
  path.fill = fill;
  path.stroke = stroke;
  path.linewidth = strokeWidth;
  path.cap = 'round';
  path.join = 'round';
  const updatePoints = (camera) => anchors.forEach(([anchor, updateAnchor]) => updateAnchor(camera));
  const getDepth = (camera) => camera.project(getAverage(vertices))[2];
  return [path, updatePoints, getDepth];
};

export default makePath;