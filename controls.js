const OrbitControls = (dom) => {
  let x = 0;
  let y = 0;
  
  dom.addEventListener('mousemove', (event) => {
    if (event.buttons & 1) {
      x += event.movementX;
      y += event.movementY;
      y = Math.min(Math.max(y, -98), 89);
    }
  });
  
  return () => [x, y].map(angle => angle * Math.PI / 180);
};

export default OrbitControls;