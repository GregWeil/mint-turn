import { Anchor, Commands } from 'two.js';

const makeAnchor = ([a, b, c]) => {
  const command = a.length ? Commands.curve : Commands.line;
  const anchor = new Anchor(0,0, 0,0, 0,0, command);
  const updateAnchor = (camera) => {
    if (command === Commands.curve) {
      const [x, y] = camera.project(a);
      anchor.x = x;
      anchor.y = y;
      const [lx, ly] = camera.project(b);
      anchor.controls.left.x = lx - x;
      anchor.controls.left.y = ly - y;
      const [rx, ry] = camera.project(c);
      anchor.controls.right.x = rx - x;
      anchor.controls.right.y = ry - y;
    } else {
      const [x, y] = camera.project([a, b, c]);
      anchor.x = x;
      anchor.y = y;
    }
  }
  return [anchor, updateAnchor];
};

export default makeAnchor;