const OrbitControls = (dom) => {
  let x = 0;
  let y = 0;
  
  const move = (moveX, moveY, sensitivity = 1) => {
    x += moveX * sensitivity;
    y += moveY * sensitivity;
    y = Math.min(Math.max(y, -90), 90);
  };
  
  dom.addEventListener('mousemove', (event) => {
    if (event.buttons & 1) {
      move(event.movementX, event.movementY, 1/4);
    }
  });
  
  const touches = new Map();
  dom.addEventListener('touchstart', (event) => {
    for (let i = 0; i < event.changedTouches.length; ++i) {
      const touch = event.changedTouches[i];
      touches.set(touch.id, [touch.clientX, touch.clientY]);
    }
  });
  dom.addEventListener('touchmove', (event) => {
    for (let i = 0; i < event.changedTouches.length; ++i) {
      const touch = event.changedTouches[i];
      const [lastX, lastY] = touches.get(touch.id);
      move(touch.clientX - lastX, touch.clientY - lastY, 1/2);
      touches.set(touch.id, [touch.clientX, touch.clientY]);
    }
  });
  dom.addEventListener('touchend', (event) => {
    for (let i = 0; i < event.changedTouches.length; ++i) {
      touches.delete(event.changedTouches[i].id);
    }
  });
  dom.addEventListener('touchcancel', (event) => {
    for (let i = 0; i < event.changedTouches.length; ++i) {
      touches.delete(event.changedTouches[i].id);
    }
  });
  
  return () => [x, y].map(angle => angle * Math.PI / 180);
};

export default OrbitControls;