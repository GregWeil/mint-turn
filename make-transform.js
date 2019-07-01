import { create, transformMat4 } from 'gl-vec3';

const makeTransform = ([child, updateChild, getChildCentroid], transform) => {
  const update = (project, cameraPosition) => {
    const transformProject = (vec3) => {
      transformMat4(vec3, vec3, transform);
      return project(vec3);
    };
    updateChild(transformProject, cameraPosition);
  };
  
  const getCentroid = () => {
    const centroid = getChildCentroid();
    transformMat4(centroid, centroid, transform);
    return centroid;
  };
  
  return [child, update, getCentroid];
};

export default makeTransform;