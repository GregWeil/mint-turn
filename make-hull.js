// based on https://en.wikipedia.org/wiki/Graham_scan

import { Anchor, Ellipse, Group, Path } from 'two.js';
import computeCentroid from './compute-centroid';
import makeAnchor from './make-anchor';

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
  const root = new Group();
  const update = (project) => {
    root.remove(root.children);
    const projectedVertices = vertices.map((vertex) => project(vertex));
    const sortedVertices = projectedVertices.sort(([x1, y1], [x2, y2]) => x1 !== x2 ? x1 - x2 : y1 - y2);
    const routeA = findOuterRoute(sortedVertices);
    sortedVertices.reverse();
    const routeB = findOuterRoute(sortedVertices);
    routeA.pop();
    routeB.pop();
    const route = [...routeA, ...routeB];
    const path = new Path(route.map(([x, y]) => new Anchor(x,y, 0,0, 0,0)), true, curved, false);
    root.add(path);
  };
  const getCentroid = () => computeCentroid(vertices);
  return [root, update, getCentroid];
};

export default makeHull;