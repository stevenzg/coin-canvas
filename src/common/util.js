var util = {
  // 检查有没有产生碰撞
  collide: (a, b) => {
    console.log('a::', a);
    console.log('b::', b);
    var distance_squared = ( ((a.x + a.radius/2 - b.x) * (a.x + a.radius/2 - b.x)) + ((a.y + a.radius/2  - b.y) * (a.y + a.radius/2  - b.y)));

    var radii_squared = (a.radius + b.radius) * (a.radius + b.radius);

    console.log('distance_squared::', distance_squared);
    console.log('radii_squared::', radii_squared);

    if (distance_squared < radii_squared) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = util;
