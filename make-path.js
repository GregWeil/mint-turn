import { Path, Anchor, Commands, } from 'two.js';

const linkPoint = (point, point3d) => (camera) => {
  const [x, y] = camera.project(point3d);
  point.x = x;
  point.y = y;
};

const getAverage = (vertices) => {
  const sumX = 0;
  const sumY = 0;
  const sumZ = 0;
  vertices.reduce(([sumX, sumY, sumZ], [x, y, z]) => [sumX+x, sumY+y, sumZ+z], [0, 0, 0]).map((v) => v / vertices.length);
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
  const getDepth = (camera) => vertices.reduce(([sumX, sumY, sumZ], [x, y, z]) => [sumX+x, sumY+y, sumZ+z], [0, 0, 0]).map((v) => v / vertices.length);
  return [path, updatePoints];
};

export default makePath;