var util = {
  // 检查有没有产生碰撞
  collide: (a, b) => {
    // 勾股定理
    //let distanceSquared = ( ((a.x + a.radius/2 - b.x) * (a.x + a.radius/2 - b.x)) + ((a.y + a.radius/2  - b.y) * (a.y + a.radius/2  - b.y)));
    //let radiiSquared = (a.radius + b.radius) * (a.radius + b.radius);

    let distanceSquared = Math.hypot(a.x + a.radius/2 - b.x, a.y + a.radius/2  - b.y);
    let radiiSquared = a.radius + b.radius;

    return distanceSquared < radiiSquared;
  }
};

export default util;
