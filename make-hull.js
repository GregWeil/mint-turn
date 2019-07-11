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

const makeHull = (vertices, curved) => {
  const path = makeElement('path');
  const update = (project) => {
    const projectedVertices = vertices.map((vertex) => project(vertex));
    const sortedVertices = projectedVertices.sort(([x1, y1], [x2, y2]) => x1 !== x2 ? x1 - x2 : y1 - y2);
    const routeA = findOuterRoute(sortedVertices);
    sortedVertices.reverse();
    const routeB = findOuterRoute(sortedVertices);
    routeA.pop();
    routeB.pop();
    path.setAttribute('d', `M ${[...routeA, ...routeB].map(([x,y]) => `${x},${y}`).join(' L ')} Z`)
  };
  const getCentroid = () => computeCentroid(vertices);
  return [path, update, getCentroid];
};

export default makeHull;