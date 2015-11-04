var util = {
  // 检查有没有产生碰撞
  collide: (a, b) => {
    var distance_squared = ( ((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)));

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
