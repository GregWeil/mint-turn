import { Anchor, Commands } from 'two.js';

const makeUpdateVertex = (anchor, vertex) => (project) => {
  const [x, y] = project(vertex);
  anchor.x = x;
  anchor.y = y;
};

const makeUpdateAnchor = (anchor, vertex, left, right) => (project) => {
  const [x, y] = project(vertex);
  anchor.x = x;
  anchor.y = y;
  const [lx, ly] = project(left);
  anchor.controls.left.x = lx - x;
  anchor.controls.left.y = ly - y;
  const [rx, ry] = project(right);
  anchor.controls.right.x = rx - x;
  anchor.controls.right.y = ry - y;
};

const makeAnchor = ([a, b, c]) => {
  const command = a.length ? Commands.curve : Commands.line;
  const anchor = new Anchor(0,0, 0,0, 0,0, command);
  const updateAnchor = command !== Commands.curve ? makeUpdateVertex(anchor, [a, b, c])
    : makeUpdateAnchor(anchor, a, b.map((v,n) => v+a[n]), c.map((v,n) => v+a[n]));
  return [anchor, updateAnchor];
};

export default makeAnchor;