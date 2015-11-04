var COIN_CONST = require('../common/const.js');
var draw = require('../common/draw');

// 点击后的碎片效果
class Particle {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = 'rgba(255,255,255,' + Math.random() * 1 + ')';
    // 碎片的方向，向左或者向右，1向右，-1向左
    this.direction = (Math.random() * 2 > 1) ? 1 : -1;
    // x,y方向的变化速度
    this.xSpeed = ~~(Math.random() * 4) * this.direction;
    this.ySpeed = ~~(Math.random() * 7);
    this.remove = false;
  }

  updateElement() {
    // 更新碎片的位置
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    // 改变速速，减速
    this.xSpeed *= 0.99;
    this.ySpeed *= 0.99;
    // 避免y方向速度太慢
    this.ySpeed += 0.25;
    // 超出屏幕后，移除
    if (this.y > COIN_CONST.CANVAS_DEFAULT_HEIGHT + 10) {
      this.remove = true;
    }
  }

  render () {
    draw(canvasContext).circle(this.x, this.y, this.radius, this.color);
  }
}

export default Particle;
