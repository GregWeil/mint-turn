import { Anchor, Commands } from 'two.js';

const makeAnchor = ([a, b, c]) => {
  const anchor = new Anchor(0,0, 0,0, 0,0, Commands.curve);
  const updateAnchor = (camera) => {
    const [x, y] = camera.project([a, b, c]);
    anchor.x = x;
    anchor.y = y;
  }
  return [anchor, updateAnchor];
};

export default makeAnchor;