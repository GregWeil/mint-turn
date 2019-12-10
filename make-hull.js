// based on https://en.wikipedia.org/wiki/Graham_scan

import { copy, create, distance, normalize, scaleAndAdd, subtract } from 'gl-vec2';
import computeCentroid from './compute-centroid';
import computeCurvedPath from './compute-curved-path';
import makeElement from './make-element';

const computeCrossProductZ = ([x1, y1], [x2, y2], [x3, y3]) => {
  return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
};

const findOuterRoute = (sortedVertices) => {
  const route = [];
  for (let i = 0; i < sortedVertices.length; ++i) {
    const vertex = sortedVertices[i];
    while (route.length > 1 && computeCrossProductZ(route[route.length-2], route[route.length-1], vertex) > 0) {
      route.pop();
    }
    if (route.length === 0 || route[route.length-1][0] !== vertex[0] || route[route.length-1][1] !== vertex[1]) {
      route.push(vertex);
    }
  }
  return route;
};

const buildAngledPath = (vertices) => {
  return `M ${vertices.map(([x,y]) => `${x},${y}`).join(' L ')} Z`;
};

const buildCurvedPath = (vertices, smoothing) => {
  let result = '';
  const prev = create();
  const offset = create();
  const next = create();
  
  for (let i = 0; i < vertices.length; ++i) {
    copy(prev, vertices[(i+0) % vertices.length]);
    const current = vertices[(i+1) % vertices.length];
    copy(next, vertices[(i+2) % vertices.length]);
    
    subtract(offset, next, prev);
    normalize(offset, offset);
    
    scaleAndAdd(prev, current, offset, -smoothing * distance(current, prev));
    scaleAndAdd(next, current, offset, smoothing * distance(current, next));
    
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

export const makeHull = (vertices, smoothing = 1/3) => {
  const path = makeElement('path');
  const update = (project) => {
    const projectedVertices = vertices.map((vertex) => project(vertex)).filter(([,,, w]) => w > 0);
    const sortedVertices = projectedVertices.sort(([x1, y1], [x2, y2]) => x1 !== x2 ? x1 - x2 : y1 - y2);
    const routeA = findOuterRoute(sortedVertices);
    sortedVertices.reverse();
    const routeB = findOuterRoute(sortedVertices);
    routeA.pop();
    routeB.pop();
    const route = [...routeA, ...routeB];
    path.setAttribute('d', smoothing ? computeCurvedPath(route, smoothing, false) : buildAngledPath(route));
  };
  const getCentroid = () => computeCentroid(vertices);
  return [path, update, getCentroid];
};

export default makeHull;