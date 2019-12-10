import Vec2, { copy, create, distance, normalize, scale, scaleAndAdd, subtract } from 'gl-vec2';

const computeControlOffset = (offset, vertex, prev, next) => {
  subtract(offset, next, prev);
  normalize(offset, offset);
  scale(offset, offset, Math.min(distance(prev, vertex), distance(prev, next), distance(vertex, next)));
  return offset;
};

const computeCurvedPath = (vertices, smoothing, closed) => {
  const offset = create();
  const prev = create();
  const next = create();
  
  return vertices.map((vertex, i) => {
    copy(prev, vertices[(i+vertices.length-1) % vertices.length]);
    copy(next, vertices[(i+vertices.length+1) % vertices.length]);
    computeControlOffset(offset, vertex, prev, next);
    
    scaleAndAdd(prev, vertex, offset, -smoothing);
    scaleAndAdd(next, vertex, offset, smoothing);
    
    if (i === 0) {
      if (!closed) {
        
      }
    }
    
    return `${prev[0]},${prev[1]} ${current[0]},${current[1]} C ${next[0]},${next[1]}`;
  }).join(' ');
    
    result += ` ${prev[0]},${prev[1]} ${current[0]},${current[1]}`;
    const start = ` C ${next[0]},${next[1]}`;
    if (i < vertices.length - 1) {
      result += start
    } else {
      result = `M ${current[0]},${current[1]}` + start + result;
    }
  });
  
  return result;
};

export default computeCurvedPath;