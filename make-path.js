import { Path, Anchor, Commands, } from 'two.js';

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

const makePath = (vertices, fill, stroke, strokeWidth) => {
  const path = new Path(vertices.map(() => new Anchor(0,0, 0,0, 0,0, Commands.line)), true, false, false);
  path.fill = fill;
  path.stroke = stroke;
  path.linewidth = strokeWidth;
  path.cap = 'round';
  path.join = 'round';
  const linkedPoints = path.vertices.map((vertex, i) => linkPoint(vertex, vertices[i]));
  const updatePoints = (camera) => linkedPoints.forEach(update => update(camera));
  const getDepth = (camera) => camera.project(getAverage(vertices))[2];
  return [path, updatePoints, getDepth];
};

export default makePath;