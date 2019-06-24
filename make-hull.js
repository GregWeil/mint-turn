import { Ellipse, Group, Path } from 'two.js';
import computeCentroid from './compute-centroid';

const findOuterPath = (sortedVertices) => {
  const route = [];
  for (let vertex in sortedVertices) {
    
  }
  return route;
};

const makeHull = (vertices) => {
  const root = new Group();
  const update = (camera) => {
    root.remove(root.children);
    const sortedVertices = vertices.sort(([x1], [x2]) => x2 - x1);
    const routeA = findOuterPath(sortedVertices);
    sortedVertices.reverse();
    const routeB = findOuterPath(sortedVertices);
    const route = [...routeA, ...routeB];
    console.log(route);
    root.add(vertices.map((vertex) => {
      const [x, y] = camera.project(vertex);
      return new Ellipse(x, y, 5, 5);
    }));
  };
  const getDepth = (camera) => camera.project(computeCentroid(vertices))[2];
  return [root, update, getDepth];
};

export default makeHull;