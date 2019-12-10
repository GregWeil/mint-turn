import Vec2, { copy, create, distance, normalize, scale, scaleAndAdd, subtract } from 'gl-vec2';

const computeControlOffset = (offset, vertex, prev, next) => {
  subtract(offset, next, prev);
  normalize(offset, offset);
  scale(offset, offset, Math.min(distance(prev, vertex), distance(prev, next), distance(vertex, next)));
  return offset;
};

const computeCurvedPath = (vertices, smoothing, closed) => {
  let result = '';
  const offset = create();
  const prev = create();
  const next = create();
  
  for (let i = 0; i < vertices.length; ++i) {
    copy(prev, vertices[(i+0) % vertices.length]);
    const current = vertices[(i+1) % vertices.length];
    copy(next, vertices[(i+2) % vertices.length]);
    computeControlOffset(offset, current, prev, next);
    
    scaleAndAdd(prev, current, offset, -smoothing);
    scaleAndAdd(next, current, offset, smoothing);
    
    if (!closed) {
      if (i === vertices.length - 2) {
        copy(prev, current);
      }
      if (i === vertices.length - 1) {
        copy(next, current);
      }
    }
    
    result += ` ${prev[0]},${prev[1]} ${current[0]},${current[1]}`;
    const start = ` C ${next[0]},${next[1]}`;
    if (i < vertices.length - 1) {
      result += start
    } else {
      result = `M ${current[0]},${current[1]}` + start + result;
    }
  }
  return result;
};

export default computeCurvedPath;