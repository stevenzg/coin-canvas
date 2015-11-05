//var draw = require('../common/draw');
import draw from '../canvas/draw';

// 点击后显示一个点击的效果
class Touch {
  constructor(x, y) {
    this.type = 'touch';
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.opacity = 1;
    this.fade = 0.05;
  }

  updateElement() {
    this.opacity -= this.fade;
    this.remove = (this.opacity < 0);
  }

  render() {
    draw.circle(this.x, this.y, this.radius, 'rgba(255,0,0,' + this.opacity + ')');
  }
}

export default Touch;
