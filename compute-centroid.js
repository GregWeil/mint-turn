const computeCentroid = (vertices) => {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  for (let i = 0; i < vertices.length; ++i) {
    const [x, y, z] = vertices[i];
    sumX += x;
    sumY += y;
    sumZ += z;
  }
  return [sumX, sumY, sumZ].map((value) => value / vertices.length);
};

export default computeCentroid;