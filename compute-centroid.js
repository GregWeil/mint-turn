import { create, add, scale } from 'gl-vec3';

const computeCentroid = (vertices) => {
  const sum = create();
  for (let i = 0; i < vertices.length; ++i) {
    add(sum, sum, vertices[i]);
  }
  scale(sum, sum, 1 / vertices.length);
  return sum;
};

export default computeCentroid;