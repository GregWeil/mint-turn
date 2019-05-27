import { Path, Anchor, Commands, } from 'two.js';

const linkPoint = (point, point3d) => (camera) => {
  const [x, y] = camera.project(point3d);
  point.x = x;
  point.y = y;
};

const makePath = (vertices, fill, stroke, strokeWidth) => {
  const path = new Path(vertices.map(() => new Anchor(0,0, 0,0, 0,0, Commands.line)), true, false, false);
  path.fill = fill;
  path.stroke = stroke;
  path.linewidth = strokeWidth;
  path.cap = 'round';
  path.join = 'round';
  const linkedPoints = path.vertices.map((vertex, i) => linkPoint(vertex, vertices[i]));
  return [path, (camera) => linkedPoints.forEach(update => update(camera))];
};

export default makePath;