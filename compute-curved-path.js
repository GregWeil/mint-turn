import Vec2, { copy, create, distance, normalize, scale, scaleAndAdd, subtract } from 'gl-vec2';

const computeControlOffset = (offset, vertex, prev, next) => {
  subtract(offset, next, prev);
  normalize(offset, offset);
  scale(offset, offset, Math.min(distance(prev, vertex), distance(prev, next), distance(vertex, next)));
  return offset;
};

const serialize = (vertex) => `${vertex[0]},${vertex[1]}`;

const computeCurvedPath = (vertices, smoothing, closed) => {
  const offset = create();
  const prev = create();
  const next = create();
  let end = '';
  
  const result = vertices.map((vertex, i) => {
    copy(prev, vertices[(i+vertices.length-1) % vertices.length]);
    copy(next, vertices[(i+vertices.length+1) % vertices.length]);
    computeControlOffset(offset, vertex, prev, next);
    
    scaleAndAdd(prev, vertex, offset, -smoothing);
    scaleAndAdd(next, vertex, offset, smoothing);
    
    if (i === 0) {
      if (closed) {
        end = `${serialize(prev)} ${serialize(vertex)} Z`;
      }
      return `M ${serialize(vertex)} C ${serialize(next)}`;
    } else if (i === vertices.length - 1) {
      if (!closed) {
        return `${serialize(prev)} ${serialize(vertex)}`;
      }
    }
    
    return `${serialize(prev)} ${serialize(vertex)} C ${serialize(next)}`;
  });
  
  return result.join(' ') + ' ' + end;
};

export default computeCurvedPath;