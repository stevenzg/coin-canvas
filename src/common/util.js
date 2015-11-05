var util = {
  // 检查有没有产生碰撞
  collide: (a, b) => {
    // 勾股定理
    let distance_squared = ( ((a.x + a.radius/2 - b.x) * (a.x + a.radius/2 - b.x)) + ((a.y + a.radius/2  - b.y) * (a.y + a.radius/2  - b.y)));
    let radii_squared = (a.radius + b.radius) * (a.radius + b.radius);

    if (distance_squared < radii_squared) {
      return true;
    } else {
      return false;
    }
  }
};

//var util = ~ function() {
//var util = void function() {
//  return {
//    // 检查有没有产生碰撞
//    collide: (a, b) => {
//      // 勾股定理
//      let distance_squared = ( ((a.x + a.radius/2 - b.x) * (a.x + a.radius/2 - b.x)) + ((a.y + a.radius/2  - b.y) * (a.y + a.radius/2  - b.y)));
//      let radii_squared = (a.radius + b.radius) * (a.radius + b.radius);
//
//      if (distance_squared < radii_squared) {
//        return true;
//      } else {
//        return false;
//      }
//    }
//  };
//}();

//var util = (function() {
//  return {
//    // 检查有没有产生碰撞
//    collide: (a, b) => {
//      // 勾股定理
//      let distance_squared = ( ((a.x + a.radius/2 - b.x) * (a.x + a.radius/2 - b.x)) + ((a.y + a.radius/2  - b.y) * (a.y + a.radius/2  - b.y)));
//      let radii_squared = (a.radius + b.radius) * (a.radius + b.radius);
//
//      if (distance_squared < radii_squared) {
//        return true;
//      } else {
//        return false;
//      }
//    }
//  };
//})();

export default util;
