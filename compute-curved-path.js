import Vec2, { copy, create, distance, normalize, scale, scaleAndAdd, subtract } from 'gl-vec2';

const computeControlOffset = (offset, vertex, prev, next) => {
  subtract(offset, next, prev);
  normalize(offset, offset);
  scale(offset, offset, Math.min(distance(prev, vertex), distance(prev, next), distance(vertex, next)));
  return offset;
};

const serialize = (vertex) => `${vertex[0]},${vertex[1]}`;

export const computeClosedCurvedPath = (vertices, smoothing) => {
  const offset = create();
  const control = create();
  let end = '';
  
  const result = vertices.map((vertex, i) => {
    const prev = vertices[(i+vertices.length-1) % vertices.length];
    const next = vertices[(i+vertices.length+1) % vertices.length];
    computeControlOffset(offset, vertex, prev, next);
    
    scaleAndAdd(control, vertex, offset, -smoothing);
    
    if (i === 0) {
      end = `${serialize(control)} ${serialize(vertex)} Z`;
      scaleAndAdd(control, vertex, offset, smoothing);
      return `M ${serialize(vertex)} C ${serialize(control)}`;
    }
    
    return `${serialize(control)} ${serialize(vertex)} S`;
  });
  
  return result.join(' ') + ' ' + end;
};

export const computeOpenCurvedPath = (vertices, smoothing) => {
  const control = create();
  
  const result = vertices.map((vertex, i) => {
    if (i === 0) {
      return `M ${serialize(vertex)} C ${serialize(vertex)}`;
    } else if (i === vertices.length - 1) {
      return `${serialize(vertex)} ${serialize(vertex)}`;
    }
    
    const prev = vertices[(i+vertices.length-1) % vertices.length];
    const next = vertices[(i+vertices.length+1) % vertices.length];
    computeControlOffset(control, vertex, prev, next);
    scaleAndAdd(control, vertex, control, -smoothing);
    
    return `${serialize(control)} ${serialize(vertex)} S`;
  });
  
  return result.join(' ');
};