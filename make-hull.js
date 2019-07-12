// based on https://en.wikipedia.org/wiki/Graham_scan

import computeCentroid from './compute-centroid';
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

const computeDistance = 
window.smoothness = 0.1;
const buildCurvedPath = (vertices) => {
  let result = '';
  for (let i = 0; i < vertices.length; ++i) {
    const prev = vertices[(i+0) % vertices.length];
    const current = vertices[(i+1) % vertices.length];
    const next = vertices[(i+2) % vertices.length];
    const offset = [
      (next[0] - prev[0]) * window.smoothness,
      (next[1] - prev[1]) * window.smoothness,
    ];
    result += ` ${current[0]-offset[0]},${current[1]-offset[1]} ${current[0]},${current[1]}`;
    const start = ` C ${current[0]+offset[0]},${current[1]+offset[1]}`;
    if (i < vertices.length - 1) {
      result += start
    } else {
      result = `M ${current[0]},${current[1]}` + start + result;
    }
  }
  return result;
};

const makeHull = (vertices, curved=true) => {
  const path = makeElement('path');
  const update = (project) => {
    const projectedVertices = vertices.map((vertex) => project(vertex));
    const sortedVertices = projectedVertices.sort(([x1, y1], [x2, y2]) => x1 !== x2 ? x1 - x2 : y1 - y2);
    const routeA = findOuterRoute(sortedVertices);
    sortedVertices.reverse();
    const routeB = findOuterRoute(sortedVertices);
    routeA.pop();
    routeB.pop();
    const route = [...routeA, ...routeB];
    path.setAttribute('d', curved ? buildCurvedPath(route) : buildAngledPath(route));
  };
  const getCentroid = () => computeCentroid(vertices);
  return [path, update, getCentroid];
};

export default makeHull;