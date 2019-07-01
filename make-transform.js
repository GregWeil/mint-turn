import { create, transformMat4 } from 'gl-vec3';

const makeTransform = ([child, updateChild, getChildCentroid], transform) => {
  const update = (project, cameraPosition) => {
    updateChild(project, cameraPosition);
  };
  
  const getCentroid = () => {
    const result = create();
    const centroid = getChildCentroid();
    transformMat4(result, centroid, mat4);
  };
  
  return [child, update, getCentroid];
};

export default makeTransform;