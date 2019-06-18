import { Anchor, Commands } from 'two.js';

const makeAnchor = ([a, b, c]) => {
  const anchor = new Anchor(0,0, 0,0, 0,0, Commands.line);
  const updateAnchor = (camera) => {
    const [x, y] = camera.project([a, b, c]);
    anchor.x = x;
    anchor.y = y;
  }
};

export default makeAnchor;